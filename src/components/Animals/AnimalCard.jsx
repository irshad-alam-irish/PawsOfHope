import { MapPin, Calendar, Info, Heart, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AnimalCard = ({ animal }) => {
    const navigate = useNavigate();

    const getStatusColor = (status) => {
        switch (status) {
            case 'available': return 'bg-green-100 text-green-700 border-green-200';
            case 'adopted': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'treatment': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div
            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gold-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            onClick={() => navigate(`/animals/${animal.id}`)}
        >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={animal.image}
                    alt={animal.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-pink-500 transition-colors shadow-sm">
                        <Heart size={16} />
                    </button>
                </div>
                <div className="absolute bottom-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getStatusColor(animal.status)} shadow-sm`}>
                        {animal.status}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-gold-600 transition-colors">{animal.name}</h3>
                        <p className="text-sm text-gray-500 font-medium">{animal.breed}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gold-50 flex items-center justify-center text-gold-600 font-bold text-xs">
                        {animal.gender === 'Male' ? '♂' : '♀'}
                    </div>
                </div>

                <div className="space-y-2 mt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} className="text-gold-500" />
                        <span>{animal.age}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Info size={16} className="text-gold-500" />
                        <span>{animal.type}</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <button className="text-sm font-semibold text-gold-600 hover:text-gold-700 transition-colors">
                        View Details
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gold-600 transition-colors">
                        <Share2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnimalCard;
