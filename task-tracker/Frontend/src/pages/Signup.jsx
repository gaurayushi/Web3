import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiGlobe, FiImage } from 'react-icons/fi'; // ✅ import avatar icon
import { FcGoogle } from 'react-icons/fc';

import api from '../helpers/api.js';
import { saveToken } from '../utils/auth.js';

import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../helpers/firebase.js';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
    avatar: '', // ✅ added avatar field
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/signup', form);
      saveToken(res.data.token);
      alert('Signup successful!');
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await api.post('/auth/google', {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL || '',
      });

      saveToken(res.data.token);
      navigate('/dashboard');
    } catch (error) {
      alert('Google signup failed');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 font-sans px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-blue-800 via-blue-900 to-purple-900 w-[450px] p-6 rounded-2xl shadow-2xl text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 ring-blue-400">
            <FiUser className="text-gray-500 mr-3 text-lg" />
            <input
              type="text"
              placeholder="Your full name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-transparent w-full text-black placeholder-gray-500 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 ring-blue-400">
            <FiMail className="text-gray-500 mr-3 text-lg" />
            <input
              type="email"
              placeholder="Your email address"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-transparent w-full text-black placeholder-gray-500 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 ring-blue-400">
            <FiLock className="text-gray-500 mr-3 text-lg" />
            <input
              type="password"
              placeholder="Create a strong password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="bg-transparent w-full text-black placeholder-gray-500 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Country Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Country</label>
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 ring-blue-400">
            <FiGlobe className="text-gray-500 mr-3 text-lg" />
            <input
              type="text"
              placeholder="Your country"
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="bg-transparent w-full text-black placeholder-gray-500 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Avatar Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Avatar URL (Optional)</label>
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 ring-blue-400">
            <FiImage className="text-gray-500 mr-3 text-lg" />
            <input
              type="url"
              placeholder="https://example.com/avatar.jpg"
              onChange={(e) => setForm({ ...form, avatar: e.target.value })}
              className="bg-transparent w-full text-black placeholder-gray-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-full text-sm transition"
        >
          Sign Up
        </button>

        <div className="text-center text-sm text-white/70 my-3">or</div>

        {/* Google Signup */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full bg-white text-black py-2.5 rounded-full font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition shadow-sm"
        >
          <FcGoogle className="text-xl" />
          Sign up with Google
        </button>

        {/* Login Redirect */}
        <p className="text-xs mt-5 text-center">
          Already have an account?{' '}
          <Link
            to="/"
            className="font-semibold text-white hover:text-yellow-300 transition"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
