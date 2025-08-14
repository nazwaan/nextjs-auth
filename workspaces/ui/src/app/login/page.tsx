'use client';
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    console.log('Login attempted with: ', { username, password })

    await axios.post('/api/refresh-token', { username, password })
      .catch(error => console.log(error.response.data));

    router.push("/")
  };

  useEffect(() => {
    axios.get('/api/test')
      .then(response => console.log(response.data))
      .catch(error => console.log(`Could not connect to the server: ${error}`));
  }, []);

  return (
    <div className="login-container">
      <h1 className="login-header">Welcome</h1>
      <p className="login-subheader">Sign in to your account</p>

      <div className="input-container">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') document.getElementById('password-input')?.focus();
          }}
          className="login-input"
        />

        <input
          id="password-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') document.getElementById('login-button')?.click()
          }}
          className="login-input"
        />

        <button id="login-button" onClick={handleSubmit} className="login-button">Sign In</button>
      </div>

      <a href="#" className="forgot-password-text">Forgot your password?</a>

      <p className="signup">
        Don't have an account?{' '}
        <a href="#">
          Sign up
        </a>
      </p>
    </div>

    // <div className="min-h-screen bg-black flex items-center justify-center p-4">
    //   <div className="w-full max-w-md">
    //     <div className="text-center mb-12">
    //       <h1 className="text-4xl font-light text-white mb-2 tracking-wide">
    //         Welcome
    //       </h1>
    //       <p className="text-gray-400 text-sm">
    //         Sign in to your account
    //       </p>
    //     </div>

    //     <div className="space-y-6">
    //       <div className="relative">
    //         <input
    //           type="text"
    //           value={username}
    //           onChange={(e) => setUsername(e.target.value)}
    //           onFocus={() => setIsFocused({ ...isFocused, username: true })}
    //           onBlur={() => setIsFocused({ ...isFocused, username: false })}
    //           placeholder="Username"
    //           className={`w-full h-12 px-4 bg-transparent border rounded-lg text-white placeholder-gray-500 transition-all duration-200 focus:outline-none ${
    //             isFocused.username || username 
    //               ? 'border-white shadow-lg shadow-white/10' 
    //               : 'border-gray-700 hover:border-gray-600'
    //           }`}
    //         />
    //       </div>

    //       <div className="relative">
    //         <input
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           onFocus={() => setIsFocused({ ...isFocused, password: true })}
    //           onBlur={() => setIsFocused({ ...isFocused, password: false })}
    //           placeholder="Password"
    //           className={`w-full h-12 px-4 bg-transparent border rounded-lg text-white placeholder-gray-500 transition-all duration-200 focus:outline-none ${
    //             isFocused.password || password 
    //               ? 'border-white shadow-lg shadow-white/10' 
    //               : 'border-gray-700 hover:border-gray-600'
    //           }`}
    //         />
    //       </div>

    //       <button
    //         onClick={handleSubmit}
    //         className="w-full h-12 bg-white text-black font-medium rounded-lg transition-all duration-200 hover:bg-gray-100 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
    //       >
    //         Sign In
    //       </button>

    //       <div className="text-center">
    //         <a 
    //           href="#" 
    //           className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
    //         >
    //           Forgot your password?
    //         </a>
    //       </div>
    //     </div>

    //     <div className="mt-8 text-center">
    //       <p className="text-gray-500 text-xs">
    //         Don't have an account?{' '}
    //         <a href="#" className="text-white hover:underline transition-colors duration-200">
    //           Sign up
    //         </a>
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
}