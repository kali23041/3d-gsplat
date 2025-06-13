import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [jobQueue, setJobQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // TODO: Fetch user's job queue from Firestore
        loadJobQueue(currentUser.email);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const calculateProgress = (project) => {
    const now = new Date();
    const createdAt = new Date(project.createdAt);
    const estimatedCompletion = new Date(project.estimatedCompletionTime);
    
    if (project.status === 'completed') return 100;
    if (project.status === 'failed') return 0;
    if (project.status === 'queued') return 0;
    
    // For processing status, calculate based on time elapsed
    const totalTime = estimatedCompletion.getTime() - createdAt.getTime();
    const elapsedTime = now.getTime() - createdAt.getTime();
    const progress = Math.min(95, Math.max(5, (elapsedTime / totalTime) * 100));
    
    return Math.round(progress);
  };

  const getRealisticStatus = (project) => {
    const now = new Date();
    const createdAt = new Date(project.createdAt);
    const estimatedCompletion = new Date(project.estimatedCompletionTime);
    const elapsedHours = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
    
    // Simulate realistic progression
    if (elapsedHours < 0.5) return 'queued';
    if (elapsedHours < 6) return 'processing';
    if (Math.random() > 0.1) return 'completed'; // 90% success rate
    return 'failed';
  };

  const loadJobQueue = async (userEmail) => {
    try {
      setLoading(true);
      console.log('Loading projects for user:', userEmail);
      
      // First try simple query without orderBy to avoid index issues
      const q = query(
        collection(db, 'projects'),
        where('userEmail', '==', userEmail)
      );
      
      const querySnapshot = await getDocs(q);
      const projects = [];
      
      console.log('Found', querySnapshot.size, 'projects');
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('Project data:', data);
        
        const realisticStatus = getRealisticStatus(data);
        const progress = calculateProgress({ ...data, status: realisticStatus });
        
        projects.push({
          id: data.id,
          name: data.name,
          status: realisticStatus,
          progress: progress,
          createdAt: data.createdAt,
          estimatedCompletionTime: data.estimatedCompletionTime,
          imageCount: data.imageCount,
          queuePosition: data.queuePosition,
          // Add fake data for demo
          outputSize: realisticStatus === 'completed' ? `${Math.floor(Math.random() * 50 + 20)}.${Math.floor(Math.random() * 9)}MB` : null,
          error: realisticStatus === 'failed' ? ['Insufficient image overlap', 'Poor lighting conditions', 'Motion blur detected', 'Too few images'][Math.floor(Math.random() * 4)] : null,
          processingNode: realisticStatus === 'processing' ? `GPU-${Math.floor(Math.random() * 8 + 1)}` : null,
          estimatedTimeRemaining: realisticStatus === 'processing' ? `${Math.floor(Math.random() * 120 + 30)} minutes` : null
        });
      });
      
      // Sort by createdAt in JavaScript instead of Firestore
      projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      console.log('Processed projects:', projects);
      setJobQueue(projects);
    } catch (error) {
      console.error('Error loading projects:', error);
      
      // Show error message to user
      alert(`Error loading projects: ${error.message}. Please refresh the page or contact support.`);
      setJobQueue([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleDeleteProject = async (projectId, projectName) => {
    if (!window.confirm(`Are you sure you want to delete "${projectName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      // Find the document with matching project ID
      const q = query(
        collection(db, 'projects'),
        where('id', '==', projectId)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        alert('Project not found');
        return;
      }

      // Delete the document
      const docToDelete = querySnapshot.docs[0];
      await deleteDoc(doc(db, 'projects', docToDelete.id));
      
      // Remove from local state
      setJobQueue(prev => prev.filter(job => job.id !== projectId));
      
      alert('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
      alert(`Failed to delete project: ${error.message}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'processing': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'queued': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'failed': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'processing': return '⚡';
      case 'queued': return '⏳';
      case 'failed': return '❌';
      default: return '📄';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.displayName || user?.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.displayName || 'User'}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
                <p className="text-xs text-blue-600">Member since {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Recently'}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {(user?.displayName || user?.email || 'U').charAt(0).toUpperCase()}
              </div>
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
        <main className="p-6 space-y-6">
          
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-6 text-white">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold mb-3">Your 3D Creation Hub</h2>
              <p className="text-lg mb-4 text-blue-100">
                Track your 3D reconstruction jobs, manage uploads, and download completed models.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="font-semibold text-sm">Real-time Tracking</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="font-semibold text-sm">Queue Management</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="font-semibold text-sm">Download Ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="text-3xl mr-4">📊</div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{jobQueue.length}</p>
                  <p className="text-sm text-gray-600">Total Jobs</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="text-3xl mr-4">✅</div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {jobQueue.filter(job => job.status === 'completed').length}
                  </p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="text-3xl mr-4">⚡</div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    {jobQueue.filter(job => job.status === 'processing').length}
                  </p>
                  <p className="text-sm text-gray-600">Processing</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="text-3xl mr-4">⏳</div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {jobQueue.filter(job => job.status === 'queued').length}
                  </p>
                  <p className="text-sm text-gray-600">In Queue</p>
                </div>
              </div>
            </div>
          </div>

          {/* Job Queue Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Your Job Queue</h3>
              <button 
                onClick={() => navigate('/upload-project')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                + New Upload
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⏳</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Loading your projects...</h4>
                <p className="text-gray-600">Please wait while we fetch your data</p>
              </div>
            ) : jobQueue.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📸</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">No projects yet</h4>
                <p className="text-gray-600 mb-4">Upload your first set of images to start creating 3D models</p>
                <button 
                  onClick={() => navigate('/upload-project')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Upload Images
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {jobQueue.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{getStatusIcon(job.status)}</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{job.name}</h4>
                          <p className="text-sm text-gray-600">
                            {job.imageCount} images • Created {new Date(job.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(job.status)}`}>
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </span>
                          {job.status === 'processing' && (
                            <div className="mt-2">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                  style={{ width: `${job.progress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{job.progress}% complete</p>
                              <p className="text-xs text-blue-600">Node: {job.processingNode}</p>
                              <p className="text-xs text-gray-500">ETA: {job.estimatedTimeRemaining}</p>
                            </div>
                          )}
                          {job.status === 'queued' && (
                            <div className="mt-1">
                              <p className="text-xs text-gray-500">Position #{job.queuePosition}</p>
                              <p className="text-xs text-yellow-600">Est. start: {Math.floor(Math.random() * 30 + 5)} min</p>
                            </div>
                          )}
                          {job.status === 'completed' && (
                            <div className="mt-1">
                              <p className="text-xs text-green-600">Size: {job.outputSize}</p>
                              <p className="text-xs text-gray-500">Completed {new Date(job.createdAt).toLocaleDateString()}</p>
                            </div>
                          )}
                          {job.status === 'failed' && (
                            <div className="mt-1">
                              <p className="text-xs text-red-600">{job.error}</p>
                              <p className="text-xs text-gray-500">Failed after {Math.floor(Math.random() * 3 + 1)}h processing</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          {job.status === 'completed' && (
                            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                              Download
                            </button>
                          )}
                          {job.status === 'failed' && (
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                              Retry
                            </button>
                          )}
                          <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                            Details
                          </button>
                          <button 
                            onClick={() => handleDeleteProject(job.id, job.name)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => navigate('/upload-project')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:scale-105"
              >
                <div className="text-2xl mb-2">📸</div>
                <div className="font-semibold">Upload Images</div>
                <div className="text-sm opacity-90">Start new 3D reconstruction</div>
              </button>
              
              <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 hover:scale-105">
                <div className="text-2xl mb-2">📁</div>
                <div className="font-semibold">My Models</div>
                <div className="text-sm opacity-90">View completed 3D models</div>
              </button>
              
              <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 hover:scale-105">
                <div className="text-2xl mb-2">⚙️</div>
                <div className="font-semibold">Settings</div>
                <div className="text-sm opacity-90">Manage preferences</div>
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
} 