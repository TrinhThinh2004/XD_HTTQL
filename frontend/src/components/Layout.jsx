import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-bg-light">
      <Header />

      <div className="flex flex-1 overflow-hidden relative">
        <aside className="hidden md:flex md:flex-shrink-0 w-64 bg-white shadow-xl z-20 transition-all duration-300">
          <Sidebar />
        </aside>

        <main className="flex-1 overflow-y-auto relative z-10 p-4 md:p-8">
          <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
