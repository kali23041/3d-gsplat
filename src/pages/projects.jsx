import React, { useState, useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import { collection, getDocs, query, orderBy, onSnapshot, deleteDoc, doc, where } from "firebase/firestore";
import { db } from "../firebase/config";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up real-time listener
    const unsubscribe = onSnapshot(
      collection(db, 'projects'),
      (snapshot) => {
        const allProjects = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          allProjects.push({
            docId: doc.id, // Firestore document ID
            id: data.id,
            name: data.name,
            userEmail: data.userEmail,
            userId: data.userId,
            status: data.status,
            imageCount: data.imageCount,
            createdAt: data.createdAt,
            images: data.images || [],
            queuePosition: data.queuePosition
          });
        });
        
        // Sort by creation date (newest first)
        allProjects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProjects(allProjects);
        setLoading(false);
      },
      (error) => {
        console.error('Error listening to projects:', error);
        setLoading(false);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const loadAllProjects = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'projects'));
      const querySnapshot = await getDocs(q);
      const allProjects = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        allProjects.push({
          id: data.id,
          name: data.name,
          userEmail: data.userEmail,
          userId: data.userId,
          status: data.status,
          imageCount: data.imageCount,
          createdAt: data.createdAt,
          images: data.images || [],
          queuePosition: data.queuePosition
        });
      });
      
      // Sort by creation date (newest first)
      allProjects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setProjects(allProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (project) => {
    if (!window.confirm(`Are you sure you want to delete "${project.name}" by ${project.userEmail}? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'projects', project.docId));
      // No need to update local state - real-time listener will handle it
    } catch (error) {
      console.error('Error deleting project:', error);
      alert(`Failed to delete project: ${error.message}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'queued': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-zinc-50 text-zinc-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-zinc-200 p-4 bg-white">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold mr-6">Project Management</h1>
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
              <h2 className="text-2xl font-bold text-zinc-900">All Projects ({projects.length})</h2>
              <div className="flex items-center space-x-2">
                <div className="flex items-center text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Live Updates
                </div>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">⏳</div>
                <p className="text-zinc-500">Loading all projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📁</div>
                <p className="text-zinc-500">No projects found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-zinc-50 rounded-lg p-4 border border-zinc-200 hover:shadow-md transition-shadow">
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-zinc-900 truncate">{project.name}</h3>
                        <p className="text-sm text-zinc-500">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>

                    {/* User Details */}
                    <div className="mb-3 p-2 bg-white rounded border">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                          {project.userEmail.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-zinc-900 truncate">{project.userEmail}</p>
                          <p className="text-xs text-zinc-500">User ID: {project.userId?.substring(0, 8)}...</p>
                        </div>
                      </div>
                    </div>

                    {/* Project Stats */}
                    <div className="flex justify-between text-sm text-zinc-600 mb-3">
                      <span>{project.imageCount} images</span>
                      {project.queuePosition && (
                        <span>Queue: #{project.queuePosition}</span>
                      )}
                    </div>

                    {/* First 4 Images */}
                    <div className="grid grid-cols-4 gap-1 mb-3">
                      {project.images.slice(0, 4).map((image, index) => (
                        <div key={index} className="aspect-square bg-zinc-200 rounded overflow-hidden">
                          {image.data || (typeof image === 'string' && image.startsWith('data:')) ? (
                            <img
                              src={image.data || image}
                              alt={`${project.name} - Image ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs" style={{display: image.data || (typeof image === 'string' && image.startsWith('data:')) ? 'none' : 'flex'}}>
                            📷
                          </div>
                        </div>
                      ))}
                      {/* Fill empty slots if less than 4 images */}
                      {Array.from({ length: Math.max(0, 4 - project.images.length) }).map((_, index) => (
                        <div key={`empty-${index}`} className="aspect-square bg-zinc-100 rounded border-2 border-dashed border-zinc-300 flex items-center justify-center">
                          <span className="text-zinc-400 text-xs">📷</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-zinc-600 hover:bg-zinc-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors">
                        View Details
                      </button>
                      {project.status === 'failed' && (
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors">
                          Retry
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteProject(project)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                        title="Delete Project"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 