import { useState } from 'react';
import { Check, X, MessageCircle, Phone, Mail, Filter, Search, ChevronDown } from 'lucide-react';
import { adoptionRequests } from '../../data/mockData';

const AdoptionRequestsPage = () => {
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'approved': return 'bg-green-100 text-green-700 border-green-200';
            case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Adoption Requests</h1>
                <p className="text-gray-500">Review and manage applications from potential adopters</p>
            </div>

            {/* Filters */}
            <div className="glass-card p-4 rounded-xl flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-96">
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search applicant or animal..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-gold-400 outline-none transition-all"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Filter size={18} className="text-gray-400" />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="bg-transparent border-none outline-none text-sm font-medium text-gray-600 cursor-pointer"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Requests List */}
            <div className="space-y-4">
                {adoptionRequests.map((request) => (
                    <div key={request.id} className="glass-card p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Applicant Info */}
                            <div className="flex-1 flex gap-4">
                                <img
                                    src={request.userAvatar}
                                    alt={request.userName}
                                    className="w-16 h-16 rounded-full object-cover ring-4 ring-gray-50"
                                />
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">{request.userName}</h3>
                                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                        <span className="flex items-center gap-1"><Phone size={14} /> {request.phone}</span>
                                        <span className="flex items-center gap-1"><Mail size={14} /> {request.email}</span>
                                    </div>
                                    <div className="mt-3 flex items-center gap-2">
                                        <span className="text-sm text-gray-600">Applying for:</span>
                                        <div className="flex items-center gap-2 bg-gold-50 px-3 py-1 rounded-full border border-gold-100">
                                            <img src={request.animalImage} alt="" className="w-5 h-5 rounded-full object-cover" />
                                            <span className="font-semibold text-gold-800">{request.animalName}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Status & Actions */}
                            <div className="flex flex-col items-end justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-gray-400">{request.requestDate}</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusBadge(request.status)}`}>
                                        {request.status}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Chat">
                                        <MessageCircle size={20} />
                                    </button>

                                    {request.status === 'pending' && (
                                        <>
                                            <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg font-medium transition-colors">
                                                <Check size={18} />
                                                Approve
                                            </button>
                                            <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg font-medium transition-colors">
                                                <X size={18} />
                                                Reject
                                            </button>
                                        </>
                                    )}

                                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                                        <ChevronDown size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Expandable Details (Mock) */}
                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Application Details</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                "I have a large fenced backyard and two other dogs who are very friendly.
                                I work from home so I can spend plenty of time with {request.animalName}.
                                Looking forward to meeting him!"
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdoptionRequestsPage;
