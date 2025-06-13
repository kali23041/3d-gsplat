import React, { useState } from "react";
import { Sidebar } from "../components/sidebar";

export default function Upload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'detail'

  // Mock data for client uploaded images
  const clientImages = [
    {
      id: 1,
      name: "Object_View_01.jpg",
      uploadedBy: "Device_A",
      timestamp: "2024-12-19 10:30:15",
      size: "2.4 MB",
      resolution: "1920x1080",
      angle: "Front View",
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Object_View_02.jpg", 
      uploadedBy: "Device_B",
      timestamp: "2024-12-19 10:31:22",
      size: "2.1 MB",
      resolution: "1920x1080", 
      angle: "Left Side",
      url: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Object_View_03.jpg",
      uploadedBy: "Device_C", 
      timestamp: "2024-12-19 10:32:45",
      size: "2.8 MB",
      resolution: "1920x1080",
      angle: "Right Side",
      url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      name: "Object_View_04.jpg",
      uploadedBy: "Device_A",
      timestamp: "2024-12-19 10:33:18", 
      size: "2.6 MB",
      resolution: "1920x1080",
      angle: "Back View",
      url: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop"
    },
    {
      id: 5,
      name: "Object_View_05.jpg",
      uploadedBy: "Device_D",
      timestamp: "2024-12-19 10:34:02",
      size: "2.3 MB", 
      resolution: "1920x1080",
      angle: "Top View",
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
    },
    {
      id: 6,
      name: "Object_View_06.jpg",
      uploadedBy: "Device_B",
      timestamp: "2024-12-19 10:34:55",
      size: "2.7 MB",
      resolution: "1920x1080", 
      angle: "Bottom View",
      url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop"
    }
  ];

  return (
    <div className="flex h-screen bg-zinc-50 text-zinc-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-gray-200 p-4 bg-white">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-6 text-gray-900">Client Images</h1>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {clientImages.length} images received
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                📱 Grid View
              </button>
              <button
                onClick={() => setViewMode('detail')}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  viewMode === 'detail' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                📋 Detail View
              </button>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Device Gallery</p>
              <p className="text-xs text-gray-500">Images from client devices</p>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          
          {/* Status Bar */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-4 text-white mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
                <span className="font-semibold">Live Feed Active</span>
                <span className="text-emerald-100">•</span>
                <span className="text-emerald-100">{clientImages.length} images received from devices</span>
              </div>
              <div className="text-emerald-100 text-sm">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {clientImages.map((image) => (
                  <div 
                    key={image.id} 
                    className="group cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square mb-3 group-hover:shadow-lg transition-shadow">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {image.name}
                      </p>
                      <p className="text-xs text-blue-600 font-medium">
                        📱 {image.uploadedBy}
                      </p>
                      <p className="text-xs text-gray-500">
                        {image.angle} • {image.size}
                      </p>
                      <p className="text-xs text-gray-400">
                        {image.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detail View */}
          {viewMode === 'detail' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Device
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        View Angle
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timestamp
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {clientImages.map((image) => (
                      <tr 
                        key={image.id} 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedImage(image)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden mr-3">
                              <img
                                src={image.url}
                                alt={image.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 truncate max-w-32">
                                {image.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {image.resolution}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                            <span className="text-sm font-medium text-blue-600">
                              {image.uploadedBy}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {image.angle}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>
                            <p>{image.size}</p>
                            <p className="text-xs">{image.resolution}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {image.timestamp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Image Modal */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl max-w-4xl max-h-full overflow-auto">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedImage.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Uploaded by {selectedImage.uploadedBy} • {selectedImage.timestamp}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
                <div className="p-4">
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.name}
                    className="w-full h-auto max-h-96 object-contain rounded-lg"
                  />
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-900">View Angle</p>
                      <p className="text-gray-600">{selectedImage.angle}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">File Size</p>
                      <p className="text-gray-600">{selectedImage.size}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Resolution</p>
                      <p className="text-gray-600">{selectedImage.resolution}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Source Device</p>
                      <p className="text-gray-600">{selectedImage.uploadedBy}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
} 