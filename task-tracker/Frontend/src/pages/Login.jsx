import React, { useState } from 'react';
import axios from 'axios';
import { saveToken } from '../utils/auth.js';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import api from '../helpers/api.js';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../helpers/firebase.js';




const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
    const res=await api.post('/auth/login',form);
    saveToken(res.data.token);
    navigate('/dashboard');
   }
   catch(error) {
    alert(error.response?.data?.message ||"Login failed");
   }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      const res = await api.post('/auth/google', {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL

      });
  
      saveToken(res.data.token);
      navigate('/dashboard');
    } catch (error) {
      alert('Google login failed');
      console.error(error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 font-sans px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-blue-800 via-blue-900 to-purple-900 w-full max-w-md p-10 rounded-[2.5rem] shadow-2xl text-white transition-all duration-300"
      >
        <h2 className="text-4xl font-bold text-center mb-8">Sign In</h2>

        {/* Email Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 transition focus-within:ring-2 ring-blue-400">
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
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 transition focus-within:ring-2 ring-blue-400">
            <FiLock className="text-gray-500 mr-3 text-lg" />
            <input
              type="password"
              placeholder="Your secure password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="bg-transparent w-full text-black placeholder-gray-500 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-semibold py-2.5 rounded-full text-base"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="text-center text-sm text-white/70 my-4">or</div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-white text-black py-2.5 rounded-full font-medium flex items-center justify-center gap-3 hover:bg-gray-100 transition duration-200 shadow-sm"
        >
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </button>

        {/* Signup Redirect */}
        <p className="text-sm mt-6 text-center">
          New here?{' '}
          <Link
            to="/signup"
            className="font-semibold text-white hover:text-yellow-300 transition duration-150"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
