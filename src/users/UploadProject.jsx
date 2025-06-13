import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, updateDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";

export default function UploadProject() {
  const [projectName, setProjectName] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    setSelectedImages(prev => [...prev, ...imageFiles].slice(0, 50)); // Max 50 images
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(prev => [...prev, ...files].slice(0, 50)); // Max 50 images
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const generateUniqueId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const getRandomCompletionTime = () => {
    // Random between 5-7 hours in milliseconds
    const minHours = 5;
    const maxHours = 7;
    const randomHours = Math.random() * (maxHours - minHours) + minHours;
    return Math.round(randomHours * 60 * 60 * 1000); // Convert to milliseconds
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleUpload = async () => {
    if (!projectName.trim()) {
      alert("Please enter a project name");
      return;
    }

    if (selectedImages.length < 4) {
      alert("Please upload at least 4 images");
      return;
    }

    if (selectedImages.length > 50) {
      alert("Maximum 50 images allowed. Please remove some images.");
      return;
    }

    // Check file sizes
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const oversizedFiles = selectedImages.filter(file => file.size > maxFileSize);
    if (oversizedFiles.length > 0) {
      alert(`Some files are too large (max 10MB). Please compress or remove: ${oversizedFiles.map(f => f.name).join(', ')}`);
      return;
    }

    setUploading(true);

    try {
      // Check authentication
      const user = auth.currentUser;
      if (!user) {
        alert("Please log in again to continue");
        navigate('/login');
        return;
      }

      // Test Firestore connection with a simple read
      try {
        await getDocs(collection(db, 'projects'));
      } catch (connectionError) {
        throw new Error('Unable to connect to database. Please check your internet connection.');
      }

      const projectId = generateUniqueId();
      const completionTimeMs = getRandomCompletionTime();
      const estimatedCompletionTime = new Date(Date.now() + completionTimeMs);

      // Create project document with basic info only (no images for now)
      const projectDoc = await addDoc(collection(db, 'projects'), {
        id: projectId,
        name: projectName.trim(),
        userEmail: user.email,
        userId: user.uid,
        status: 'queued',
        progress: 0,
        imageCount: selectedImages.length,
        createdAt: new Date().toISOString(),
        estimatedCompletionTime: estimatedCompletionTime.toISOString(),
        completionTimeMs: completionTimeMs,
        queuePosition: Math.floor(Math.random() * 5) + 1,
        // Store only image metadata, not base64 data to avoid size limits
        images: selectedImages.map((file, index) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          index: index,
          uploaded: true // Mark as uploaded for demo purposes
        }))
      });

      alert("Project created successfully!");
      navigate('/user-dashboard');

    } catch (error) {
      console.error('Upload error:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Failed to create project. ';
      
      if (error.code === 'permission-denied') {
        errorMessage += 'You do not have permission to create projects.';
      } else if (error.code === 'unavailable') {
        errorMessage += 'Service is temporarily unavailable. Please try again later.';
      } else if (error.code === 'resource-exhausted') {
        errorMessage += 'Too many images or file size too large. Please reduce the number of images.';
      } else if (error.message?.includes('network')) {
        errorMessage += 'Network error. Please check your internet connection.';
      } else if (error.message?.includes('quota')) {
        errorMessage += 'Storage quota exceeded. Please contact support.';
      } else {
        errorMessage += 'Please try again or contact support if the problem persists.';
      }
      
      alert(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Upload New Project</h1>
              <p className="text-sm text-gray-600">Create a new 3D reconstruction project</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/user-dashboard')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Back to Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 max-w-4xl mx-auto w-full space-y-6">
          
          {/* Project Name */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Project Details</h3>
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-2">
                Project Name *
              </label>
              <input
                type="text"
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter a descriptive name for your project"
                maxLength={100}
              />
              <p className="text-xs text-gray-500 mt-1">
                Choose a name that helps you identify this reconstruction project
              </p>
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Upload Images</h3>
            <p className="text-sm text-gray-600 mb-4">
              Upload at least 4 images from different angles. More images (10-50) will result in better 3D reconstruction quality.
            </p>

            {/* Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="text-6xl mb-4">📸</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Drag and drop images here
              </h4>
              <p className="text-gray-600 mb-4">or</p>
              <label className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors inline-block">
                Browse Files
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-4">
                Supported formats: JPEG, PNG, TIFF • Max 50 images • Max 10MB per image
              </p>
            </div>

            {/* Selected Images */}
            {selectedImages.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">
                    Selected Images ({selectedImages.length})
                  </h4>
                  <div className={`text-sm font-medium ${
                    selectedImages.length >= 4 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedImages.length >= 4 
                      ? `✅ Ready to upload` 
                      : `❌ Need ${4 - selectedImages.length} more images`
                    }
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {selectedImages.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {file.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Upload Requirements */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h4 className="font-semibold text-blue-900 mb-3">📋 Upload Requirements</h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-center">
                <span className={`mr-2 ${selectedImages.length >= 4 ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedImages.length >= 4 ? '✅' : '❌'}
                </span>
                Minimum 4 images required
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-2">📷</span>
                Take photos from different angles around the object/scene
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-2">💡</span>
                Ensure good lighting and avoid blurry images
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-2">🔄</span>
                Overlap between images should be 60-80%
              </li>
            </ul>
          </div>

          {/* Upload Button */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">Ready to create your 3D model?</h4>
                <p className="text-sm text-gray-600">
                  Processing will take approximately 5-7 hours depending on queue
                </p>
              </div>
              <button
                onClick={handleUpload}
                disabled={uploading || selectedImages.length < 4 || !projectName.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {uploading ? '🔄 Creating Project...' : '🚀 Create Project'}
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
} 