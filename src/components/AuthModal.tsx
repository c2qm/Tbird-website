import { useState } from 'react';
import './AuthModal.css';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const { isAuthModalOpen, authMode, closeAuthModal, login, register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'register'>(authMode);

  if (!isAuthModalOpen) return null;

  const currentMode = mode ?? authMode;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMode === 'login') {
      login(email, password);
    } else {
      register(name || email.split('@')[0], email, password);
    }
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="auth-overlay" onClick={closeAuthModal}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" aria-label="Close" onClick={closeAuthModal}>
          &times;
        </button>

        <h2 className="auth-title">{currentMode === 'login' ? 'Sign In' : 'Create Account'}</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          {currentMode === 'register' && (
            <div className="auth-field">
              <label>Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          )}

          <div className="auth-field">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="auth-submit">
            {currentMode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          {currentMode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button type="button" onClick={() => setMode('register')}>
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button type="button" onClick={() => setMode('login')}>
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}