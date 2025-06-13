import React, { useState, useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export default function Gallery() {
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'projects'),
      (snapshot) => {
        console.log('Gallery: Loading projects, found', snapshot.size, 'projects');
        const images = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          console.log('Gallery: Project data:', data.name, 'Images:', data.images?.length || 0);
          
          // Check if project has images (metadata from UploadProject.jsx structure)
          if (data.images && Array.isArray(data.images) && data.images.length > 0) {
            data.images.forEach((image, index) => {
              // Using the actual structure from UploadProject.jsx: {name, size, type, index, uploaded}
              images.push({
                id: `${data.id}_${index}`,
                projectName: data.name,
                userEmail: data.userEmail,
                imageName: image.name || `Image ${index + 1}`,
                imageData: null, // No actual image data stored
                createdAt: data.createdAt,
                status: data.status,
                imageSize: image.size || 0,
                imageType: image.type || 'image/jpeg',
                uploaded: image.uploaded || false
              });
            });
          }
        });
        
        console.log('Gallery: Total images found:', images.length);
        console.log('Gallery: Projects in database:', snapshot.size);
        
        // Debug: Log each project's structure
        snapshot.forEach((doc) => {
          const data = doc.data();
          console.log('Project:', data.name, 'has images array:', !!data.images, 'length:', data.images?.length);
          if (data.images && data.images.length > 0) {
            console.log('First image structure:', data.images[0]);
          }
        });
        
        console.log('Gallery: Final images count:', images.length);
        
        // Shuffle images for mixed display
        const shuffledImages = images.sort(() => Math.random() - 0.5);
        setAllImages(shuffledImages);
        setLoading(false);
      },
      (error) => {
        console.error('Error loading gallery:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-screen bg-zinc-50 text-zinc-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-zinc-200 p-4 bg-white">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold mr-6">Image Gallery</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-sm font-medium">Zihad UIUX</span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-zinc-900">Image Gallery ({allImages.length} images)</h2>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Refresh
                </button>
                <div className="flex items-center text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Live Updates
                </div>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🖼️</div>
                <p className="text-zinc-500">Loading gallery...</p>
              </div>
            ) : allImages.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📷</div>
                <p className="text-zinc-500">No images found</p>
                <p className="text-sm text-zinc-400 mt-2">Images will appear here when users upload projects</p>
                <div className="mt-4 p-4 bg-zinc-50 rounded-lg text-left max-w-md mx-auto">
                  <p className="text-sm font-medium text-zinc-700 mb-2">Debug Info:</p>
                  <p className="text-xs text-zinc-600">Check browser console for detailed logs</p>
                  <p className="text-xs text-zinc-600">Try uploading a project first at /upload-project</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {allImages.map((image) => (
                  <div 
                    key={image.id} 
                    className="aspect-square bg-zinc-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 relative group"
                    onClick={() => setSelectedImage(image)}
                  >
                                         <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                       <div className="text-center">
                         <div className="text-2xl mb-1">🖼️</div>
                         <div className="text-xs text-zinc-600 font-medium">{image.imageName.substring(0, 10)}</div>
                         <div className="text-xs text-zinc-500">{(image.imageSize / 1024 / 1024).toFixed(1)}MB</div>
                         <div className="text-xs text-green-600">{image.uploaded ? '✓' : '⏳'}</div>
                       </div>
                     </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-end">
                      <div className="p-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <p className="font-medium truncate">{image.projectName}</p>
                        <p className="text-xs opacity-75">{image.userEmail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Image Modal */}
            {selectedImage && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setSelectedImage(null)}>
                <div className="bg-white rounded-lg max-w-4xl max-h-full overflow-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{selectedImage.imageName}</h3>
                        <p className="text-sm text-zinc-600">From: {selectedImage.projectName}</p>
                        <p className="text-xs text-zinc-500">By: {selectedImage.userEmail}</p>
                      </div>
                      <button 
                        onClick={() => setSelectedImage(null)}
                        className="text-zinc-500 hover:text-zinc-700 text-2xl"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="aspect-video bg-zinc-100 rounded flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🖼️</div>
                        <p className="text-zinc-600">Image Preview</p>
                        <p className="text-sm text-zinc-500 mt-2">{selectedImage.imageName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 