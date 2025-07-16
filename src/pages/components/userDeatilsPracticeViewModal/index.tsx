import React from 'react';

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
        <h2 className="text-3xl font-extrabold mb-8 text-primary-700 tracking-tight flex items-center gap-2">
          <span role="img" aria-label="User">👤</span> Practice User Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-lg">🧑‍⚕️</span>
              <span className="font-semibold text-gray-700">Full Name:</span>
              <span className="ml-1 text-gray-900">{user.name}</span>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-lg">✉️</span>
              <span className="font-semibold text-gray-700">Email:</span>
              <span className="ml-1 text-gray-900">{user.email}</span>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-lg">#️⃣</span>
              <span className="font-semibold text-gray-700">GDC Number:</span>
              <span className="ml-1 text-gray-900">{user.GDCnumber}</span>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-lg">📞</span>
              <span className="font-semibold text-gray-700">Contact:</span>
              <span className="ml-1 text-gray-900">{user.telephone}</span>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-lg">🎂</span>
              <span className="font-semibold text-gray-700">DOB:</span>
              <span className="ml-1 text-gray-900">{user.dob ? new Date(user.dob).toLocaleDateString() : '-'}</span>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-lg">🔖</span>
              <span className="font-semibold text-gray-700">Status:</span>
              <span className={`ml-1 px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{user.status}</span>
            </div>
          </div>
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-lg">🏠</span>
              <span className="font-semibold text-gray-700">Address:</span>
              <span className="ml-1 text-gray-900">{user.address}</span>
            </div>
            {/* <div className="mb-4 flex items-center gap-2">
              <span className="text-lg">💼</span>
              <span className="font-semibold text-gray-700">Location :</span>
              <span className="ml-1 text-gray-900 whitespace-pre-line break-all">
                {user.location}
              </span>
            </div> */}
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease;
        }
        @keyframes modal-pop {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-modal-pop {
          animation: modal-pop 0.25s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
};

export default UserDetailsModal;
