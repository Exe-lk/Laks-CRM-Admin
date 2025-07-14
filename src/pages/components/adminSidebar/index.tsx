import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Swal from 'sweetalert2';

interface AdminSidebarProps {
  className?: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ className = '' }) => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [fullname, setFullname] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  React.useEffect(() => {
    setFullname(localStorage.getItem("fullname"));
    setEmail(localStorage.getItem("email"));
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      confirmButtonText: 'OK',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('fullname');
        localStorage.removeItem('email');
        Swal.fire({
          title: 'Logged out',
          text: 'You have been successfully logged out.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          router.push('/');
        });
      }
    });
  };

  const navigationItems = [
    {
      title: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4H8V5z" />
        </svg>
      ),
      path: '/dashboard',
      isActive: router.pathname === '/dashboard'
    },
    // {
    //   title: 'Locum Profiles',
    //   icon: (
    //     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    //     </svg>
    //   ),
    //   path: '/locumProfiles',
    //   isActive: router.pathname === '/locumProfiles'
    // },
    {
      title: 'User Management',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      path: '/userAccept',
      isActive: router.pathname === '/userAccept'
    },
    {
      title: 'Bookings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      path: '/bookingStatus',
      isActive: router.pathname === '/bookingStatus'
    },
    {
      title: 'Payment',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      path: '/payment',
      isActive: router.pathname === '/payment'
    },
    // {
    //   title: 'Analytics',
    //   icon: (
    //     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    //     </svg>
    //   ),
    //   path: '/analytics',
    //   isActive: router.pathname === '/analytics'
    // },
    // {
    //   title: 'Settings',
    //   icon: (
    //     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    //     </svg>
    //   ),
    //   path: '/settings',
    //   isActive: router.pathname === '/settings'
    // }
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <aside className={`bg-white shadow-lg border-r border-gray-200 h-screen transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Image 
              src="/assests/Laks Dent Logo.png" 
              alt="Admin Logo" 
              width={40} 
              height={40}
              className="rounded-lg"
            />
            <div>
              <h2 className="text-lg font-bold text-gray-800">Admin Panel</h2>
              <p className="text-xs text-gray-500">Laks CRM</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg 
            className={`w-5 h-5 text-gray-600 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7" 
            />
          </svg>
        </button>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                  item.isActive
                    ? 'bg-[#C3EAE7] text-gray-800 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
                title={isCollapsed ? item.title : ''}
              >
                <span className={`flex-shrink-0 ${item.isActive ? 'text-gray-800' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="ml-3 font-medium text-sm">{item.title}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center mb-4 p-2 rounded-lg bg-gray-50">
            <div className="w-8 h-8 bg-[#C3EAE7] rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-700">{fullname ? fullname.charAt(0).toUpperCase() : 'A'}</span>
            </div>
            <div className="ml-2 flex-1">
              <p className="text-sm font-medium text-gray-800">{fullname || 'Admin User'}</p>
              <p className="text-xs text-gray-500">{email || 'admin@laksdent.com'}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          title={isCollapsed ? 'Logout' : ''}
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
            />
          </svg>
          {!isCollapsed && <span className="ml-3 font-medium text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;