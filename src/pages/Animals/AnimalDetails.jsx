import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Heart, Share2, Edit, Trash2, Activity, Shield, Clock } from 'lucide-react';
import { allAnimals } from '../../data/mockData';

const AnimalDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find animal by ID (mock logic)
    const animal = allAnimals.find(a => a.id === parseInt(id)) || allAnimals[0];

    if (!animal) {
        return <div className="p-8 text-center">Animal not found</div>;
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'available': return 'bg-green-100 text-green-700 border-green-200';
            case 'adopted': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'treatment': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="max-w-5xl mx-auto animate-fadeIn pb-10">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-gold-600 transition-colors mb-6"
            >
                <ArrowLeft size={20} />
                Back to Animals
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Images & Key Stats */}
                <div className="space-y-6">
                    {/* Main Image */}
                    <div className="glass-card p-2 rounded-2xl overflow-hidden">
                        <div className="relative h-80 rounded-xl overflow-hidden group">
                            <img
                                src={animal.image}
                                alt={animal.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-4 right-4">
                                <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-pink-500 transition-colors shadow-lg">
                                    <Heart size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Thumbnails (Mock) */}
                        <div className="grid grid-cols-4 gap-2 mt-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-20 rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                                    <img src={animal.image} alt="" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="glass-card p-6 rounded-2xl">
                        <h3 className="font-semibold text-gray-800 mb-4">Admin Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gold-500 hover:bg-gold-600 text-white font-medium rounded-xl transition-colors">
                                <Edit size={18} /> Edit
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-xl transition-colors">
                                <Trash2 size={18} /> Delete
                            </button>
                            <button className="col-span-2 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors">
                                <Share2 size={18} /> Share Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Header Info */}
                    <div className="glass-card p-8 rounded-2xl">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-bold text-gray-800">{animal.name}</h1>
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide border ${getStatusColor(animal.status)}`}>
                                        {animal.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-500">
                                    <span className="flex items-center gap-1"><MapPin size={16} className="text-gold-500" /> Shelter A, Block 3</span>
                                    <span className="flex items-center gap-1"><Clock size={16} className="text-gold-500" /> Arrived 2 months ago</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-gold-600">$150</p>
                                <p className="text-sm text-gray-400">Adoption Fee</p>
                            </div>
                        </div>

                        {/* Key Attributes */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-t border-b border-gray-100">
                            <div className="text-center p-3 bg-gray-50 rounded-xl">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Breed</p>
                                <p className="font-bold text-gray-800">{animal.breed}</p>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-xl">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Age</p>
                                <p className="font-bold text-gray-800">{animal.age}</p>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-xl">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Gender</p>
                                <p className="font-bold text-gray-800">{animal.gender}</p>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-xl">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Weight</p>
                                <p className="font-bold text-gray-800">12 kg</p>
                            </div>
                        </div>

                        {/* Story */}
                        <div className="mt-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-3">About {animal.name}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {animal.name} is a gentle soul who loves long walks and belly rubs.
                                Rescued from the streets, {animal.gender === 'Male' ? 'he' : 'she'} has shown incredible resilience and affection.
                                {animal.gender === 'Male' ? 'He' : 'She'} is great with other pets and would make a perfect addition to a loving family.
                                Currently fully vaccinated and neutered.
                            </p>
                        </div>
                    </div>

                    {/* Medical History & Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass-card p-6 rounded-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                    <Activity size={20} />
                                </div>
                                <h3 className="font-bold text-gray-800">Health Status</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
                                    <span className="text-sm font-medium text-gray-700">Vaccinations</span>
                                    <span className="text-xs font-bold text-green-700 bg-green-200 px-2 py-1 rounded">Up to Date</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
                                    <span className="text-sm font-medium text-gray-700">Spayed/Neutered</span>
                                    <span className="text-xs font-bold text-green-700 bg-green-200 px-2 py-1 rounded">Yes</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <span className="text-sm font-medium text-gray-700">Last Checkup</span>
                                    <span className="text-xs font-bold text-gray-600">Oct 15, 2023</span>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                                    <Shield size={20} />
                                </div>
                                <h3 className="font-bold text-gray-800">Behavior</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="w-full">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-600">Friendliness</span>
                                        <span className="font-bold text-gray-800">90%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-purple-500 w-[90%]"></div>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-600">Energy Level</span>
                                        <span className="font-bold text-gray-800">75%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[75%]"></div>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-600">Training</span>
                                        <span className="font-bold text-gray-800">60%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-gold-500 w-[60%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimalDetails;
