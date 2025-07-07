import React, { useState } from 'react';

const UserAccept = () => {
  const [filter, setFilter] = useState('all');
  
  const pendingUsers = [
    {
      id: 1,
      fullName: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@email.com',
      gdcNumber: 'GDC123456',
      location: 'London',
      employeeType: 'Locum',
      submittedAt: '2024-01-15T10:30:00Z',
      status: 'pending',
      documents: {
        gdc: true,
        indemnityInsurance: true,
        hepatitisB: true,
        dbs: false,
        cv: true,
        id: true
      }
    },
    {
      id: 2,
      fullName: 'Dr. Michael Chen',
      email: 'michael.chen@email.com',
      gdcNumber: 'GDC789012',
      location: 'Manchester',
      employeeType: 'Associate',
      submittedAt: '2024-01-14T14:20:00Z',
      status: 'pending',
      documents: {
        gdc: true,
        indemnityInsurance: true,
        hepatitisB: true,
        dbs: true,
        cv: true,
        id: false
      }
    },
    {
      id: 3,
      fullName: 'Dr. Emma Wilson',
      email: 'emma.wilson@email.com',
      gdcNumber: 'GDC345678',
      location: 'Birmingham',
      employeeType: 'Locum',
      submittedAt: '2024-01-13T09:15:00Z',
      status: 'approved',
      documents: {
        gdc: true,
        indemnityInsurance: true,
        hepatitisB: true,
        dbs: true,
        cv: true,
        id: true
      }
    },
    {
      id: 4,
      fullName: 'Dr. James Brown',
      email: 'james.brown@email.com',
      gdcNumber: 'GDC901234',
      location: 'Leeds',
      employeeType: 'Associate',
      submittedAt: '2024-01-12T16:45:00Z',
      status: 'rejected',
      documents: {
        gdc: false,
        indemnityInsurance: true,
        hepatitisB: false,
        dbs: true,
        cv: true,
        id: true
      }
    }
  ];

  const handleApprove = (userId: number) => {
    console.log('Approving user:', userId);
  };

  const handleReject = (userId: number) => {
    console.log('Rejecting user:', userId);
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getDocumentCompleteness = (documents: any) => {
    const total = Object.keys(documents).length;
    const completed = Object.values(documents).filter(Boolean).length;
    return { completed, total, percentage: Math.round((completed / total) * 100) };
  };

  const filteredUsers = filter === 'all' ? pendingUsers : pendingUsers.filter(user => user.status === filter);

  return (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
            <p className="mt-1 text-sm text-gray-500">
              Review and manage locum profile submissions
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <div className="flex space-x-2">
              {['all', 'pending', 'approved', 'rejected'].map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    filter === filterOption
                      ? 'bg-[#C3EAE7] text-gray-800'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pendingUsers.filter(u => u.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pendingUsers.filter(u => u.status === 'approved').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pendingUsers.filter(u => u.status === 'rejected').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{pendingUsers.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              User Submissions ({filteredUsers.length})
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location & Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => {
                  const docStatus = getDocumentCompleteness(user.documents);
                  return (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-sm text-gray-500">GDC: {user.gdcNumber}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.location}</div>
                        <div className="text-sm text-gray-500">{user.employeeType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${docStatus.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {docStatus.completed}/{docStatus.total}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(user.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {user.status === 'pending' ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApprove(user.id)}
                              className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-md transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(user.id)}
                              className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <button className="text-[#C3EAE7] hover:text-gray-700 bg-gray-50 hover:bg-gray-100 px-3 py-1 rounded-md transition-colors">
                            View Details
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default UserAccept;
