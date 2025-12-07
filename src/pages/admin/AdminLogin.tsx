import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      if (data?.session) {
        // Verify admin role
        const user = data.session.user;
        if (user.user_metadata?.role !== 'admin') {
          setError('You do not have admin access');
          await supabase.auth.signOut();
          setLoading(false);
          return;
        }

        // Store session
        localStorage.setItem('admin_token', data.session.access_token);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.log('Login error:', err);
      setError('Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-2xl shadow-xl mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-2 rounded-lg">
              <span className="text-2xl">🎁</span>
            </div>
            <span className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              RegalaSends
            </span>
          </div>
          <h1 className="text-3xl text-white mb-2">Admin Portal</h1>
          <p className="text-pink-100">Sign in to access the dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 text-red-700">
                {error}
              </div>
            )}

            <div>
              <label className="block text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  placeholder="admin@regalosends.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg hover:shadow-xl transition disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-purple-600 hover:text-purple-700 text-sm">
              ← Back to Website
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-white text-sm">
          <p>Demo Credentials (for testing):</p>
          <p className="text-pink-100">Email: admin@regalosends.com</p>
          <p className="text-pink-100">Password: admin123</p>
        </div>
      </div>
    </div>
  );
}
