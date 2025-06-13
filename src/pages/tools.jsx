import React, { useState, useRef } from "react";
import { Sidebar } from "../components/sidebar";

export default function Tools() {
  const [activeCategory, setActiveCategory] = useState('preprocessing');
  const [processingStatus, setProcessingStatus] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const tools = {
    preprocessing: [
      {
        id: 'colmap',
        name: 'COLMAP Structure-from-Motion',
        description: 'Extract camera poses and sparse point cloud from images',
        icon: '📷',
        status: 'ready',
        inputs: ['Images'],
        outputs: ['Camera poses', 'Sparse point cloud'],
        estimatedTime: '5-15 minutes'
      },
      {
        id: 'sfm',
        name: 'Feature Matching',
        description: 'Match features across multiple images for reconstruction',
        icon: '🔍',
        status: 'ready',
        inputs: ['Images'],
        outputs: ['Feature matches', 'Keypoints'],
        estimatedTime: '2-8 minutes'
      },
      {
        id: 'undistort',
        name: 'Image Undistortion',
        description: 'Remove lens distortion from input images',
        icon: '📐',
        status: 'ready',
        inputs: ['Images', 'Camera calibration'],
        outputs: ['Undistorted images'],
        estimatedTime: '1-3 minutes'
      },
      {
        id: 'resize',
        name: 'Image Resizing',
        description: 'Resize images to optimal resolution for training',
        icon: '🖼️',
        status: 'ready',
        inputs: ['Images'],
        outputs: ['Resized images'],
        estimatedTime: '30 seconds'
      }
    ],
    pointcloud: [
      {
        id: 'dense',
        name: 'Dense Reconstruction',
        description: 'Generate dense point cloud from sparse reconstruction',
        icon: '🔵',
        status: 'ready',
        inputs: ['Sparse point cloud', 'Images'],
        outputs: ['Dense point cloud'],
        estimatedTime: '10-30 minutes'
      },
      {
        id: 'filter',
        name: 'Point Cloud Filtering',
        description: 'Remove noise and outliers from point cloud',
        icon: '🧹',
        status: 'ready',
        inputs: ['Point cloud'],
        outputs: ['Filtered point cloud'],
        estimatedTime: '1-5 minutes'
      },
      {
        id: 'downsample',
        name: 'Point Cloud Downsampling',
        description: 'Reduce point cloud density for faster processing',
        icon: '📉',
        status: 'ready',
        inputs: ['Point cloud'],
        outputs: ['Downsampled point cloud'],
        estimatedTime: '30 seconds'
      },
      {
        id: 'normal',
        name: 'Normal Estimation',
        description: 'Compute surface normals for point cloud',
        icon: '📐',
        status: 'ready',
        inputs: ['Point cloud'],
        outputs: ['Point cloud with normals'],
        estimatedTime: '2-10 minutes'
      }
    ],
    conversion: [
      {
        id: 'ply2gaussian',
        name: 'PLY to Gaussian',
        description: 'Convert PLY point cloud to Gaussian splats',
        icon: '🔄',
        status: 'ready',
        inputs: ['PLY file'],
        outputs: ['Gaussian splats'],
        estimatedTime: '1-5 minutes'
      },
      {
        id: 'mesh2gaussian',
        name: 'Mesh to Gaussian',
        description: 'Convert 3D mesh to Gaussian representation',
        icon: '🔺',
        status: 'ready',
        inputs: ['3D mesh'],
        outputs: ['Gaussian splats'],
        estimatedTime: '2-8 minutes'
      },
      {
        id: 'gaussian2mesh',
        name: 'Gaussian to Mesh',
        description: 'Extract mesh from trained Gaussian model',
        icon: '🔻',
        status: 'ready',
        inputs: ['Gaussian model'],
        outputs: ['3D mesh'],
        estimatedTime: '3-12 minutes'
      },
      {
        id: 'format',
        name: 'Format Converter',
        description: 'Convert between different 3D file formats',
        icon: '📁',
        status: 'ready',
        inputs: ['Various formats'],
        outputs: ['Converted files'],
        estimatedTime: '30 seconds'
      }
    ],
    optimization: [
      {
        id: 'prune',
        name: 'Gaussian Pruning',
        description: 'Remove unnecessary Gaussians to optimize model',
        icon: '✂️',
        status: 'ready',
        inputs: ['Gaussian model'],
        outputs: ['Optimized model'],
        estimatedTime: '2-8 minutes'
      },
      {
        id: 'compress',
        name: 'Model Compression',
        description: 'Compress model size while maintaining quality',
        icon: '🗜️',
        status: 'ready',
        inputs: ['Gaussian model'],
        outputs: ['Compressed model'],
        estimatedTime: '5-15 minutes'
      },
      {
        id: 'quantize',
        name: 'Parameter Quantization',
        description: 'Reduce parameter precision for smaller models',
        icon: '📊',
        status: 'ready',
        inputs: ['Gaussian model'],
        outputs: ['Quantized model'],
        estimatedTime: '1-3 minutes'
      },
      {
        id: 'lod',
        name: 'Level of Detail',
        description: 'Generate multiple quality levels for adaptive rendering',
        icon: '🎚️',
        status: 'ready',
        inputs: ['Gaussian model'],
        outputs: ['Multi-LOD model'],
        estimatedTime: '3-10 minutes'
      }
    ],
    analysis: [
      {
        id: 'quality',
        name: 'Quality Assessment',
        description: 'Analyze model quality and rendering metrics',
        icon: '📈',
        status: 'ready',
        inputs: ['Gaussian model', 'Test images'],
        outputs: ['Quality report'],
        estimatedTime: '2-5 minutes'
      },
      {
        id: 'benchmark',
        name: 'Performance Benchmark',
        description: 'Test rendering performance across different devices',
        icon: '⚡',
        status: 'ready',
        inputs: ['Gaussian model'],
        outputs: ['Performance report'],
        estimatedTime: '1-3 minutes'
      },
      {
        id: 'compare',
        name: 'Model Comparison',
        description: 'Compare multiple models side by side',
        icon: '⚖️',
        status: 'ready',
        inputs: ['Multiple models'],
        outputs: ['Comparison report'],
        estimatedTime: '1-2 minutes'
      },
      {
        id: 'validate',
        name: 'Model Validation',
        description: 'Validate model integrity and consistency',
        icon: '✅',
        status: 'ready',
        inputs: ['Gaussian model'],
        outputs: ['Validation report'],
        estimatedTime: '30 seconds'
      }
    ]
  };

  const runTool = (toolId) => {
    setProcessingStatus(prev => ({ ...prev, [toolId]: 'running' }));
    
    // Simulate processing
    setTimeout(() => {
      setProcessingStatus(prev => ({ ...prev, [toolId]: 'completed' }));
    }, Math.random() * 3000 + 2000);
  };

  const ToolCard = ({ tool }) => {
    const status = processingStatus[tool.id] || 'ready';
    
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="text-3xl mr-3">{tool.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
              <p className="text-sm text-gray-600">{tool.description}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === 'running' ? 'bg-yellow-100 text-yellow-800' :
            status === 'completed' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-600'
          }`}>
            {status === 'running' ? '🔄 Running' :
             status === 'completed' ? '✅ Complete' :
             '⏸️ Ready'}
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div>
            <p className="text-xs font-medium text-gray-700 mb-1">Inputs:</p>
            <div className="flex flex-wrap gap-1">
              {tool.inputs.map((input, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                  {input}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-xs font-medium text-gray-700 mb-1">Outputs:</p>
            <div className="flex flex-wrap gap-1">
              {tool.outputs.map((output, index) => (
                <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                  {output}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>⏱️ Est. time: {tool.estimatedTime}</span>
          </div>
        </div>
        
        <button
          onClick={() => runTool(tool.id)}
          disabled={status === 'running'}
          className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
            status === 'running'
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {status === 'running' ? 'Processing...' : 'Run Tool'}
        </button>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-zinc-50 text-zinc-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-gray-200 p-4 bg-white">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-6 text-gray-900">Processing Tools</h1>
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              🛠️ {Object.values(tools).flat().length} Tools Available
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              📁 Upload Files
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
              🚀 Batch Process
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
            />
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">3D Processing Pipeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">📷</div>
                <h3 className="font-semibold mb-1">1. Preprocessing</h3>
                <p className="text-sm text-purple-100">Prepare images and extract features</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🔵</div>
                <h3 className="font-semibold mb-1">2. Point Cloud</h3>
                <p className="text-sm text-purple-100">Generate and process 3D points</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🔄</div>
                <h3 className="font-semibold mb-1">3. Conversion</h3>
                <p className="text-sm text-purple-100">Convert to Gaussian splats</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-semibold mb-1">4. Optimization</h3>
                <p className="text-sm text-purple-100">Optimize and analyze results</p>
              </div>
            </div>
          </div>

          {/* File Upload Area */}
          {selectedFiles.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Selected Files ({selectedFiles.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedFiles.slice(0, 6).map((file, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl mr-3">📄</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                ))}
                {selectedFiles.length > 6 && (
                  <div className="flex items-center justify-center p-3 bg-gray-100 rounded-lg">
                    <span className="text-sm text-gray-600">+{selectedFiles.length - 6} more files</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Category Navigation */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'preprocessing', label: '📷 Preprocessing', count: tools.preprocessing.length },
                  { id: 'pointcloud', label: '🔵 Point Cloud', count: tools.pointcloud.length },
                  { id: 'conversion', label: '🔄 Conversion', count: tools.conversion.length },
                  { id: 'optimization', label: '⚡ Optimization', count: tools.optimization.length },
                  { id: 'analysis', label: '📊 Analysis', count: tools.analysis.length }
                ].map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeCategory === category.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {category.label} ({category.count})
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools[activeCategory]?.map(tool => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          </div>

          {/* Processing Queue */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Processing Queue</h3>
            <div className="space-y-3">
              {Object.entries(processingStatus).filter(([_, status]) => status !== 'ready').length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">🎯</div>
                  <p>No active processes. Run a tool to see it here.</p>
                </div>
              ) : (
                Object.entries(processingStatus)
                  .filter(([_, status]) => status !== 'ready')
                  .map(([toolId, status]) => {
                    const tool = Object.values(tools).flat().find(t => t.id === toolId);
                    return (
                      <div key={toolId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">{tool?.icon}</div>
                          <div>
                            <p className="font-medium text-gray-900">{tool?.name}</p>
                            <p className="text-sm text-gray-600">{tool?.description}</p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          status === 'running' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {status === 'running' ? '🔄 Processing...' : '✅ Completed'}
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>

          {/* Tool Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tools</p>
                  <p className="text-3xl font-bold text-blue-600">{Object.values(tools).flat().length}</p>
                </div>
                <div className="text-4xl opacity-80">🛠️</div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Running</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {Object.values(processingStatus).filter(status => status === 'running').length}
                  </p>
                </div>
                <div className="text-4xl opacity-80">🔄</div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600">
                    {Object.values(processingStatus).filter(status => status === 'completed').length}
                  </p>
                </div>
                <div className="text-4xl opacity-80">✅</div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Files Uploaded</p>
                  <p className="text-3xl font-bold text-purple-600">{selectedFiles.length}</p>
                </div>
                <div className="text-4xl opacity-80">📁</div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { time: '2 minutes ago', action: 'COLMAP Structure-from-Motion completed', status: 'success' },
                { time: '5 minutes ago', action: 'Image Undistortion started', status: 'info' },
                { time: '8 minutes ago', action: 'Dense Reconstruction completed', status: 'success' },
                { time: '12 minutes ago', action: 'Point Cloud Filtering completed', status: 'success' },
                { time: '15 minutes ago', action: 'Feature Matching started', status: 'info' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      activity.status === 'success' ? 'bg-green-500' : 'bg-blue-500'
                    }`}></div>
                    <span className="text-gray-900">{activity.action}</span>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
} 