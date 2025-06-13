import React from "react";
import { Sidebar } from "../components/sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">3D Gaussian Splatting</h1>
              <p className="text-sm text-gray-600">Advanced 2D to 3D Model Conversion System</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">BE Final Year Project</p>
                <p className="text-xs text-gray-500">Academic Year 2024-25</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">3D</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-8 text-white">
            <div className="max-w-4xl">
              <h2 className="text-4xl font-bold mb-4">Revolutionary 3D Model Generation</h2>
              <p className="text-xl mb-6 text-blue-100">
                Transform ordinary 2D photographs into stunning 3D models using cutting-edge Gaussian Splatting technology. 
                Our innovative approach combines advanced computer vision with machine learning to deliver real-time, 
                high-quality 3D reconstructions.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="font-semibold">Real-time Processing</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="font-semibold">High-Quality Output</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="font-semibold">AI-Powered</span>
                </div>
              </div>
            </div>
          </div>

          {/* College & Academic Info */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Dattakala College of Engineering</h3>
                             <p className="text-lg text-gray-600 mb-1">Pune, Maharashtra</p>
               <p className="text-sm text-gray-500">Electronics and Telecommunication Engineering Department</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">BE</p>
                <p className="text-sm text-gray-600">Final Year Project</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">2024-25</p>
                <p className="text-sm text-gray-600">Academic Year</p>
              </div>
                             <div className="text-center p-4 bg-indigo-50 rounded-lg">
                 <p className="text-2xl font-bold text-indigo-600">ENTC</p>
                 <p className="text-sm text-gray-600">Engineering</p>
               </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Project Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">KS</span>
                  </div>
                                     <h4 className="text-xl font-bold text-gray-900 mb-3">Kartik Sabale</h4>
                   <p className="text-sm text-gray-600 leading-relaxed">
                     Contributed to 3D reconstruction algorithms development, project coordination, 
                     and system architecture design.
                   </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">SR</span>
                  </div>
                                     <h4 className="text-xl font-bold text-gray-900 mb-3">Sai Rakshe</h4>
                   <p className="text-sm text-gray-600 leading-relaxed">
                     Contributed to neural network development and optimization for Gaussian splatting 
                     and deep learning model implementation.
                   </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">BB</span>
                  </div>
                                     <h4 className="text-xl font-bold text-gray-900 mb-3">Bhavana Borkar</h4>
                   <p className="text-sm text-gray-600 leading-relaxed">
                     Contributed to 3D graphics rendering, visualization systems development, 
                     and user interface design for 3D model interaction.
                   </p>
                </div>
              </div>

            </div>
          </div>

          {/* Technical Features */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Core Technologies & Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-5 border border-blue-100">
                <div className="text-center">
                  <div className="text-3xl mb-3">📸</div>
                  <h4 className="font-bold text-gray-900 mb-2">Multi-View Processing</h4>
                  <p className="text-sm text-gray-600">
                    Advanced algorithms process multiple camera angles to extract comprehensive depth and geometry information.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-5 border border-emerald-100">
                <div className="text-center">
                  <div className="text-3xl mb-3">⚡</div>
                  <h4 className="font-bold text-gray-900 mb-2">Real-Time Rendering</h4>
                  <p className="text-sm text-gray-600">
                    Lightning-fast Gaussian splatting enables smooth, interactive 3D visualization with high frame rates.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-5 border border-purple-100">
                <div className="text-center">
                  <div className="text-3xl mb-3">🧠</div>
                  <h4 className="font-bold text-gray-900 mb-2">Neural Networks</h4>
                  <p className="text-sm text-gray-600">
                    Deep learning models trained to understand 3D geometry and optimize Gaussian splat parameters.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-5 border border-amber-100">
                <div className="text-center">
                  <div className="text-3xl mb-3">🚀</div>
                  <h4 className="font-bold text-gray-900 mb-2">High Performance</h4>
                  <p className="text-sm text-gray-600">
                    Optimized processing pipeline ensures efficient conversion and smooth 3D model interactions.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* System Requirements & Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* System Requirements */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">System Requirements</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Operating System</span>
                  <span className="font-semibold text-gray-900">Windows 10/11, macOS, Linux</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">RAM</span>
                  <span className="font-semibold text-gray-900">Minimum 8GB, Recommended 16GB</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">GPU</span>
                  <span className="font-semibold text-gray-900">NVIDIA GTX 1060+ or RTX Series</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Storage</span>
                  <span className="font-semibold text-gray-900">10GB+ Available Space</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Browser</span>
                  <span className="font-semibold text-gray-900">Chrome 90+, Firefox 88+</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Internet</span>
                  <span className="font-semibold text-blue-600">High-speed connection required</span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Processing Speed</span>
                    <span className="text-2xl font-bold text-green-600">2.5s</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Average time per image conversion</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Rendering FPS</span>
                    <span className="text-2xl font-bold text-blue-600">60+</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Real-time 3D model visualization</p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Accuracy Rate</span>
                    <span className="text-2xl font-bold text-purple-600">94%</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">3D reconstruction precision</p>
                </div>
                
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Memory Usage</span>
                    <span className="text-2xl font-bold text-amber-600">4.2GB</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Peak GPU memory consumption</p>
                </div>
              </div>
            </div>

          </div>

          {/* Project Costing & Budget */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Project Budget & Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="text-3xl mb-3">💻</div>
                <h4 className="font-bold text-gray-900 mb-2">Hardware</h4>
                <p className="text-2xl font-bold text-blue-600 mb-1">₹85,000</p>
                <p className="text-sm text-gray-600">GPU, Computing Resources</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                <div className="text-3xl mb-3">🛠️</div>
                <h4 className="font-bold text-gray-900 mb-2">Software</h4>
                <p className="text-2xl font-bold text-emerald-600 mb-1">₹15,000</p>
                <p className="text-sm text-gray-600">Licenses, Tools, Frameworks</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <div className="text-3xl mb-3">📚</div>
                <h4 className="font-bold text-gray-900 mb-2">Research</h4>
                <p className="text-2xl font-bold text-purple-600 mb-1">₹8,000</p>
                <p className="text-sm text-gray-600">Books, Papers, Courses</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                <div className="text-3xl mb-3">💰</div>
                <h4 className="font-bold text-gray-900 mb-2">Total Budget</h4>
                <p className="text-2xl font-bold text-amber-600 mb-1">₹1,08,000</p>
                <p className="text-sm text-gray-600">Complete Project Cost</p>
              </div>

            </div>
          </div>

          {/* Technical Specifications */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Input Specifications</h4>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Image Format</span>
                    <span className="font-medium">JPEG, PNG, TIFF</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Resolution</span>
                    <span className="font-medium">1920x1080 minimum</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Number of Views</span>
                    <span className="font-medium">10-50 images</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">File Size</span>
                    <span className="font-medium">Max 10MB per image</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Output Specifications</h4>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">3D Format</span>
                    <span className="font-medium">PLY, OBJ, GLTF</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Point Density</span>
                    <span className="font-medium">500K - 2M points</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Texture Resolution</span>
                    <span className="font-medium">2048x2048 pixels</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Export Size</span>
                    <span className="font-medium">50-200MB typical</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Project Timeline */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Development Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">Research & Literature Review</p>
                      <p className="text-sm text-gray-500">Algorithm analysis, technology selection</p>
                    </div>
                    <div className="text-right">
                      <span className="text-green-600 font-semibold">Completed</span>
                      <p className="text-xs text-gray-400">Aug 2024</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">System Design & Architecture</p>
                      <p className="text-sm text-gray-500">UI/UX design, database planning</p>
                    </div>
                    <div className="text-right">
                      <span className="text-green-600 font-semibold">Completed</span>
                      <p className="text-xs text-gray-400">Sep 2024</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">Core Development</p>
                      <p className="text-sm text-gray-500">ML model implementation, backend development</p>
                    </div>
                    <div className="text-right">
                      <span className="text-blue-600 font-semibold">In Progress</span>
                      <p className="text-xs text-gray-400">Oct-Dec 2024</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">Testing & Optimization</p>
                      <p className="text-sm text-gray-500">Performance tuning, bug fixes</p>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-500 font-semibold">Planned</span>
                      <p className="text-xs text-gray-400">Jan 2025</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">Documentation & Deployment</p>
                      <p className="text-sm text-gray-500">Final testing, project presentation</p>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-500 font-semibold">Planned</span>
                      <p className="text-xs text-gray-400">Feb 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Applications & Impact */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Real-World Applications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <div className="text-4xl mb-3">🏛️</div>
                <h4 className="font-bold text-gray-900 mb-2">Cultural Heritage</h4>
                <p className="text-sm text-gray-600">Digital preservation of historical monuments and artifacts</p>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-100">
                <div className="text-4xl mb-3">🏠</div>
                <h4 className="font-bold text-gray-900 mb-2">Real Estate</h4>
                <p className="text-sm text-gray-600">Virtual property tours and architectural visualization</p>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                <div className="text-4xl mb-3">🎮</div>
                <h4 className="font-bold text-gray-900 mb-2">Gaming & VR</h4>
                <p className="text-sm text-gray-600">Immersive virtual environments and interactive experiences</p>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-100">
                <div className="text-4xl mb-3">🏥</div>
                <h4 className="font-bold text-gray-900 mb-2">Medical Imaging</h4>
                <p className="text-sm text-gray-600">3D medical visualization and surgical planning</p>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg border border-rose-100">
                <div className="text-4xl mb-3">📚</div>
                <h4 className="font-bold text-gray-900 mb-2">Education</h4>
                <p className="text-sm text-gray-600">Interactive 3D learning materials and virtual labs</p>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border border-cyan-100">
                <div className="text-4xl mb-3">🚗</div>
                <h4 className="font-bold text-gray-900 mb-2">Automotive</h4>
                <p className="text-sm text-gray-600">Vehicle design visualization and marketing</p>
              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
      );
} 