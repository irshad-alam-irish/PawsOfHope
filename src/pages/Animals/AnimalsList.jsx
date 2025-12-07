import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Grid, List } from 'lucide-react';
import AnimalCard from '../../components/Animals/AnimalCard';
import { allAnimals } from '../../data/mockData';

const AnimalsList = () => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    // Filter Logic
    const filteredAnimals = allAnimals.filter(animal => {
        const matchesSearch = animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            animal.breed.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || animal.type.toLowerCase() === filterType.toLowerCase();
        const matchesStatus = filterStatus === 'all' || animal.status === filterStatus;

        return matchesSearch && matchesType && matchesStatus;
    });

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Animals Management</h1>
                    <p className="text-gray-500">Manage your furry friends and their adoption status</p>
                </div>
                <button
                    onClick={() => navigate('/animals/add')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold rounded-xl shadow-lg shadow-gold-500/30 transition-all transform hover:-translate-y-0.5"
                >
                    <Plus size={20} />
                    Add New Animal
                </button>
            </div>

            {/* Filters & Controls */}
            <div className="glass-card p-4 rounded-xl flex flex-col lg:flex-row gap-4 justify-between items-center">
                {/* Search */}
                <div className="relative w-full lg:w-96">
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or breed..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-gold-400 focus:ring-2 focus:ring-gold-100 outline-none transition-all"
                    />
                </div>

                {/* Filter Groups */}
                <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                        <Filter size={16} className="text-gray-500" />
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm text-gray-700 font-medium cursor-pointer"
                        >
                            <option value="all">All Types</option>
                            <option value="dog">Dogs</option>
                            <option value="cat">Cats</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="w-2 h-2 rounded-full bg-gold-500"></div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm text-gray-700 font-medium cursor-pointer"
                        >
                            <option value="all">All Status</option>
                            <option value="available">Available</option>
                            <option value="adopted">Adopted</option>
                            <option value="treatment">Treatment</option>
                        </select>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center bg-gray-100 rounded-lg p-1 ml-auto lg:ml-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-gold-600' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <Grid size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-gold-600' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Results */}
            {filteredAnimals.length > 0 ? (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                    {filteredAnimals.map(animal => (
                        <AnimalCard key={animal.id} animal={animal} viewMode={viewMode} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">No animals found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    );
};

export default AnimalsList;
