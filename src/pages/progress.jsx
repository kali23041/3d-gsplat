import React, { useState, useEffect } from "react";
import { Sidebar } from "../components/sidebar";

export default function Progress() {
  const [selectedModel, setSelectedModel] = useState('current');
  const [timeRange, setTimeRange] = useState('24h');

  // Mock training data
  const trainingHistory = [
    { epoch: 0, loss: 2.45, accuracy: 62.3, psnr: 18.2, ssim: 0.65, time: '00:00:00' },
    { epoch: 10, loss: 1.89, accuracy: 71.8, psnr: 22.1, ssim: 0.72, time: '00:12:30' },
    { epoch: 20, loss: 1.34, accuracy: 78.5, psnr: 25.8, ssim: 0.78, time: '00:25:15' },
    { epoch: 30, loss: 0.98, accuracy: 84.2, psnr: 28.4, ssim: 0.83, time: '00:37:45' },
    { epoch: 40, loss: 0.76, accuracy: 88.1, psnr: 30.9, ssim: 0.87, time: '00:50:20' },
    { epoch: 50, loss: 0.61, accuracy: 91.3, psnr: 32.7, ssim: 0.89, time: '01:02:55' },
    { epoch: 60, loss: 0.52, accuracy: 93.8, psnr: 34.2, ssim: 0.91, time: '01:15:30' },
    { epoch: 70, loss: 0.45, accuracy: 95.4, psnr: 35.6, ssim: 0.93, time: '01:28:10' },
    { epoch: 80, loss: 0.41, accuracy: 96.7, psnr: 36.8, ssim: 0.94, time: '01:40:45' },
    { epoch: 90, loss: 0.38, accuracy: 97.5, psnr: 37.9, ssim: 0.95, time: '01:53:20' },
    { epoch: 100, loss: 0.36, accuracy: 98.1, psnr: 38.7, ssim: 0.96, time: '02:05:55' }
  ];

  const modelComparison = [
    { name: 'Current Model', accuracy: 98.1, loss: 0.36, psnr: 38.7, size: '245MB', status: 'active' },
    { name: 'Previous Best', accuracy: 96.8, loss: 0.42, psnr: 36.2, size: '238MB', status: 'archived' },
    { name: 'Baseline Model', accuracy: 89.3, loss: 0.78, psnr: 28.9, size: '198MB', status: 'archived' }
  ];

  const volumeAnalysis = {
    totalImages: 156,
    processedImages: 156,
    totalPoints: 2847392,
    activeGaussians: 1923847,
    memoryUsage: 18.7,
    diskUsage: 2.4,
    estimatedCompletion: '2h 15m',
    qualityScore: 94.8
  };

  const LineChart = ({ data, dataKey, color, label, unit = "" }) => {
    const maxValue = Math.max(...data.map(d => d[dataKey]));
    const minValue = Math.min(...data.map(d => d[dataKey]));
    const range = maxValue - minValue || 1;
    
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-800">{label}</h4>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: color }}></div>
            <span className="text-sm font-medium text-gray-600">
              {data[data.length - 1]?.[dataKey]?.toFixed(2)}{unit}
            </span>
          </div>
        </div>
        <div className="relative h-48">
          <svg className="w-full h-full">
            <defs>
              <linearGradient id={`gradient-${dataKey}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.05 }} />
              </linearGradient>
            </defs>
            
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map(y => (
              <line
                key={y}
                x1="0%"
                y1={`${y}%`}
                x2="100%"
                y2={`${y}%`}
                stroke="#f3f4f6"
                strokeWidth="1"
              />
            ))}
            
            {/* Area fill */}
            <polygon
              fill={`url(#gradient-${dataKey})`}
              points={`0,100 ${data.map((point, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = 100 - ((point[dataKey] - minValue) / range) * 100;
                return `${x},${y}`;
              }).join(' ')} 100,100`}
            />
            
            {/* Line */}
            <polyline
              fill="none"
              stroke={color}
              strokeWidth="3"
              points={data.map((point, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = 100 - ((point[dataKey] - minValue) / range) * 100;
                return `${x},${y}`;
              }).join(' ')}
              className="drop-shadow-sm"
            />
            
            {/* Data points */}
            {data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = 100 - ((point[dataKey] - minValue) / range) * 100;
              return (
                <circle
                  key={index}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="4"
                  fill="white"
                  stroke={color}
                  strokeWidth="2"
                  className="drop-shadow-sm hover:r-6 transition-all cursor-pointer"
                />
              );
            })}
          </svg>
          
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-8">
            <span>{maxValue.toFixed(1)}</span>
            <span>{((maxValue + minValue) / 2).toFixed(1)}</span>
            <span>{minValue.toFixed(1)}</span>
          </div>
        </div>
        
        {/* X-axis */}
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Epoch 0</span>
          <span>Epoch {data[data.length - 1]?.epoch || 100}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-zinc-50 text-zinc-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-gray-200 p-4 bg-white">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-6 text-gray-900">Training Progress</h1>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              ✅ Training Complete
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="all">All Time</option>
            </select>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Final Accuracy</p>
              <p className="text-lg font-bold text-green-600">98.1%</p>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Final Accuracy</p>
                  <p className="text-3xl font-bold">{trainingHistory[trainingHistory.length - 1]?.accuracy}%</p>
                </div>
                <div className="text-4xl opacity-80">🎯</div>
              </div>
              <div className="mt-4 flex items-center">
                <div className="text-green-300 text-sm">↗ +35.8% from start</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Training Loss</p>
                  <p className="text-3xl font-bold">{trainingHistory[trainingHistory.length - 1]?.loss}</p>
                </div>
                <div className="text-4xl opacity-80">📉</div>
              </div>
              <div className="mt-4 flex items-center">
                <div className="text-green-300 text-sm">↓ -85.3% reduction</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">PSNR Score</p>
                  <p className="text-3xl font-bold">{trainingHistory[trainingHistory.length - 1]?.psnr}</p>
                </div>
                <div className="text-4xl opacity-80">📊</div>
              </div>
              <div className="mt-4 flex items-center">
                <div className="text-purple-300 text-sm">↗ +20.5 dB improvement</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Training Time</p>
                  <p className="text-3xl font-bold">{trainingHistory[trainingHistory.length - 1]?.time}</p>
                </div>
                <div className="text-4xl opacity-80">⏱️</div>
              </div>
              <div className="mt-4 flex items-center">
                <div className="text-orange-300 text-sm">100 epochs completed</div>
              </div>
            </div>
          </div>

          {/* Training Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LineChart 
              data={trainingHistory} 
              dataKey="loss" 
              color="#ef4444" 
              label="Training Loss Over Time" 
            />
            <LineChart 
              data={trainingHistory} 
              dataKey="accuracy" 
              color="#10b981" 
              label="Model Accuracy" 
              unit="%" 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LineChart 
              data={trainingHistory} 
              dataKey="psnr" 
              color="#8b5cf6" 
              label="PSNR (Peak Signal-to-Noise Ratio)" 
              unit=" dB" 
            />
            <LineChart 
              data={trainingHistory} 
              dataKey="ssim" 
              color="#f59e0b" 
              label="SSIM (Structural Similarity)" 
            />
          </div>

          {/* Volume Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Volume Analysis & Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-700">Total Images</span>
                  <span className="text-blue-600">📸</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">{volumeAnalysis.totalImages}</p>
                <p className="text-xs text-blue-600 mt-1">All processed successfully</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-700">3D Points</span>
                  <span className="text-green-600">🔵</span>
                </div>
                <p className="text-2xl font-bold text-green-900">{volumeAnalysis.totalPoints.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">{volumeAnalysis.activeGaussians.toLocaleString()} active Gaussians</p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-purple-700">Memory Usage</span>
                  <span className="text-purple-600">💾</span>
                </div>
                <p className="text-2xl font-bold text-purple-900">{volumeAnalysis.memoryUsage}GB</p>
                <p className="text-xs text-purple-600 mt-1">Peak during training</p>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-orange-700">Quality Score</span>
                  <span className="text-orange-600">⭐</span>
                </div>
                <p className="text-2xl font-bold text-orange-900">{volumeAnalysis.qualityScore}%</p>
                <p className="text-xs text-orange-600 mt-1">Excellent quality</p>
              </div>
            </div>
          </div>

          {/* Model Comparison */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Model Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Model</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Accuracy</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Loss</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">PSNR</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Size</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {modelComparison.map((model, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            model.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                          }`}></div>
                          <span className="font-medium text-gray-900">{model.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <span className="font-semibold text-green-600">{model.accuracy}%</span>
                          <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${model.accuracy}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{model.loss}</td>
                      <td className="py-4 px-4 text-gray-700">{model.psnr} dB</td>
                      <td className="py-4 px-4 text-gray-700">{model.size}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          model.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {model.status === 'active' ? '🟢 Active' : '📁 Archived'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Training Requirements Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Resource Requirements</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-red-600 mr-3">🔥</span>
                    <span className="font-medium text-red-800">GPU Memory</span>
                  </div>
                  <span className="text-red-700 font-semibold">18.7GB / 24GB</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-blue-600 mr-3">💾</span>
                    <span className="font-medium text-blue-800">Disk Space</span>
                  </div>
                  <span className="text-blue-700 font-semibold">{volumeAnalysis.diskUsage}GB</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-green-600 mr-3">⚡</span>
                    <span className="font-medium text-green-800">Training Speed</span>
                  </div>
                  <span className="text-green-700 font-semibold">1.2 epochs/min</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-purple-600 mr-3">🎯</span>
                    <span className="font-medium text-purple-800">Convergence</span>
                  </div>
                  <span className="text-purple-700 font-semibold">Epoch 85</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Training Insights</h4>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h5 className="font-semibold text-green-800 mb-1">✅ Excellent Convergence</h5>
                  <p className="text-sm text-green-700">Model achieved target accuracy 15 epochs early</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h5 className="font-semibold text-blue-800 mb-1">📊 Optimal PSNR</h5>
                  <p className="text-sm text-blue-700">Peak signal-to-noise ratio exceeds industry standards</p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h5 className="font-semibold text-purple-800 mb-1">🚀 High Efficiency</h5>
                  <p className="text-sm text-purple-700">Training completed 25% faster than estimated</p>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h5 className="font-semibold text-orange-800 mb-1">💡 Recommendation</h5>
                  <p className="text-sm text-orange-700">Model ready for production deployment</p>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
} 