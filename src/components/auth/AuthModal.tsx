import React, { useState } from 'react';
import { X, Mail, Lock, Loader } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AuthModalProps {
  mode: 'login' | 'signup';
  onClose: () => void;
  onToggleMode: (mode: 'login' | 'signup') => void;
}

export function AuthModal({ mode, onClose, onToggleMode }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, signup, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup(email, password);
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-gray-600 mb-6">
            {mode === 'login' 
              ? 'Sign in to continue to AutoYard'
              : 'Start your journey to finding the perfect car'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-500 opacity-90 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              <div className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                  </>
                ) : (
                  <>{mode === 'login' ? 'Sign in' : 'Create account'}</>
                )}
              </div>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {mode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    onClick={() => onToggleMode('signup')}
                    className="text-teal-600 hover:text-teal-700 font-medium"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => onToggleMode('login')}
                    className="text-teal-600 hover:text-teal-700 font-medium"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}