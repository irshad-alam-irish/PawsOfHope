import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Save, X, Camera, Image as ImageIcon, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../utils/cropImage';

const AddAnimal = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        type: 'Dog',
        breed: '',
        age: '',
        gender: 'Male',
        status: 'Available',
        location: '',
        description: '',
        image: null
    });

    // Upload/Camera/Crop State
    const [showOptionModal, setShowOptionModal] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [showCropper, setShowCropper] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const videoRef = useRef(null);
    const streamRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // --- Camera Logic ---
    const startCamera = async () => {
        try {
            setShowOptionModal(false);
            setShowCamera(true);
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            toast.error("Could not access camera. Please check permissions.");
        }
    };

    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');

        stopCamera();
        setImageSrc(dataUrl);
        setShowCamera(false);
        setShowCropper(true);
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
        setShowCamera(false);
    };

    // --- File Upload Logic ---
    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImageSrc(reader.result);
                setShowOptionModal(false);
                setShowCropper(true);
            });
            reader.readAsDataURL(file);
        }
    };

    // --- Crop Logic ---
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
            setFormData(prev => ({ ...prev, image: croppedImage }));
            setShowCropper(false);
            setImageSrc(null);
        } catch (e) {
            console.error(e);
            toast.error("Error cropping image");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.image) {
            toast.error("Please upload an image of the animal");
            return;
        }
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast.success('Animal added successfully!');
            navigate('/animals');
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto animate-fadeIn pb-10 relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-gold-600 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Animals
                </button>
                <h1 className="text-2xl font-bold text-gray-800">Add New Animal</h1>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Image Upload */}
                <div className="space-y-6">
                    <div className="glass-card p-6 rounded-2xl text-center">
                        <div
                            onClick={() => setShowOptionModal(true)}
                            className="border-2 border-dashed border-gold-200 rounded-xl p-8 hover:bg-gold-50/30 transition-colors cursor-pointer group relative overflow-hidden h-64 flex items-center justify-center"
                        >
                            {formData.image ? (
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                                />
                            ) : (
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gold-100 text-gold-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <Upload size={24} />
                                    </div>
                                    <p className="text-gray-600 font-medium mb-1">Add Photo</p>
                                    <p className="text-xs text-gray-400">Click to upload or take photo</p>
                                </div>
                            )}
                        </div>
                        {formData.image && (
                            <button
                                type="button"
                                onClick={() => setShowOptionModal(true)}
                                className="mt-4 text-sm text-gold-600 hover:text-gold-700 font-medium"
                            >
                                Change Photo
                            </button>
                        )}
                    </div>
                </div>

                {/* Right Column - Form Fields */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-8 rounded-2xl space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none transition-all"
                                    placeholder="e.g. Bruno"
                                />
                            </div>

                            {/* Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none transition-all"
                                >
                                    <option value="Dog">Dog</option>
                                    <option value="Cat">Cat</option>
                                    <option value="Bird">Bird</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* Breed */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Breed</label>
                                <input
                                    type="text"
                                    name="breed"
                                    value={formData.breed}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none transition-all"
                                    placeholder="e.g. Labrador"
                                />
                            </div>

                            {/* Age */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                                <input
                                    type="text"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none transition-all"
                                    placeholder="e.g. 2 years"
                                />
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Male"
                                            checked={formData.gender === 'Male'}
                                            onChange={handleChange}
                                            className="text-gold-600 focus:ring-gold-500"
                                        />
                                        <span className="text-gray-600">Male</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Female"
                                            checked={formData.gender === 'Female'}
                                            onChange={handleChange}
                                            className="text-gold-600 focus:ring-gold-500"
                                        />
                                        <span className="text-gray-600">Female</span>
                                    </label>
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none transition-all"
                                >
                                    <option value="Available">Available</option>
                                    <option value="Adopted">Adopted</option>
                                    <option value="Treatment">Treatment</option>
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                rows="4"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none transition-all resize-none"
                                placeholder="Tell us about the animal's personality, history, etc."
                            ></textarea>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => navigate('/animals')}
                                className="px-6 py-2 text-gray-500 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 px-6 py-2 bg-gold-500 text-white font-medium rounded-lg hover:bg-gold-600 transition-colors shadow-md disabled:opacity-70"
                            >
                                {loading ? (
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Save Animal
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Option Modal */}
            {showOptionModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">Add Photo</h3>
                            <button onClick={() => setShowOptionModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={startCamera}
                                className="flex flex-col items-center justify-center gap-2 p-6 bg-gray-50 hover:bg-gold-50 border border-gray-200 hover:border-gold-200 rounded-xl transition-all group"
                            >
                                <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                    <Camera size={24} className="text-gold-500" />
                                </div>
                                <span className="font-medium text-gray-700 group-hover:text-gold-700">Camera</span>
                            </button>
                            <label className="flex flex-col items-center justify-center gap-2 p-6 bg-gray-50 hover:bg-gold-50 border border-gray-200 hover:border-gold-200 rounded-xl transition-all cursor-pointer group">
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                />
                                <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                    <ImageIcon size={24} className="text-gold-500" />
                                </div>
                                <span className="font-medium text-gray-700 group-hover:text-gold-700">Upload</span>
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {/* Camera Modal */}
            {showCamera && (
                <div className="fixed inset-0 bg-black z-50 flex flex-col">
                    <div className="flex justify-between items-center p-4 text-white">
                        <h3 className="text-lg font-bold">Take Photo</h3>
                        <button onClick={stopCamera} className="p-2 hover:bg-white/10 rounded-full">
                            <X size={24} />
                        </button>
                    </div>
                    <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 bg-black flex justify-center">
                        <button
                            onClick={capturePhoto}
                            className="w-16 h-16 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center hover:scale-105 transition-transform"
                        >
                            <div className="w-12 h-12 bg-gold-500 rounded-full"></div>
                        </button>
                    </div>
                </div>
            )}

            {/* Cropper Modal */}
            {showCropper && (
                <div className="fixed inset-0 bg-black z-50 flex flex-col">
                    <div className="flex justify-between items-center p-4 text-white bg-gray-900">
                        <h3 className="text-lg font-bold">Crop Image</h3>
                        <button onClick={() => setShowCropper(false)} className="p-2 hover:bg-white/10 rounded-full">
                            <X size={24} />
                        </button>
                    </div>
                    <div className="flex-1 relative bg-black">
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={4 / 3}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </div>
                    <div className="p-4 bg-gray-900 flex items-center gap-4">
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => setZoom(e.target.value)}
                            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-gold-500"
                        />
                        <button
                            onClick={showCroppedImage}
                            className="flex items-center gap-2 px-6 py-2 bg-gold-500 text-white font-medium rounded-lg hover:bg-gold-600 transition-colors"
                        >
                            <Check size={18} />
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddAnimal;
