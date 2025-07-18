import React, { useState } from 'react';
import { useGetLocumProfilesQuery, useUpdateLocumProfileMutation } from '../../redux/slices/locumProfileSlice';
import Swal from 'sweetalert2';
import UserDetailsModal from '../components/userDeatilsViewModal';
import { FaEye, FaFilter } from "react-icons/fa";

const UserAccept = () => {
  const [filter, setFilter] = useState<Status>('all');
  const { data: locumProfiles, isLoading, error } = useGetLocumProfilesQuery();
  const [updateLocumProfile] = useUpdateLocumProfileMutation();
  console.log(locumProfiles);

  const pendingUsers = locumProfiles?.filter((user: any) => user.status === 'pending');
  const approvedUsers = locumProfiles?.filter(
    (user: any) => user.status === 'accept' && user.emailAddress !== "admin@gmail.com"
  );
  const rejectedUsers = locumProfiles?.filter((user: any) => user.status === 'delete');

  const totalUsers = locumProfiles?.filter(
    (user: any) => user.emailAddress !== "admin@gmail.com"
  ).length;

  const handleApprove = async (userId: string) => {
    console.log('Approving user:', userId);
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to approve this user?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, approve it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await updateLocumProfile({
              id: userId,
              status: 'accept'
            }).unwrap();
            Swal.fire({
              title: 'Success!',
              text: 'User approved successfully',
              icon: 'success'
            });
          } catch (error) {
            console.error('Failed to approve user:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to approve user',
              icon: 'error'
            });
          }
        }
      });
    } catch (error) {
      console.error('Failed to approve user:', error);
    }
  };

  const handleReject = async (userId: string) => {
    console.log('Rejecting user:', userId);
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to reject this user?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reject it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await updateLocumProfile({
              id: userId,
              status: 'delete'
            }).unwrap();
            Swal.fire({
              title: 'Success!',
              text: 'User rejected successfully',
              icon: 'success'
            });
          } catch (error) {
            console.error('Failed to reject user:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to reject user',
              icon: 'error'
            });
          }
        }
      });
    } catch (error) {
      console.error('Failed to reject user:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      accept: 'bg-green-100 text-green-800',
      delete: 'bg-red-100 text-red-800',
      verify: 'bg-purple-100 text-purple-800',

    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const employeeTypes = ["Hygienist", "Nurse", "Receptionist"];
  type Status = 'all' | 'pending' | 'verify' | 'accept' | 'delete';

  const [statusFilters, setStatusFilters] = useState<Record<Status, string>>({
    all: '',
    pending: '',
    verify: '',
    accept: '',
    delete: ''
  });
  const [filterDropdown, setFilterDropdown] = useState<Record<Status, boolean>>({
    all: false,
    pending: false,
    verify: false,
    accept: false,
    delete: false
  });

  const handleEmployeeTypeFilter = (status: Status, type: string) => {
    setStatusFilters(prev => ({ ...prev, [status]: type }));
    setFilterDropdown(prev => ({ ...prev, [status]: false }));
  };

  const getFilteredUsersByStatus = (status: Status) => {
    let users = [];
    if (status === 'all') {
      users = locumProfiles?.filter((user: any) => user.emailAddress !== "admin@gmail.com") || [];
    } else {
      users = locumProfiles?.filter((user: any) => user.status === status && user.emailAddress !== "admin@gmail.com") || [];
    }
    if (statusFilters[status]) {
      users = users.filter((user: any) => user.employeeType === statusFilters[status]);
    }
    return users;
  };

  // Table filter state (for the icon after Delete)
  const [tableFilterDropdown, setTableFilterDropdown] = useState(false);
  const [tableEmployeeType, setTableEmployeeType] = useState('');

  const filteredUsers = getFilteredUsersByStatus(filter).filter(user =>
    tableEmployeeType ? user.employeeType === tableEmployeeType : true
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

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
            {['all', 'pending', 'verify', 'accept', 'delete'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption as Status)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${filter === filterOption
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

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {(['pending', 'verify', 'accept', 'delete', 'all'] as Status[]).map((status, idx) => (
          <div key={status} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 relative">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${status === 'pending' ? 'bg-yellow-100' : status === 'verify' ? 'bg-purple-100' : status === 'accept' ? 'bg-green-100' : status === 'delete' ? 'bg-red-100' : 'bg-blue-100'}`}>
                {/* Icon */}
                {status === 'pending' && (
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {status === 'verify' && (
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 2l7 4v5c0 5.25-3.72 10.05-7 11-3.28-.95-7-5.75-7-11V6l7-4z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4"
                    />
                  </svg>
                )}


                {status === 'accept' && (
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {status === 'delete' && (
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                {status === 'all' && (
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">
                  {status === 'pending' && 'Pending'}
                  {status === 'verify' && 'Verify'}
                  {status === 'accept' && 'Approved'}
                  {status === 'delete' && 'Rejected'}
                  {status === 'all' && 'Total Users'}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {getFilteredUsersByStatus(status).length}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Table filter icon after the cards */}
      <div className="flex justify-end mt-2 mb-4">
        <div className="relative">
          <button
            className="flex items-center px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-gray-700"
            onClick={() => setTableFilterDropdown(v => !v)}
          >
            <FaFilter className="mr-2" />
            Filter by Employee Type
          </button>
          {tableFilterDropdown && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow z-10">
              <div
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${tableEmployeeType === '' ? 'font-bold' : ''}`}
                onClick={() => { setTableEmployeeType(''); setTableFilterDropdown(false); }}
              >
                All Types
              </div>
              {employeeTypes.map(type => (
                <div
                  key={type}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${tableEmployeeType === type ? 'font-bold' : ''}`}
                  onClick={() => { setTableEmployeeType(type); setTableFilterDropdown(false); }}
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            User Submissions ({filteredUsers?.length})
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
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers?.map((user) => {
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div
                          className="text-sm font-medium text-gray-900 cursor-pointer hover:underline"
                          onClick={() => {
                            setSelectedUser(user);
                            setModalOpen(true);
                          }}
                        >
                          {user.fullName}
                        </div>
                        <div className="text-sm text-gray-500">{user.emailAddress}</div>
                        <div className="text-sm text-gray-500">GDC: {user.gdcNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.location}</div>
                      <div className="text-sm text-gray-500">{user.employeeType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status || '')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2 items-center">
                        <span
                          className="cursor-pointer text-gray-600 hover:text-blue-500"
                          onClick={() => {
                            setSelectedUser(user);
                            setModalOpen(true);
                          }}
                        >
                          <FaEye />
                        </span>
                        {user.status === 'pending' && (
                          <>
                            <button
                              disabled
                              className="text-green-400 bg-green-50 px-3 py-1 rounded-md opacity-50 cursor-not-allowed"
                            >
                              Approve
                            </button>
                            <button
                              disabled
                              className="text-red-400 bg-red-50 px-3 py-1 rounded-md opacity-50 cursor-not-allowed"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {user.status === 'verify' && (
                          <>
                            <button
                              onClick={() => user.id && handleApprove(user.id)}
                              className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-md transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => user.id && handleReject(user.id)}
                              className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <UserDetailsModal isOpen={modalOpen} onClose={() => setModalOpen(false)} user={selectedUser} />
    </div>
  );
};

export default UserAccept;
