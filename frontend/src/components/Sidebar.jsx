import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Sidebar() {
	const currentUser = useSelector((state) => state.user.currentUser);
	const menuItems = [
		{
			id: 'dashboard',
			path: '/',
			name: 'Tổng quan',
			icon: (
				<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'></path>
				</svg>
			),
		},
		currentUser?.role === 'admin' && {
			id: 'users',
			path: '/users',
			name: 'Nhân viên',
			icon: (
				<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
				</svg>
			),
		},
		{
			id: 'products',
			path: '/products',
			name: 'Sản phẩm',
			icon: (
				<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'></path>
				</svg>
			),
		},
		{
			id: 'inventory',
			path: '/inventory',
			name: 'Tồn kho',
			icon: (
				<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'></path>
				</svg>
			),
		},
		{
			id: 'customer',
			path: '/customer',
			name: 'Khách hàng',
			icon: (
				<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z'></path>
				</svg>
			),
		},
		{
			id: 'suppliers',
			path: '/suppliers',
			name: 'Nhà cung cấp',
			icon: (
				<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
				</svg>
			),
		},
		{
			id: 'orders',
			path: '/orders',
			name: 'Đơn hàng',
			icon: (
				<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'></path>
				</svg>
			),
		},
		{
			id: 'shippers',
			path: '/shippers',
			name: 'Shipper',
			icon: (
				<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 10V3L4 14h7v7l9-11h-7z'></path>
				</svg>
			),
		},
		{
			id: 'WarehouseManagement',
			path: '/WarehouseManagement',
			name: 'Nhập hóa đơn',
			icon: (
				<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
				</svg>
			),
		},
	].filter(Boolean);

	return (
		<div className='flex flex-col h-full w-full py-4'>
			<nav className='flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar'>
				{menuItems.map((item) => (
					<NavLink
						key={item.id}
						to={item.path}
						className={({ isActive }) =>
							`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
								isActive 
									? 'bg-primary text-white shadow-lg shadow-primary/30' 
									: 'text-textSecondary hover:bg-primaryLight/10 hover:text-primary'
							}`
						}
					>
						<span className='mr-3 transition-transform duration-200 group-hover:scale-110'>
							{item.icon}
						</span>
						<span>{item.name}</span>
					</NavLink>
				))}
			</nav>
      
      <div className="mt-auto px-4 pt-4 border-t border-border">
        <div className="bg-primaryLight/5 rounded-2xl p-4 flex flex-col items-center text-center">
          <p className="text-xs text-textSecondary mb-2">Version 2.0</p>
          <div className="w-8 h-1 bg-primary rounded-full mb-1"></div>
          <p className="text-[10px] text-textSecondary italic">Quản lý hiệu quả hơn</p>
        </div>
      </div>
		</div>
	);
}

export default Sidebar;
