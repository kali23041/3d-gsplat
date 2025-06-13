import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="relative z-10 px-4 sm:px-6 py-4 animate-fade-in-down">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
              <span className="text-white font-bold text-sm sm:text-lg">3D</span>
            </div>
            <span className="text-white text-lg sm:text-xl font-bold">Gaussian Splatting</span>
          </div>
          <Link
            to="/login"
            className="bg-white text-blue-900 px-4 py-2 sm:px-6 rounded-full font-semibold hover:bg-blue-50 transition-all duration-200 hover:scale-105 text-sm sm:text-base"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 px-4 sm:px-6 py-12 sm:py-20 animate-fade-in-up">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-4 sm:mb-6 animate-slide-up">
            3D Gaussian
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              {" "}Splatting
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 sm:mb-8 max-w-4xl mx-auto animate-slide-up-delay-1">
            Advanced Neural Radiance Fields for Real-Time 3D Scene Reconstruction
          </p>
          <p className="text-base sm:text-lg text-blue-200 mb-8 sm:mb-12 max-w-3xl mx-auto animate-slide-up-delay-2">
            Transform multi-view images into photorealistic 3D models using cutting-edge Gaussian splatting technology. 
            Perfect for research, visualization, and immersive experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay-3">
            <Link
              to="/login"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:scale-105 hover:shadow-xl"
            >
              🚀 Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/20 transition-all duration-200 border border-white/20 hover:scale-105"
            >
              📝 Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12 sm:mb-16 animate-fade-in">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: "📸",
                title: "Multi-View Processing",
                description: "Upload images from different angles and automatically extract camera poses and 3D structure"
              },
              {
                icon: "⚡",
                title: "Real-Time Rendering",
                description: "Experience smooth 60+ FPS rendering with optimized Gaussian splatting algorithms"
              },
              {
                icon: "🧠",
                title: "Neural Networks",
                description: "Advanced AI-powered reconstruction using state-of-the-art neural radiance fields"
              },
              {
                icon: "🎯",
                title: "High Accuracy",
                description: "Achieve 98%+ reconstruction accuracy with PSNR values exceeding 38 dB"
              },
              {
                icon: "🛠️",
                title: "Processing Tools",
                description: "Complete pipeline with 20+ tools for preprocessing, optimization, and analysis"
              },
              {
                icon: "📊",
                title: "Analytics Dashboard",
                description: "Monitor training progress with real-time charts and comprehensive metrics"
              }
                         ].map((feature, index) => (
               <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                 <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 animate-bounce-subtle">{feature.icon}</div>
                 <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{feature.title}</h3>
                 <p className="text-blue-100 text-sm sm:text-base">{feature.description}</p>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="relative z-10 px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Academic Project</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
              <div className="animate-slide-in-left">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-300 mb-2 sm:mb-3">🎓 Institution</h3>
                <p className="text-white text-sm sm:text-base">Dattakala College of Engineering, Pune</p>
                <p className="text-blue-100 text-sm sm:text-base">ENTC Department</p>
                <p className="text-blue-100 text-sm sm:text-base">BE Final Year 2024-25</p>
              </div>
              <div className="animate-slide-in-right">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-300 mb-2 sm:mb-3">👥 Team Members</h3>
                <p className="text-white text-sm sm:text-base">Kartik Sabale</p>
                <p className="text-white text-sm sm:text-base">Sai Rakshe</p>
                <p className="text-white text-sm sm:text-base">Bhavana Borkar</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Create Amazing 3D Models?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8">
            Start your 3D reconstruction journey with our advanced Gaussian splatting platform
          </p>
          <Link
            to="/signup"
            className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl font-bold text-lg sm:text-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:scale-105 hover:shadow-xl animate-pulse-slow"
          >
            🌟 Get Started Now
          </Link>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>
    </div>
  );
} 