import React from 'react';
import { FaUserMd, FaEnvelope, FaIdBadge, FaPhone, FaBirthdayCake, FaUserShield, FaCheckCircle, FaTimesCircle, FaMapMarkerAlt, FaBriefcase, FaStar } from 'react-icons/fa';

interface Specialty {
  id: string;
  speciality: string;
  numberOfYears: number;
}

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    GDCnumber: string;
    address: string;
    status: string;
    dob: string;
    location: string;
    telephone: string;
    referenceNumber: string;
    createdAt: string;
    updatedAt: string;
    specialties?: Specialty[];
    [key: string]: any;
  } | null;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-10 relative border border-gray-100 scale-100 animate-modal-pop">
        <button
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-primary-600 text-2xl font-bold shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-primary-800 border-b pb-2">User Details</h2>
        <div className="flex flex-col gap-4 divide-y divide-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center pt-0">
            <div className="flex items-center gap-2"><FaUserMd className="text-primary-700" /><span className="text-xs text-gray-500">Full Name</span></div>
            <div className="col-span-2 font-semibold text-gray-900">{user.name}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center pt-4">
            <div className="flex items-center gap-2"><FaEnvelope className="text-primary-700" /><span className="text-xs text-gray-500">Email</span></div>
            <div className="col-span-2 text-gray-800 break-all">{user.email}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center pt-4">
            <div className="flex items-center gap-2"><FaIdBadge className="text-primary-700" /><span className="text-xs text-gray-500">GDC Number</span></div>
            <div className="col-span-2 text-gray-800">{user.GDCnumber}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center pt-4">
            <div className="flex items-center gap-2"><FaPhone className="text-primary-700" /><span className="text-xs text-gray-500">Contact</span></div>
            <div className="col-span-2 text-gray-800">{user.telephone}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center pt-4">
            <div className="flex items-center gap-2"><FaBirthdayCake className="text-primary-700" /><span className="text-xs text-gray-500">Date of Birth</span></div>
            <div className="col-span-2 text-gray-800">{user.dob ? new Date(user.dob).toLocaleDateString() : '-'}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center pt-4">
            <div className="flex items-center gap-2">{user.status === 'Active' ? (<FaCheckCircle className="text-green-600" />) : (<FaTimesCircle className="text-red-600" />)}<span className="text-xs text-gray-500">Status</span></div>
            <div className="col-span-2"><span className={`px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide ${user.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{user.status}</span></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center pt-4">
            <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-primary-700" /><span className="text-xs text-gray-500">Location</span></div>
            <div className="col-span-2 text-gray-800">{user.address}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
