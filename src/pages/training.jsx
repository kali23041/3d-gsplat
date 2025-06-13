import React, { useState, useEffect, useRef } from "react";
import { Sidebar } from "../components/sidebar";

export default function Training() {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingTime, setTrainingTime] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [totalEpochs] = useState(100);
  const [lossData, setLossData] = useState([]);
  const [accuracyData, setAccuracyData] = useState([]);
  const [terminalLogs, setTerminalLogs] = useState([
    "🚀 3D Gaussian Splatting Training System v2.1",
    "📊 System initialized successfully",
    "⚡ GPU: NVIDIA RTX 4090 detected",
    "💾 Memory: 24GB VRAM available",
    "🔧 Ready to start training..."
  ]);
  const terminalRef = useRef(null);

  // Training simulation
  useEffect(() => {
    let interval;
    if (isTraining) {
      interval = setInterval(() => {
        setTrainingTime(prev => prev + 1);
        
        // Update epoch every 10 seconds
        if (trainingTime % 10 === 0 && currentEpoch < totalEpochs) {
          setCurrentEpoch(prev => prev + 1);
          
          // Generate realistic loss and accuracy data
          const newLoss = Math.max(0.1, 2.5 - (currentEpoch * 0.02) + (Math.random() - 0.5) * 0.1);
          const newAccuracy = Math.min(99, 60 + (currentEpoch * 0.3) + (Math.random() - 0.5) * 2);
          
          setLossData(prev => [...prev.slice(-19), { epoch: currentEpoch, value: newLoss }]);
          setAccuracyData(prev => [...prev.slice(-19), { epoch: currentEpoch, value: newAccuracy }]);
          
          // Add terminal logs
          const logs = [
            `📈 Epoch ${currentEpoch}/${totalEpochs} - Loss: ${newLoss.toFixed(4)} - Accuracy: ${newAccuracy.toFixed(2)}%`,
            `⚡ Processing point cloud data...`,
            `🔄 Optimizing Gaussian parameters...`,
            `💫 Rendering quality: ${(newAccuracy * 0.8).toFixed(1)}%`
          ];
          
          setTerminalLogs(prev => [...prev, ...logs].slice(-50));
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isTraining, trainingTime, currentEpoch, totalEpochs]);

  // Auto scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  const startTraining = () => {
    setIsTraining(true);
    setTrainingTime(0);
    setCurrentEpoch(0);
    setLossData([]);
    setAccuracyData([]);
    setTerminalLogs(prev => [...prev, 
      "🎯 Starting training process...",
      "📸 Loading image dataset...",
      "🔍 Initializing 3D Gaussian parameters...",
      "⚙️ Setting up optimization pipeline..."
    ]);
  };

  const stopTraining = () => {
    setIsTraining(false);
    setTerminalLogs(prev => [...prev, 
      "⏹️ Training stopped by user",
      "💾 Saving current model state...",
      "✅ Model checkpoint saved successfully"
    ]);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const SimpleChart = ({ data, color, label, unit = "" }) => {
    const maxValue = Math.max(...data.map(d => d.value), 1);
    const minValue = Math.min(...data.map(d => d.value), 0);
    const range = maxValue - minValue || 1;
    
    return (
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">{label}</h4>
        <div className="relative h-32">
          <svg className="w-full h-full">
            {data.length > 1 && (
              <polyline
                fill="none"
                stroke={color}
                strokeWidth="2"
                points={data.map((point, index) => {
                  const x = (index / (data.length - 1)) * 100;
                  const y = 100 - ((point.value - minValue) / range) * 100;
                  return `${x},${y}`;
                }).join(' ')}
                className="animate-pulse"
              />
            )}
            {data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = 100 - ((point.value - minValue) / range) * 100;
              return (
                <circle
                  key={index}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="3"
                  fill={color}
                  className="animate-pulse"
                />
              );
            })}
          </svg>
          {data.length > 0 && (
            <div className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded text-xs">
              {data[data.length - 1]?.value.toFixed(2)}{unit}
            </div>
          )}
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
            <h1 className="text-2xl font-bold mr-6 text-gray-900">Model Training</h1>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              isTraining 
                ? 'bg-green-100 text-green-800 animate-pulse' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {isTraining ? '🔥 Training Active' : '⏸️ Ready'}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Training Timer</p>
              <p className="text-lg font-mono text-blue-600">{formatTime(trainingTime)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Progress</p>
              <p className="text-lg font-mono text-purple-600">{currentEpoch}/{totalEpochs}</p>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Control Panel */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">3D Gaussian Splatting Training</h2>
                <p className="text-blue-100">
                  Train neural radiance fields from multi-view images
                </p>
              </div>
              <div className="flex space-x-3">
                {!isTraining ? (
                  <button
                    onClick={startTraining}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg"
                  >
                    🚀 Start Training
                  </button>
                ) : (
                  <button
                    onClick={stopTraining}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg"
                  >
                    ⏹️ Stop Training
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Terminal */}
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
              <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-300 text-sm ml-4">Training Terminal</span>
              </div>
              <div 
                ref={terminalRef}
                className="p-4 h-80 overflow-y-auto font-mono text-sm text-green-400 bg-gray-900"
              >
                {terminalLogs.map((log, index) => (
                  <div key={index} className="mb-1">
                    <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span> {log}
                  </div>
                ))}
                {isTraining && (
                  <div className="flex items-center mt-2">
                    <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span>
                    <span className="ml-2 animate-pulse">▊</span>
                  </div>
                )}
              </div>
            </div>

            {/* Training Stats */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Training Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-600 font-medium">Current Epoch</p>
                    <p className="text-2xl font-bold text-blue-900">{currentEpoch}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm text-purple-600 font-medium">Total Epochs</p>
                    <p className="text-2xl font-bold text-purple-900">{totalEpochs}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-green-600 font-medium">Training Time</p>
                    <p className="text-xl font-mono text-green-900">{formatTime(trainingTime)}</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="text-sm text-orange-600 font-medium">Progress</p>
                    <p className="text-2xl font-bold text-orange-900">
                      {totalEpochs > 0 ? Math.round((currentEpoch / totalEpochs) * 100) : 0}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-md font-semibold text-gray-900 mb-3">Training Progress</h4>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${totalEpochs > 0 ? (currentEpoch / totalEpochs) * 100 : 0}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  {currentEpoch} of {totalEpochs} epochs completed
                </p>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SimpleChart 
              data={lossData} 
              color="#ef4444" 
              label="Training Loss" 
            />
            <SimpleChart 
              data={accuracyData} 
              color="#10b981" 
              label="Model Accuracy" 
              unit="%" 
            />
          </div>

          {/* System Resources */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">System Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-red-700">GPU Usage</span>
                  <span className="text-xs text-red-600">🔥</span>
                </div>
                <div className="w-full bg-red-200 rounded-full h-2 mb-1">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: isTraining ? '85%' : '15%' }}></div>
                </div>
                <span className="text-xs text-red-600">{isTraining ? '85%' : '15%'}</span>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-700">VRAM</span>
                  <span className="text-xs text-blue-600">💾</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2 mb-1">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: isTraining ? '72%' : '8%' }}></div>
                </div>
                <span className="text-xs text-blue-600">{isTraining ? '17.3GB' : '1.9GB'}</span>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-700">CPU</span>
                  <span className="text-xs text-green-600">⚡</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2 mb-1">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: isTraining ? '45%' : '12%' }}></div>
                </div>
                <span className="text-xs text-green-600">{isTraining ? '45%' : '12%'}</span>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-purple-700">Temperature</span>
                  <span className="text-xs text-purple-600">🌡️</span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-2 mb-1">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: isTraining ? '68%' : '35%' }}></div>
                </div>
                <span className="text-xs text-purple-600">{isTraining ? '78°C' : '42°C'}</span>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
} 