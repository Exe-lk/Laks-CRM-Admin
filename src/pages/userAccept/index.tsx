import React, { useState } from 'react';
import { useGetLocumProfilesQuery, useUpdateLocumProfileMutation } from '../../redux/slices/locumProfileSlice';
import Swal from 'sweetalert2';

const UserAccept = () => {
  const [filter, setFilter] = useState('all');
  const { data: locumProfiles, isLoading, error } = useGetLocumProfilesQuery();
  const [updateLocumProfile] = useUpdateLocumProfileMutation();
  console.log(locumProfiles);

  const pendingUsers = locumProfiles?.filter((user: any) => user.status === 'pending');
  const approvedUsers = locumProfiles?.filter((user: any) => user.status === 'accept');
  const rejectedUsers = locumProfiles?.filter((user: any) => user.status === 'delete');

  const totalUsers = locumProfiles?.length;

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
              status: 'approved'
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
      delete: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredUsers = (filter === 'all' ? locumProfiles : locumProfiles?.filter(user => user.status === filter))
    ?.filter(user => user.emailAddress !== "admin@gmail.com");

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
            {['all', 'pending', 'accept', 'delete'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
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
                {pendingUsers?.length}
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
                {approvedUsers?.length}
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
                {locumProfiles?.filter(u => u.status === 'delete').length}
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
              <p className="text-2xl font-bold text-gray-900">{locumProfiles?.length}</p>
            </div>
          </div>
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
                        <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                        <div className="text-sm text-gray-500">{user.emailAddress}</div>
                        <div className="text-sm text-gray-500">GDC: {user.gdcNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.address}</div>
                      <div className="text-sm text-gray-500">{user.employeeType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status || '')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {user.status === 'pending' ? (
                        <div className="flex space-x-2">
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
