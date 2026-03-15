import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiAlertCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [tab, setTab] = useState('signin'); // 'signin' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, signInWithEmail, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success('Welcome back! 🎬');
      navigate(from, { replace: true });
    } catch (err) {
      console.error('GOOGLE AUTH ERROR STR:', err.toString());
      console.error('GOOGLE AUTH ERROR CODE:', err.code);
      console.error('GOOGLE AUTH ERROR MSG:', err.message);
      
      const msg = err.code === 'auth/popup-closed-by-user' 
        ? 'Sign in cancelled.' 
        : err.code === 'auth/unauthorized-domain'
        ? 'Domain not authorized in Firebase Console.'
        : err.code === 'auth/operation-not-allowed'
        ? 'Google Sign-In is not enabled in Firebase > Authentication > Sign-in method.'
        : err.message.includes('popup') 
        ? 'Popup was blocked. Please allow popups.' 
        : `Google sign in failed: ${err.code || err.message}`;
        
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (tab === 'signup') {
        await signUp(form.email, form.password, form.name);
        toast.success('Account created! Welcome to CineBook 🎬');
      } else {
        await signInWithEmail(form.email, form.password);
        toast.success('Welcome back! 🎬');
      }
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.code;
      if (msg === 'auth/user-not-found' || msg === 'auth/wrong-password') setError('Invalid email or password.');
      else if (msg === 'auth/email-already-in-use') setError('Email already in use. Try signing in.');
      else if (msg === 'auth/weak-password') setError('Password must be at least 6 characters.');
      else if (msg === 'auth/invalid-email') setError('Invalid email address.');
      else setError('Authentication failed. Please check your Firebase configuration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-dark-900 pt-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">🎬</span>
            </div>
            <span className="text-2xl font-black">
              <span className="text-white">Cine</span>
              <span className="text-gradient">Book</span>
            </span>
          </div>
          <p className="text-white/50 text-sm">Your premier movie booking experience</p>
        </div>

        <div className="glass p-6 md:p-8">
          {/* Tabs */}
          <div className="flex bg-white/5 rounded-xl p-1 mb-6">
            {['signin', 'signup'].map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(''); }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  tab === t ? 'bg-primary text-white shadow-md' : 'text-white/50 hover:text-white'
                }`}
              >
                {t === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white hover:bg-gray-100 text-gray-800 font-semibold text-sm transition-all duration-200 hover:shadow-lg mb-4"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'signup' && (
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:border-primary rounded-xl text-white placeholder-white/30 outline-none text-sm transition-colors"
                />
              </div>
            )}
            <div className="relative">
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" size={16} />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:border-primary rounded-xl text-white placeholder-white/30 outline-none text-sm transition-colors"
              />
            </div>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" size={16} />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:border-primary rounded-xl text-white placeholder-white/30 outline-none text-sm transition-colors"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5 text-sm text-red-400">
                <FiAlertCircle size={16} className="mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              )}
              {tab === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
