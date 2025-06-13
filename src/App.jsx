import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './landing/LandingPage';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Dashboard from './pages/dashboard';
import UserDashboard from './users/UserDashboard';
import UploadProject from './users/UploadProject';
import Upload from './pages/upload';
import Projects from './pages/projects';
import Training from './pages/training';
import PointCloud from './pages/pointcloud';
import Gallery from './pages/gallery';
import Tools from './pages/tools';
import Progress from './pages/progress';
import Parameters from './pages/parameters';
import Poses from './pages/poses';
import Export from './pages/export';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/upload-project" element={<UploadProject />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/training" element={<Training />} />
        <Route path="/pointcloud" element={<PointCloud />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/parameters" element={<Parameters />} />
        <Route path="/poses" element={<Poses />} />
        <Route path="/export" element={<Export />} />
        <Route path="/dashboard2" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
