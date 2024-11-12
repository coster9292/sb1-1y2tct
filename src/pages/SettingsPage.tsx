import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, Loader, Shield, LogOut } from 'lucide-react';

export function SettingsPage() {
  const { user, loading, logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setError(null);
    setSuccess(null);
    setUpdating(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Failed to update password. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage your account settings and password
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
              <Mail className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Email Address</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
              <p className="text-gray-600">Update your password to keep your account secure</p>
            </div>
          </div>

          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={updating}
              className="btn-primary py-2.5 px-4 w-full relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-500 opacity-90 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              <div className="relative flex items-center justify-center gap-2">
                {updating ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    Updating Password...
                  </>
                ) : (
                  'Update Password'
                )}
              </div>
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <LogOut className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Sign Out</h2>
              <p className="text-gray-600">Sign out of your account on this device</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-xl font-medium
                     hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}