import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PawPrint, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsLoading(true);

        try {
            await login(email, password);
            toast.success('Welcome back! 🐾');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold-300 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold-200 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-500"></div>
                </div>
            </div>

            {/* Floating Paw Prints */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute opacity-10"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    >
                        <PawPrint size={48 + Math.random() * 48} className="text-white" />
                    </div>
                ))}
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md px-6">
                <div className="glass-card rounded-3xl p-8 shadow-2xl animate-fadeIn">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 shadow-lg mb-4">
                            <PawPrint size={40} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-brown-800">Paw of Hope</h1>
                        <p className="text-brown-500 mt-2">Admin Portal</p>
                    </div>

                    {/* Demo Credentials Info */}
                    <div className="mb-6 p-4 bg-gold-50 border border-gold-200 rounded-xl">
                        <p className="text-sm text-brown-600 text-center">
                            <span className="font-semibold">Demo Credentials:</span><br />
                            Email: admin@pawofhope.org<br />
                            Password: admin123
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail size={20} className="text-brown-400 group-focus-within:text-gold-500 transition-colors" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-brown-100 rounded-xl focus:border-gold-500 focus:ring-4 focus:ring-gold-100 transition-all duration-200 outline-none text-brown-800 placeholder-brown-300"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock size={20} className="text-brown-400 group-focus-within:text-gold-500 transition-colors" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full pl-12 pr-12 py-4 bg-white border-2 border-brown-100 rounded-xl focus:border-gold-500 focus:ring-4 focus:ring-gold-100 transition-all duration-200 outline-none text-brown-800 placeholder-brown-300"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-brown-400 hover:text-gold-500 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-brown-300 text-gold-500 focus:ring-gold-500"
                                />
                                <span className="text-sm text-brown-600">Remember me</span>
                            </label>
                            <button type="button" className="text-sm text-gold-600 hover:text-gold-700 font-medium transition-colors">
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold rounded-xl shadow-lg shadow-gold-500/30 hover:shadow-xl hover:shadow-gold-500/40 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-brown-400">
                            Helping animals find their forever homes 🏠
                        </p>
                    </div>
                </div>

                {/* Attribution */}
                <p className="text-center text-white/70 text-sm mt-6">
                    © 2024 Paw of Hope NGO. All rights reserved.
                </p>
            </div>

            {/* CSS for floating animation */}
            <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
      `}</style>
        </div>
    );
};

export default LoginPage;
