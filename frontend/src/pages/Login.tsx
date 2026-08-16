import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { IndustrialScene } from '../components/3d/IndustrialScene';
import { Shield, Lock, Mail, AlertTriangle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const data = await authService.login({ email, password });
      login(data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed. Verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-background">
      {/* Left side: 3D Visualization */}
      <div className="flex-1 relative hidden lg:block border-r border-border">
        <IndustrialScene isScanning={false} showParticles={true} />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/20 pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 text-primary font-mono text-sm tracking-widest">
          AWAITING AUTHORIZATION...
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-[500px] flex flex-col justify-center px-12 relative z-10 bg-panel/50 backdrop-blur-md">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 border border-primary flex items-center justify-center rounded-sm">
              <Shield size={20} className="text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">SYSTEM ACCESS</h2>
          <p className="text-gray-400 font-mono text-sm">Enter credentials to access command center.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-error/10 border border-error/50 text-error font-mono text-xs flex items-start gap-3">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-400 tracking-wider">OPERATOR EMAIL</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={16} className="text-gray-500" />
              </div>
              <input 
                type="email" 
                required
                className="input-field pl-10 h-12" 
                placeholder="operator@inspect.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-400 tracking-wider">SECURITY KEY (PASSWORD)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={16} className="text-gray-500" />
              </div>
              <input 
                type="password" 
                required
                className="input-field pl-10 h-12" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary w-full h-12 mt-4 flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-pulse">AUTHENTICATING...</span>
            ) : (
              <>
                AUTHORIZE ACCESS
                <Lock size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-gray-500 font-mono text-xs">
            Unregistered operator? <button onClick={() => navigate('/register')} className="text-primary hover:underline">Request Access</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
