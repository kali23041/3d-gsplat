import React, { useState, useEffect } from "react";
import { Sidebar } from "../components/sidebar";

export default function Parameters() {
  const [activeTab, setActiveTab] = useState('training');
  const [parameters, setParameters] = useState({
    // Training Parameters
    learningRate: 0.0025,
    batchSize: 32,
    epochs: 100,
    optimizer: 'adam',
    lossFunction: 'mse',
    regularization: 0.001,
    
    // Gaussian Parameters
    numGaussians: 100000,
    positionLr: 0.00016,
    featureLr: 0.0025,
    opacityLr: 0.05,
    scalingLr: 0.005,
    rotationLr: 0.001,
    
    // Rendering Parameters
    imageWidth: 1920,
    imageHeight: 1080,
    fovX: 1.2,
    fovY: 0.9,
    nearPlane: 0.01,
    farPlane: 100.0,
    
    // Optimization Parameters
    densificationInterval: 100,
    opacityResetInterval: 3000,
    densifyGradThresh: 0.0002,
    densifyUntilIter: 15000,
    pruneOpacityThresh: 0.005,
    
    // Quality Parameters
    shSphericalHarmonics: 3,
    maxScreenSize: 20,
    minOpacity: 0.005,
    percentDense: 0.01,
    lambdaDssim: 0.2,
    
    // System Parameters
    cudaDevice: 0,
    randomSeed: 42,
    debugMode: false,
    saveCheckpoints: true,
    checkpointInterval: 1000
  });

  const [presets, setPresets] = useState([
    {
      name: 'High Quality',
      description: 'Best quality for final renders',
      params: { numGaussians: 200000, learningRate: 0.001, shSphericalHarmonics: 4 }
    },
    {
      name: 'Fast Training',
      description: 'Quick training for testing',
      params: { numGaussians: 50000, learningRate: 0.005, batchSize: 64 }
    },
    {
      name: 'Balanced',
      description: 'Good balance of speed and quality',
      params: { numGaussians: 100000, learningRate: 0.0025, batchSize: 32 }
    },
    {
      name: 'Memory Efficient',
      description: 'Optimized for limited VRAM',
      params: { numGaussians: 75000, batchSize: 16, imageWidth: 1280 }
    }
  ]);

  const [parameterHistory, setParameterHistory] = useState([
    { timestamp: '2024-12-19 14:30', preset: 'High Quality', accuracy: 98.1, loss: 0.36 },
    { timestamp: '2024-12-19 12:15', preset: 'Balanced', accuracy: 96.8, loss: 0.42 },
    { timestamp: '2024-12-19 10:45', preset: 'Fast Training', accuracy: 94.2, loss: 0.58 }
  ]);

  const updateParameter = (key, value) => {
    setParameters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyPreset = (preset) => {
    setParameters(prev => ({
      ...prev,
      ...preset.params
    }));
  };

  const resetToDefaults = () => {
    setParameters({
      learningRate: 0.0025,
      batchSize: 32,
      epochs: 100,
      optimizer: 'adam',
      lossFunction: 'mse',
      regularization: 0.001,
      numGaussians: 100000,
      positionLr: 0.00016,
      featureLr: 0.0025,
      opacityLr: 0.05,
      scalingLr: 0.005,
      rotationLr: 0.001,
      imageWidth: 1920,
      imageHeight: 1080,
      fovX: 1.2,
      fovY: 0.9,
      nearPlane: 0.01,
      farPlane: 100.0,
      densificationInterval: 100,
      opacityResetInterval: 3000,
      densifyGradThresh: 0.0002,
      densifyUntilIter: 15000,
      pruneOpacityThresh: 0.005,
      shSphericalHarmonics: 3,
      maxScreenSize: 20,
      minOpacity: 0.005,
      percentDense: 0.01,
      lambdaDssim: 0.2,
      cudaDevice: 0,
      randomSeed: 42,
      debugMode: false,
      saveCheckpoints: true,
      checkpointInterval: 1000
    });
  };

  const ParameterSlider = ({ label, value, min, max, step, unit = "", onChange, description }) => (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm font-mono text-blue-600">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
      />
      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );

  const ParameterInput = ({ label, value, type = "number", options = [], onChange, description }) => (
    <div className="bg-gray-50 rounded-lg p-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {type === 'select' ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : type === 'checkbox' ? (
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm text-gray-600">Enable {label}</span>
        </label>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(type === 'number' ? parseFloat(e.target.value) : e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-zinc-50 text-zinc-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-gray-200 p-4 bg-white">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-6 text-gray-900">Model Parameters</h1>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              ⚙️ Configuration Panel
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={resetToDefaults}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              🔄 Reset Defaults
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              💾 Save Configuration
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
              🚀 Apply & Train
            </button>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Presets Section */}
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Parameter Presets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {presets.map((preset, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-all cursor-pointer"
                     onClick={() => applyPreset(preset)}>
                  <h3 className="font-semibold text-lg mb-2">{preset.name}</h3>
                  <p className="text-blue-100 text-sm mb-3">{preset.description}</p>
                  <button className="w-full bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Apply Preset
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'training', label: '🎯 Training', icon: '🎯' },
                  { id: 'gaussian', label: '🔵 Gaussian', icon: '🔵' },
                  { id: 'rendering', label: '🖼️ Rendering', icon: '🖼️' },
                  { id: 'optimization', label: '⚡ Optimization', icon: '⚡' },
                  { id: 'quality', label: '⭐ Quality', icon: '⭐' },
                  { id: 'system', label: '🖥️ System', icon: '🖥️' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Training Parameters */}
              {activeTab === 'training' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Training Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ParameterSlider
                      label="Learning Rate"
                      value={parameters.learningRate}
                      min={0.0001}
                      max={0.01}
                      step={0.0001}
                      onChange={(value) => updateParameter('learningRate', value)}
                      description="Controls how fast the model learns"
                    />
                    <ParameterSlider
                      label="Batch Size"
                      value={parameters.batchSize}
                      min={1}
                      max={128}
                      step={1}
                      onChange={(value) => updateParameter('batchSize', value)}
                      description="Number of samples processed together"
                    />
                    <ParameterSlider
                      label="Epochs"
                      value={parameters.epochs}
                      min={10}
                      max={500}
                      step={10}
                      onChange={(value) => updateParameter('epochs', value)}
                      description="Number of complete training cycles"
                    />
                    <ParameterSlider
                      label="Regularization"
                      value={parameters.regularization}
                      min={0.0001}
                      max={0.01}
                      step={0.0001}
                      onChange={(value) => updateParameter('regularization', value)}
                      description="Prevents overfitting"
                    />
                    <ParameterInput
                      label="Optimizer"
                      value={parameters.optimizer}
                      type="select"
                      options={[
                        { value: 'adam', label: 'Adam' },
                        { value: 'sgd', label: 'SGD' },
                        { value: 'rmsprop', label: 'RMSprop' },
                        { value: 'adamw', label: 'AdamW' }
                      ]}
                      onChange={(value) => updateParameter('optimizer', value)}
                      description="Optimization algorithm"
                    />
                    <ParameterInput
                      label="Loss Function"
                      value={parameters.lossFunction}
                      type="select"
                      options={[
                        { value: 'mse', label: 'Mean Squared Error' },
                        { value: 'l1', label: 'L1 Loss' },
                        { value: 'huber', label: 'Huber Loss' },
                        { value: 'ssim', label: 'SSIM Loss' }
                      ]}
                      onChange={(value) => updateParameter('lossFunction', value)}
                      description="How to measure training error"
                    />
                  </div>
                </div>
              )}

              {/* Gaussian Parameters */}
              {activeTab === 'gaussian' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Gaussian Splatting Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ParameterSlider
                      label="Number of Gaussians"
                      value={parameters.numGaussians}
                      min={10000}
                      max={500000}
                      step={10000}
                      onChange={(value) => updateParameter('numGaussians', value)}
                      description="Total number of 3D Gaussians"
                    />
                    <ParameterSlider
                      label="Position Learning Rate"
                      value={parameters.positionLr}
                      min={0.00001}
                      max={0.001}
                      step={0.00001}
                      onChange={(value) => updateParameter('positionLr', value)}
                      description="Learning rate for Gaussian positions"
                    />
                    <ParameterSlider
                      label="Feature Learning Rate"
                      value={parameters.featureLr}
                      min={0.0001}
                      max={0.01}
                      step={0.0001}
                      onChange={(value) => updateParameter('featureLr', value)}
                      description="Learning rate for color features"
                    />
                    <ParameterSlider
                      label="Opacity Learning Rate"
                      value={parameters.opacityLr}
                      min={0.001}
                      max={0.1}
                      step={0.001}
                      onChange={(value) => updateParameter('opacityLr', value)}
                      description="Learning rate for transparency"
                    />
                    <ParameterSlider
                      label="Scaling Learning Rate"
                      value={parameters.scalingLr}
                      min={0.0001}
                      max={0.01}
                      step={0.0001}
                      onChange={(value) => updateParameter('scalingLr', value)}
                      description="Learning rate for Gaussian size"
                    />
                    <ParameterSlider
                      label="Rotation Learning Rate"
                      value={parameters.rotationLr}
                      min={0.0001}
                      max={0.01}
                      step={0.0001}
                      onChange={(value) => updateParameter('rotationLr', value)}
                      description="Learning rate for orientation"
                    />
                  </div>
                </div>
              )}

              {/* Rendering Parameters */}
              {activeTab === 'rendering' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Rendering Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ParameterSlider
                      label="Image Width"
                      value={parameters.imageWidth}
                      min={640}
                      max={4096}
                      step={64}
                      unit="px"
                      onChange={(value) => updateParameter('imageWidth', value)}
                      description="Output image width"
                    />
                    <ParameterSlider
                      label="Image Height"
                      value={parameters.imageHeight}
                      min={480}
                      max={2160}
                      step={48}
                      unit="px"
                      onChange={(value) => updateParameter('imageHeight', value)}
                      description="Output image height"
                    />
                    <ParameterSlider
                      label="Field of View X"
                      value={parameters.fovX}
                      min={0.1}
                      max={3.14}
                      step={0.01}
                      unit="rad"
                      onChange={(value) => updateParameter('fovX', value)}
                      description="Horizontal field of view"
                    />
                    <ParameterSlider
                      label="Field of View Y"
                      value={parameters.fovY}
                      min={0.1}
                      max={3.14}
                      step={0.01}
                      unit="rad"
                      onChange={(value) => updateParameter('fovY', value)}
                      description="Vertical field of view"
                    />
                    <ParameterSlider
                      label="Near Plane"
                      value={parameters.nearPlane}
                      min={0.001}
                      max={1.0}
                      step={0.001}
                      onChange={(value) => updateParameter('nearPlane', value)}
                      description="Closest rendering distance"
                    />
                    <ParameterSlider
                      label="Far Plane"
                      value={parameters.farPlane}
                      min={10}
                      max={1000}
                      step={10}
                      onChange={(value) => updateParameter('farPlane', value)}
                      description="Farthest rendering distance"
                    />
                  </div>
                </div>
              )}

              {/* Optimization Parameters */}
              {activeTab === 'optimization' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Optimization Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ParameterSlider
                      label="Densification Interval"
                      value={parameters.densificationInterval}
                      min={50}
                      max={500}
                      step={50}
                      onChange={(value) => updateParameter('densificationInterval', value)}
                      description="How often to add new Gaussians"
                    />
                    <ParameterSlider
                      label="Opacity Reset Interval"
                      value={parameters.opacityResetInterval}
                      min={1000}
                      max={10000}
                      step={500}
                      onChange={(value) => updateParameter('opacityResetInterval', value)}
                      description="When to reset transparency values"
                    />
                    <ParameterSlider
                      label="Densify Gradient Threshold"
                      value={parameters.densifyGradThresh}
                      min={0.0001}
                      max={0.001}
                      step={0.0001}
                      onChange={(value) => updateParameter('densifyGradThresh', value)}
                      description="Minimum gradient for densification"
                    />
                    <ParameterSlider
                      label="Densify Until Iteration"
                      value={parameters.densifyUntilIter}
                      min={5000}
                      max={30000}
                      step={1000}
                      onChange={(value) => updateParameter('densifyUntilIter', value)}
                      description="Stop densification after this iteration"
                    />
                    <ParameterSlider
                      label="Prune Opacity Threshold"
                      value={parameters.pruneOpacityThresh}
                      min={0.001}
                      max={0.05}
                      step={0.001}
                      onChange={(value) => updateParameter('pruneOpacityThresh', value)}
                      description="Remove Gaussians below this opacity"
                    />
                  </div>
                </div>
              )}

              {/* Quality Parameters */}
              {activeTab === 'quality' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ParameterSlider
                      label="Spherical Harmonics Degree"
                      value={parameters.shSphericalHarmonics}
                      min={0}
                      max={4}
                      step={1}
                      onChange={(value) => updateParameter('shSphericalHarmonics', value)}
                      description="Color representation complexity"
                    />
                    <ParameterSlider
                      label="Max Screen Size"
                      value={parameters.maxScreenSize}
                      min={5}
                      max={50}
                      step={1}
                      unit="px"
                      onChange={(value) => updateParameter('maxScreenSize', value)}
                      description="Maximum Gaussian size on screen"
                    />
                    <ParameterSlider
                      label="Minimum Opacity"
                      value={parameters.minOpacity}
                      min={0.001}
                      max={0.1}
                      step={0.001}
                      onChange={(value) => updateParameter('minOpacity', value)}
                      description="Minimum visible transparency"
                    />
                    <ParameterSlider
                      label="Percent Dense"
                      value={parameters.percentDense}
                      min={0.001}
                      max={0.1}
                      step={0.001}
                      onChange={(value) => updateParameter('percentDense', value)}
                      description="Densification percentage"
                    />
                    <ParameterSlider
                      label="Lambda D-SSIM"
                      value={parameters.lambdaDssim}
                      min={0.0}
                      max={1.0}
                      step={0.01}
                      onChange={(value) => updateParameter('lambdaDssim', value)}
                      description="SSIM loss weight"
                    />
                  </div>
                </div>
              )}

              {/* System Parameters */}
              {activeTab === 'system' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">System Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ParameterSlider
                      label="CUDA Device"
                      value={parameters.cudaDevice}
                      min={0}
                      max={7}
                      step={1}
                      onChange={(value) => updateParameter('cudaDevice', value)}
                      description="GPU device to use"
                    />
                    <ParameterSlider
                      label="Random Seed"
                      value={parameters.randomSeed}
                      min={0}
                      max={9999}
                      step={1}
                      onChange={(value) => updateParameter('randomSeed', value)}
                      description="Reproducibility seed"
                    />
                    <ParameterSlider
                      label="Checkpoint Interval"
                      value={parameters.checkpointInterval}
                      min={100}
                      max={5000}
                      step={100}
                      onChange={(value) => updateParameter('checkpointInterval', value)}
                      description="Save model every N iterations"
                    />
                    <ParameterInput
                      label="Debug Mode"
                      value={parameters.debugMode}
                      type="checkbox"
                      onChange={(value) => updateParameter('debugMode', value)}
                      description="Enable detailed logging"
                    />
                    <ParameterInput
                      label="Save Checkpoints"
                      value={parameters.saveCheckpoints}
                      type="checkbox"
                      onChange={(value) => updateParameter('saveCheckpoints', value)}
                      description="Automatically save model states"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Parameter History */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Parameter History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Timestamp</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Preset Used</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Final Accuracy</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Final Loss</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {parameterHistory.map((entry, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-700">{entry.timestamp}</td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {entry.preset}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-green-600">{entry.accuracy}%</span>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{entry.loss}</td>
                      <td className="py-4 px-4">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">
                          📋 Load Config
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Current Configuration Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Current Configuration Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-3">🎯 Training</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Learning Rate:</span>
                    <span className="font-mono text-blue-900">{parameters.learningRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Batch Size:</span>
                    <span className="font-mono text-blue-900">{parameters.batchSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Epochs:</span>
                    <span className="font-mono text-blue-900">{parameters.epochs}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-3">🔵 Gaussians</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">Count:</span>
                    <span className="font-mono text-green-900">{parameters.numGaussians.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Position LR:</span>
                    <span className="font-mono text-green-900">{parameters.positionLr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Opacity LR:</span>
                    <span className="font-mono text-green-900">{parameters.opacityLr}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-3">🖼️ Rendering</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-700">Resolution:</span>
                    <span className="font-mono text-purple-900">{parameters.imageWidth}x{parameters.imageHeight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">FOV X:</span>
                    <span className="font-mono text-purple-900">{parameters.fovX.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">SH Degree:</span>
                    <span className="font-mono text-purple-900">{parameters.shSphericalHarmonics}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
} 