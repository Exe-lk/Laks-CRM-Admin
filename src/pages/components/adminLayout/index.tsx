import React, { ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AdminSidebar from '../adminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  title,
  description = 'Admin dashboard for managing locum profiles and dental practice CRM'
}) => {
  const router = useRouter();
  
  const getPageTitle = () => {
    if (title) return title;
    
    switch (router.pathname) {
      case '/dashboard':
        return 'Dashboard - Laks CRM';
      case '/userAccept':
        return 'User Management - Laks CRM';
      case '/locumProfiles':
        return 'Locum Profiles - Laks CRM';
      case '/documents':
        return 'Documents - Laks CRM';
      case '/specialties':
        return 'Specialties - Laks CRM';
      case '/analytics':
        return 'Analytics - Laks CRM';
      case '/settings':
        return 'Settings - Laks CRM';
      default:
        return 'Admin Dashboard - Laks CRM';
    }
  };
  return (
    <>
      <Head>
        <title>{getPageTitle()}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        
        <main className="flex-1 overflow-auto">
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {getPageTitle().replace(' - Laks CRM', '')}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your dental practice CRM system
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C3EAE7] focus:ring-offset-2 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.97 4.97a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 01-1.06-1.06L13.44 8.5H3.75a.75.75 0 010-1.5h9.69l-2.47-2.47a.75.75 0 010-1.06z" />
                  </svg>
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
                </button>
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Quick search..."
                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C3EAE7] focus:border-transparent"
                  />
                  <svg 
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </header>
          
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminLayout; 