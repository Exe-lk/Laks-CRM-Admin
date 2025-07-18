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
    fullName: string;
    emailAddress: string;
    gdcNumber: string;
    address: string;
    location: string;
    employeeType: string;
    contactNumber: string;
    dateOfBirth: string;
    referenceNumber: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    specialties?: Specialty[];
    cv?: string;
    dbsImage?: string;
    gdcImage?: string;
    hepatitisBImage?: string;
    idImage?: string;
    indemnityInsuranceImage?: string;
    [key: string]: any;
  } | null;
}

const isImage = (url: string) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
const isPDF = (url: string) => /\.(pdf)$/i.test(url);

const DocumentPreview: React.FC<{ url: string; label: string }> = ({ url, label }) => {
  if (isImage(url)) {
    return (
      <div className="flex flex-col items-center border rounded-lg shadow-sm p-2 bg-gray-50">
        <img
          src={url}
          alt={label}
          className="w-28 h-28 object-cover rounded mb-2 border shadow"
        />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary-700 font-medium hover:underline"
        >
          View Full
        </a>
      </div>
    );
  } else if (isPDF(url)) {
    return (
      <div className="flex flex-col items-center border rounded-lg shadow-sm p-2 bg-gray-50">
        <div className="w-16 h-20 flex items-center justify-center bg-gray-200 rounded mb-2">
          <svg width="32" height="32" fill="currentColor" className="text-red-500" viewBox="0 0 24 24"><path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.828A2 2 0 0 0 19.414 7.414l-4.828-4.828A2 2 0 0 0 12.172 2H6zm6 1.414L18.586 10H14a2 2 0 0 1-2-2V3.414zM6 4h6v4a4 4 0 0 0 4 4h4v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4zm2 10h2v4h-2v-4zm4 0h2v4h-2v-4z" /></svg>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary-700 font-medium hover:underline"
        >
          View PDF
        </a>
      </div>
    );
  }
  return null;
};

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative border border-gray-200 scale-100 animate-modal-pop max-h-[80vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-primary-600 text-xl font-bold shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6 text-primary-800 border-b pb-2">User Details</h2>
        <div className="flex flex-col gap-4 divide-y divide-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center pt-0">
            <div className="flex items-center gap-2"><FaUserMd className="text-primary-700" /><span className="text-xs text-gray-500">Full Name</span></div>
            <div className="col-span-2 font-semibold text-gray-900">{user.fullName}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center pt-4">
            <div className="flex items-center gap-2"><FaEnvelope className="text-primary-700" /><span className="text-xs text-gray-500">Email</span></div>
            <div className="col-span-2 text-gray-800 break-all">{user.emailAddress}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center pt-4">
            <div className="flex items-center gap-2"><FaIdBadge className="text-primary-700" /><span className="text-xs text-gray-500">GDC Number</span></div>
            <div className="col-span-2 text-gray-800">{user.gdcNumber}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center pt-4">
            <div className="flex items-center gap-2"><FaPhone className="text-primary-700" /><span className="text-xs text-gray-500">Contact</span></div>
            <div className="col-span-2 text-gray-800">{user.contactNumber}</div>
          </div>
          {/* <div className="grid grid-cols-1 md:grid-cols-3 items-center pt-4">
            <div className="flex items-center gap-2"><FaBirthdayCake className="text-primary-700" /><span className="text-xs text-gray-500">Date of Birth</span></div>
            <div className="col-span-2 text-gray-800">{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : '-'}</div>
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center pt-4">
            <div className="flex items-center gap-2"><FaUserShield className="text-primary-700" /><span className="text-xs text-gray-500">Role</span></div>
            <div className="col-span-2"><span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wide">{user.role}</span></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center pt-4">
            <div className="flex items-center gap-2">{user.status === 'Active' ? (<FaCheckCircle className="text-green-600" />) : (<FaTimesCircle className="text-red-600" />)}<span className="text-xs text-gray-500">Status</span></div>
            <div className="col-span-2"><span className={`px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide ${user.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{user.status}</span></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center pt-4">
            <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-primary-700" /><span className="text-xs text-gray-500">Location</span></div>
            <div className="col-span-2 text-gray-800">{user.location}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center pt-4">
            <div className="flex items-center gap-2"><FaBriefcase className="text-primary-700" /><span className="text-xs text-gray-500">Employee Type</span></div>
            <div className="col-span-2 text-gray-800">{user.employeeType}</div>
          </div>
          {user.specialties && user.specialties.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 items-start pt-4">
              <div className="flex items-center gap-2"><FaStar className="text-purple-600 mt-1" /><span className="text-xs text-gray-500 mt-1">Specialties</span></div>
              <div className="col-span-2 flex flex-wrap gap-2">
                {user.specialties.map((spec) => (
                  <span
                    key={spec.id}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-100"
                  >
                    {spec.speciality} <span className="ml-2 text-[10px] text-gray-400">({spec.numberOfYears} yrs)</span>
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {user.cv && (
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">CV</span>
                <DocumentPreview url={user.cv} label="CV" />
              </div>
            )}
            {user.dbsImage && (
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">DBS Image</span>
                <DocumentPreview url={user.dbsImage} label="DBS Image" />
              </div>
            )}
            {user.gdcImage && (
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">GDC Image</span>
                <DocumentPreview url={user.gdcImage} label="GDC Image" />
              </div>
            )}
            {user.hepatitisBImage && (
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">Hepatitis B Image</span>
                <DocumentPreview url={user.hepatitisBImage} label="Hepatitis B Image" />
              </div>
            )}
            {user.idImage && (
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">ID Image</span>
                <DocumentPreview url={user.idImage} label="ID Image" />
              </div>
            )}
            {user.indemnityInsuranceImage && (
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">Indemnity Insurance Image</span>
                <DocumentPreview url={user.indemnityInsuranceImage} label="Indemnity Insurance Image" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
