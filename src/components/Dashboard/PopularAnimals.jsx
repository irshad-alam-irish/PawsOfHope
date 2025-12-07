import { Eye, Heart, ChevronRight, Flame } from 'lucide-react';
import { popularAnimals } from '../../data/mockData';

const PopularAnimals = () => {
    return (
        <div className="glass-card rounded-2xl p-6 h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-xl">
                        <Flame size={20} className="text-orange-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Most Popular</h3>
                        <p className="text-sm text-gray-500">Trending animals</p>
                    </div>
                </div>
            </div>

            {/* Animals List */}
            <div className="space-y-4">
                {popularAnimals.map((animal, index) => (
                    <div
                        key={animal.id}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-gold-50 transition-colors cursor-pointer group"
                    >
                        {/* Rank */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white' :
                                index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                                    index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' :
                                        'bg-gray-100 text-gray-600'
                            }`}>
                            {index + 1}
                        </div>

                        {/* Animal Image */}
                        <div className="relative">
                            <img
                                src={animal.image}
                                alt={animal.name}
                                className="w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-sm group-hover:ring-gold-300 transition-all"
                            />
                            {index < 3 && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 rounded-full flex items-center justify-center">
                                    <Flame size={10} className="text-white" />
                                </div>
                            )}
                        </div>

                        {/* Animal Info */}
                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-800 truncate">{animal.name}</h4>
                            <p className="text-xs text-gray-500">{animal.breed}</p>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-gray-500">
                                <Eye size={14} />
                                <span className="text-sm font-medium">{animal.views}</span>
                            </div>
                            <div className="flex items-center gap-1 text-pink-500">
                                <Heart size={14} fill="currentColor" />
                                <span className="text-sm font-medium">{animal.interests}</span>
                            </div>
                        </div>

                        {/* Arrow */}
                        <ChevronRight size={18} className="text-gray-400 group-hover:text-gold-600 group-hover:translate-x-1 transition-all" />
                    </div>
                ))}
            </div>

            {/* View All Button */}
            <button className="w-full mt-4 py-3 text-sm font-medium text-gold-600 hover:text-gold-700 hover:bg-gold-50 rounded-xl transition-colors">
                View All Animals →
            </button>
        </div>
    );
};

export default PopularAnimals;
