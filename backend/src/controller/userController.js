const UserService = require("../services/userService");
const db = require("../models/index");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const handleCreateNewUser = async (req, res) => {
  const message = await UserService.createNewUser(req.body);
  return res.status(200).json(message);
};

const handleLoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        errCode: 1,
        message: "Vui lòng nhập đầy đủ email và mật khẩu!",
      });
    }

    const userData = await UserService.handleLoginUser(email, password);

    if (userData.errCode !== 0) {
      return res.status(401).json({
        errCode: userData.errCode,
        message: userData.errMessage,
      });
    }

    const access_token = jwt.sign(
      {
        id: userData.user.id,
        role: userData.user.role,
        isAdmin: userData.user.role === "admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refresh_token = jwt.sign(
      {
        id: userData.user.id,
        role: userData.user.role,
        isAdmin: userData.user.role === "admin",
      },
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    await db.User.update(
      { refresh_token: refresh_token },
      { where: { id: userData.user.id } }
    );

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      errCode: 0,
      message: "Đăng nhập thành công",
      user: userData.user,
      access_token: access_token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      errCode: -1,
      message: "Lỗi hệ thống",
    });
  }
};

const handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
      users: [],
    });
  }
  let users = await UserService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

const handleUpdateUser = async (req, res) => {
  try {
    let data = req.body;
    let message = await UserService.UpdateUserData(data);
    return res.status(200).json(message);
  } catch (e) {
    console.log("Error", e);
  }
};

const handleDeleteUser = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required parameter!",
      });
    }
    let message = await UserService.DeleteUserData(req.body.id);
    return res.status(200).json(message);
  } catch (e) {
    console.log("User not found!", e);
  }
};

const handleRefreshToken = async (req, res) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      return res.status(401).json({
        errCode: 1,
        message: "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại."
      });
    }

    const user = await db.User.findOne({ where: { refresh_token } });
    if (!user) {
      return res.status(403).json({
        errCode: 2,
        message: "Token không hợp lệ hoặc đã bị vô hiệu hóa"
      });
    }

    try {
      const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);
      if (user.id !== decoded.id) {
        return res.status(403).json({
          errCode: 3,
          message: "Xác thực token thất bại"
        });
      }

      const newAccessToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
          isAdmin: user.role === "admin",
        },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      // Optional: Refresh token rotation
      const newRefreshToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
          isAdmin: user.role === "admin",
        },
        process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      await db.User.update(
        { refresh_token: newRefreshToken },
        { where: { id: user.id } }
      );

      res.cookie("refresh_token", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        errCode: 0,
        access_token: newAccessToken,
      });
    } catch (err) {
      // If refresh token is expired, clear it from DB and cookie
      await db.User.update({ refresh_token: null }, { where: { id: user.id } });
      res.clearCookie("refresh_token", {
        httpOnly: true,
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production",
      });
      return res.status(403).json({
        errCode: 4,
        message: "Token hết hạn. Vui lòng đăng nhập lại."
      });
    }
  } catch (err) {
    console.error("Error in handleRefreshToken:", err);
    return res.status(500).json({
      errCode: -1,
      message: "Lỗi hệ thống"
    });
  }
};

const handleLogout = async (req, res) => {
  try {
    const refresh_token = req.cookies.refresh_token;

    if (refresh_token) {
      const user = await db.User.findOne({ where: { refresh_token } });
      if (user) {
        await db.User.update({ refresh_token: null }, { where: { id: user.id } });
      }
    }

    res.clearCookie("refresh_token", {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      errCode: 0,
      message: "Đăng xuất thành công"
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      errCode: -1,
      message: "Lỗi hệ thống",
      error
    });
  }
};

module.exports = {
  handleCreateNewUser,
  handleGetAllUsers,
  handleLoginUser,
  handleUpdateUser,
  handleDeleteUser,
  handleRefreshToken,
  handleLogout,
};
