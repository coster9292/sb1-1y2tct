import React from 'react';
import { Car, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { AuthModal } from '../components/auth/AuthModal';

export function LandingPage() {
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [authMode, setAuthMode] = React.useState<'login' | 'signup'>('login');

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
          <div className="mx-auto max-w-3xl">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-teal-200 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-white rounded-2xl p-3 shadow-lg">
                  <Car className="h-12 w-12 text-teal-600" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Find Your Perfect Car Deal with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-500">
                AI-Powered
              </span>{' '}
              Negotiation
            </h1>
            
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of smart car buyers who use our AI technology to find and negotiate 
              the best deals on their dream cars.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleAuthClick('signup')}
                className="btn-primary text-base px-8 py-4 rounded-xl relative group"
              >
                <span className="relative z-10">Get Started Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-500 rounded-xl group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 bg-gradient-to-r from-teal-500 to-teal-400 rounded-xl"></div>
              </button>
              
              <button
                onClick={() => handleAuthClick('login')}
                className="btn-secondary text-base px-8 py-4"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                AI-Powered Insights
              </h3>
              <p className="text-gray-600">
                Get real-time market analysis and personalized negotiation strategies for any car.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Secure Negotiations
              </h3>
              <p className="text-gray-600">
                Negotiate with confidence using our secure platform and expert guidance.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-6">
                <ArrowRight className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Smart Matching
              </h3>
              <p className="text-gray-600">
                Find the perfect car that matches your criteria and budget automatically.
              </p>
            </div>
          </div>
        </div>
      </div>

      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onToggleMode={(mode) => setAuthMode(mode)}
        />
      )}
    </div>
  );
}