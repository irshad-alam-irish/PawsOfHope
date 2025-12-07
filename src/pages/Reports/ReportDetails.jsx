import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, User, AlertTriangle, CheckCircle, Clock, MessageCircle, Phone, Mail } from 'lucide-react';
import { recentReports } from '../../data/mockData';

const ReportDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('pending'); // Mock state

    // Find report by ID (mock logic)
    const report = recentReports.find(r => r.id === parseInt(id)) || recentReports[0];

    if (!report) {
        return <div className="p-8 text-center">Report not found</div>;
    }

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        // In real app, API call here
    };

    const getStatusColor = (s) => {
        switch (s) {
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'resolved': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-fadeIn pb-10">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-gold-600 transition-colors mb-6"
            >
                <ArrowLeft size={20} />
                Back to Reports
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Image & Map */}
                <div className="space-y-6">
                    <div className="glass-card p-2 rounded-2xl overflow-hidden">
                        <div className="relative h-64 rounded-xl overflow-hidden">
                            <img
                                src={report.image}
                                alt="Reported Situation"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm border ${getStatusColor(status)}`}>
                                    {status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Location Map Link */}
                    <div className="glass-card p-6 rounded-2xl">
                        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <MapPin size={18} className="text-gold-500" />
                            Location
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4">
                            <p className="text-gray-700 font-medium">{report.location}</p>
                            <p className="text-xs text-gray-500 mt-1">Near Central Park Entrance</p>
                        </div>
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(report.location)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-2 text-center bg-gold-50 text-gold-700 font-medium rounded-lg hover:bg-gold-100 transition-colors"
                        >
                            Open in Google Maps
                        </a>
                    </div>
                </div>

                {/* Right Column - Details & Actions */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Main Info */}
                    <div className="glass-card p-8 rounded-2xl">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800 mb-2">Case #{report.id}: {report.problem}</h1>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {report.date}</span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> 10:30 AM</span>
                                </div>
                            </div>
                            <div className="p-3 bg-red-50 rounded-full text-red-500">
                                <AlertTriangle size={24} />
                            </div>
                        </div>

                        <div className="prose prose-sm text-gray-600 mb-8">
                            <h3 className="text-gray-800 font-semibold mb-2">Description</h3>
                            <p>
                                A stray dog was found limping near the main road. It appears to have an injury on its left hind leg.
                                The dog is scared but not aggressive. Needs immediate medical attention.
                            </p>
                        </div>

                        {/* Reporter Info */}
                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Reported By</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white font-bold text-lg">
                                    {report.reporter.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">{report.reporter}</p>
                                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                        <span className="flex items-center gap-1"><Phone size={12} /> +91 98765 43210</span>
                                        <span className="flex items-center gap-1"><Mail size={12} /> reporter@example.com</span>
                                    </div>
                                </div>
                                <button className="ml-auto p-2 text-gray-400 hover:text-gold-600 transition-colors">
                                    <MessageCircle size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Admin Actions */}
                    <div className="glass-card p-6 rounded-2xl">
                        <h3 className="font-semibold text-gray-800 mb-4">Update Status</h3>
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                onClick={() => handleStatusChange('pending')}
                                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${status === 'pending'
                                        ? 'border-yellow-400 bg-yellow-50 text-yellow-700'
                                        : 'border-gray-100 hover:border-yellow-200 hover:bg-yellow-50/50 text-gray-500'
                                    }`}
                            >
                                <AlertTriangle size={24} />
                                <span className="font-medium">Pending</span>
                            </button>
                            <button
                                onClick={() => handleStatusChange('in-progress')}
                                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${status === 'in-progress'
                                        ? 'border-blue-400 bg-blue-50 text-blue-700'
                                        : 'border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 text-gray-500'
                                    }`}
                            >
                                <Clock size={24} />
                                <span className="font-medium">In Progress</span>
                            </button>
                            <button
                                onClick={() => handleStatusChange('resolved')}
                                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${status === 'resolved'
                                        ? 'border-green-400 bg-green-50 text-green-700'
                                        : 'border-gray-100 hover:border-green-200 hover:bg-green-50/50 text-gray-500'
                                    }`}
                            >
                                <CheckCircle size={24} />
                                <span className="font-medium">Resolved</span>
                            </button>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end gap-3">
                            <button className="px-4 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors">
                                Delete Report
                            </button>
                            <button className="px-6 py-2 bg-gold-500 text-white font-medium rounded-lg hover:bg-gold-600 transition-colors shadow-md">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportDetails;
