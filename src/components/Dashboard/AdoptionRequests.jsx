import { Heart, Check, X, Phone, Mail, ChevronRight } from 'lucide-react';
import { adoptionRequests } from '../../data/mockData';

const AdoptionRequests = () => {
    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
                        Pending
                    </span>
                );
            case 'approved':
                return (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                        Approved
                    </span>
                );
            case 'rejected':
                return (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                        Rejected
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="glass-card rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-pink-100 rounded-xl">
                            <Heart size={20} className="text-pink-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Adoption Requests</h3>
                            <p className="text-sm text-gray-500">Latest 5 requests</p>
                        </div>
                    </div>
                    <span className="px-2.5 py-1 bg-pink-50 text-pink-600 text-xs font-medium rounded-full">
                        {adoptionRequests.filter(r => r.status === 'pending').length} pending
                    </span>
                </div>
            </div>

            {/* Requests List */}
            <div className="divide-y divide-gray-100">
                {adoptionRequests.map((request, index) => (
                    <div
                        key={request.id}
                        className="p-4 hover:bg-gold-50/50 transition-colors"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="flex items-center gap-4">
                            {/* User Avatar */}
                            <img
                                src={request.userAvatar}
                                alt={request.userName}
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                            />

                            {/* Request Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-gray-800 truncate">{request.userName}</h4>
                                    {getStatusBadge(request.status)}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span>wants to adopt</span>
                                    <div className="flex items-center gap-1.5 bg-gray-100 pl-1 pr-2 py-0.5 rounded-full">
                                        <img
                                            src={request.animalImage}
                                            alt={request.animalName}
                                            className="w-5 h-5 rounded-full object-cover"
                                        />
                                        <span className="font-medium text-gray-700">{request.animalName}</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    Requested on {request.requestDate}
                                </p>
                            </div>

                            {/* Contact & Actions */}
                            <div className="flex items-center gap-2">
                                {request.status === 'pending' && (
                                    <>
                                        <button
                                            className="p-2 bg-green-50 hover:bg-green-100 rounded-lg text-green-600 transition-colors"
                                            title="Approve"
                                        >
                                            <Check size={18} />
                                        </button>
                                        <button
                                            className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
                                            title="Reject"
                                        >
                                            <X size={18} />
                                        </button>
                                    </>
                                )}
                                <button
                                    className="p-2 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition-colors"
                                    title={request.phone}
                                >
                                    <Phone size={18} />
                                </button>
                                <button
                                    className="p-2 hover:bg-purple-50 rounded-lg text-gray-400 hover:text-purple-600 transition-colors"
                                    title={request.email}
                                >
                                    <Mail size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                <button className="flex items-center justify-center gap-2 w-full py-2 text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors group">
                    View All Requests
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default AdoptionRequests;
