import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [role, setRole] = useState('attendee');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Add signup logic here
    console.log('Signing up with:', { ...formData, role });
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
        <div className="w-full max-w-4xl">
          {/* Logo Section */}
          <div className="mb-8 text-center">
            <div className="inline-block p-4 rounded-full bg-white/90 shadow-xl mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-600 mt-2">Join us today and get started</p>
          </div>

          {/* Signup Form */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
            {/* Role Toggle */}
            <div className="mb-6 max-w-md mx-auto">
              <div className="flex items-center justify-center p-1 bg-purple-100 rounded-lg">
                <button
                  type="button"
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
                  type="button"
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

              {/* Two-column grid for form fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 
                      bg-white/70 backdrop-blur-sm
                      focus:ring-2 focus:ring-purple-600 focus:border-transparent 
                      hover:border-purple-400 hover:shadow-md
                      outline-none transition-all duration-200"
                    placeholder="John Doe"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 
                      bg-white/70 backdrop-blur-sm
                      focus:ring-2 focus:ring-purple-600 focus:border-transparent 
                      hover:border-purple-400 hover:shadow-md
                      outline-none transition-all duration-200"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                {/* Phone Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 
                      bg-white/70 backdrop-blur-sm
                      focus:ring-2 focus:ring-purple-600 focus:border-transparent 
                      hover:border-purple-400 hover:shadow-md
                      outline-none transition-all duration-200"
                    placeholder="+1 (555) 000-0000"
                    required
                  />
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
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 
                        bg-white/70 backdrop-blur-sm
                        focus:ring-2 focus:ring-purple-600 focus:border-transparent 
                        hover:border-purple-400 hover:shadow-md
                        outline-none transition-all duration-200"
                      placeholder="Enter your password"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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

                {/* Confirm Password Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Confirm Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 
                        bg-white/70 backdrop-blur-sm
                        focus:ring-2 focus:ring-purple-600 focus:border-transparent 
                        hover:border-purple-400 hover:shadow-md
                        outline-none transition-all duration-200"
                      placeholder="Confirm your password"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
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
                disabled={!formData.email || !formData.password || formData.password.length < 6 || !formData.name || !formData.phone}
              >
                <span>Create Account</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button className="text-purple-600 hover:text-purple-800 font-medium">
                  Sign in
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
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

export default SignUp;