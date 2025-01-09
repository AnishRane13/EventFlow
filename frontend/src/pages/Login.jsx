import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('attendee');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    // Add login logic here
    console.log('Logging in with:', { email, password, role });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-purple-400/30 to-indigo-400/30 blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-pink-400/30 to-purple-400/30 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="mb-8 text-center">
            <div className="inline-block p-4 rounded-full bg-white/90 shadow-xl mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome back</h2>
            <p className="text-gray-600 mt-2">Enter your details to access your account</p>
          </div>

          {/* Login Form */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
            {/* Role Toggle */}
            <div className="mb-6">
              <div className="flex items-center justify-center p-1 bg-purple-100 rounded-lg">
                <button
                  className={`flex-1 px-4 py-2 rounded-md transition-all duration-200 ${
                    role === 'attendee'
                      ? 'bg-white shadow-md text-purple-700'
                      : 'text-purple-600 hover:text-purple-800'
                  }`}
                  onClick={() => setRole('attendee')}
                >
                  Attendee
                </button>
                <button
                  className={`flex-1 px-4 py-2 rounded-md transition-all duration-200 ${
                    role === 'organizer'
                      ? 'bg-white shadow-md text-purple-700'
                      : 'text-purple-600 hover:text-purple-800'
                  }`}
                  onClick={() => setRole('organizer')}
                >
                  Organizer
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email address</span>
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-12 py-3 rounded-lg border border-gray-300 
                      bg-white/70 backdrop-blur-sm
                      focus:ring-2 focus:ring-purple-600 focus:border-transparent 
                      hover:border-purple-400 hover:shadow-md
                      outline-none transition-all duration-200
                      peer"
                    placeholder="name@example.com"
                    autoComplete="email"
                  />
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    {email && (
                      <button
                        type="button"
                        onClick={() => setEmail('')}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                {email && !email.includes('@') && (
                  <p className="text-sm text-amber-600 mt-1 flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Please enter a valid email address</span>
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Password</span>
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-12 py-3 rounded-lg border border-gray-300 
                      bg-white/70 backdrop-blur-sm
                      focus:ring-2 focus:ring-purple-600 focus:border-transparent 
                      hover:border-purple-400 hover:shadow-md
                      outline-none transition-all duration-200"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                {password && password.length < 6 && (
                  <p className="text-sm text-amber-600 mt-1 flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Password must be at least 6 characters</span>
                  </p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="flex items-center justify-end">
                <button type="button" className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 
                  text-white py-3 px-6 rounded-lg font-medium
                  hover:from-indigo-700 hover:to-purple-700
                  active:from-indigo-800 active:to-purple-800
                  transform transition-all duration-200
                  hover:shadow-lg hover:scale-[1.02]
                  active:scale-[0.98]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center space-x-2"
                disabled={!email || !password || password.length < 6 || !email.includes('@')}
              >
                <span>Sign in</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>

            {/* Sign Up Section */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button className="text-purple-600 hover:text-purple-800 font-medium">
                  Sign up
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            {/* <p>Protected by reCAPTCHA and subject to the</p> */}
            <p className="mt-1">
              <button className="text-purple-600 hover:text-purple-800">Privacy Policy</button>
              {' '}and{' '}
              <button className="text-purple-600 hover:text-purple-800">Terms of Service</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;