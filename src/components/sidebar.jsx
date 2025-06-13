import { Link, useLocation } from "react-router-dom";
import { 
  LineChart, 
  LayoutGrid, 
  Lock, 
  FileText, 
  Layers, 
  Component, 
  FileCode, 
  Settings, 
  BarChart, 
  Table, 
  MapPin,
  FileStack,
  Wifi,
  WifiOff,
  Loader2
} from "lucide-react";
import { cn } from "../lib/utils";
import { useFirebaseConnection } from "../hooks/useFirebaseConnection";

const sidebarItems = [
  { name: "3D Viewer", icon: Layers, path: "/", exact: true },
  { name: "Image Upload", icon: LayoutGrid, path: "/upload", count: 3 },
  { name: "Project Management", icon: Lock, path: "/projects" },
  { name: "Model Training", icon: FileText, path: "/training" },
  { name: "Point Cloud", icon: Component, path: "/pointcloud" },
  { name: "Image Gallery", icon: FileCode, path: "/gallery" },
  { name: "Processing Tools", icon: Settings, path: "/tools" },
  { name: "Training Progress", icon: BarChart, path: "/progress" },
  { name: "Model Parameters", icon: Table, path: "/parameters" },
  { name: "Camera Poses", icon: MapPin, path: "/poses" },
  { name: "Export & Download", icon: FileStack, path: "/export" },
];

export function Sidebar() {
  const location = useLocation();
  const { isConnected, isLoading } = useFirebaseConnection();
  
  return (
    <div className="flex flex-col h-screen bg-zinc-900 text-white w-64">
      <div className="flex items-center p-4 border-b border-zinc-800">
        <div className="bg-pink-500 h-8 w-8 rounded-full flex items-center justify-center mr-3">
          <span className="font-bold">B</span>
        </div>
        <span className="text-xl font-semibold">Broken</span>
      </div>
      
      <div className="border-b border-zinc-800 p-4 flex flex-col items-center">
        <div className="relative">
          <img 
            src="https://randomuser.me/api/portraits/men/32.jpg" 
            alt="Profile" 
            className="rounded-full w-16 h-16 mb-2" 
          />
        </div>
        <h2 className="text-lg font-bold uppercase">ZIHAD BROKEN</h2>
        <p className="text-xs text-zinc-400">UIUX Designer</p>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <nav className="p-2">
          {sidebarItems.map((item) => {
            const isActive = item.exact 
              ? location.pathname === item.path
              : location.pathname === item.path;
            
            return (
              <SidebarItem 
                key={item.name} 
                icon={item.icon} 
                name={item.name} 
                path={item.path} 
                active={isActive}
                count={item.count}
              />
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 text-xs text-zinc-500 border-t border-zinc-800">
        {/* Firebase Connection Status */}
        <div className="flex items-center justify-center mb-3 p-2 rounded-lg bg-zinc-800/50">
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 size={14} className="animate-spin text-yellow-400" />
              <span className="text-yellow-400">Connecting...</span>
            </div>
          ) : isConnected ? (
            <div className="flex items-center space-x-2">
              <Wifi size={14} className="text-green-400" />
              <span className="text-green-400">Firebase Connected</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <WifiOff size={14} className="text-red-400" />
              <span className="text-red-400">Firebase Disconnected</span>
            </div>
          )}
        </div>
        <p className="text-center">
          Please, organize your menus through button below!
        </p>
      </div>
    </div>
  );
}

function SidebarItem({ icon: Icon, name, path, active, count }) {
  return (
    <Link
      to={path}
      className={cn(
        "flex items-center p-2 my-1 rounded-md hover:bg-zinc-800 transition-colors",
        active && "bg-gradient-to-r from-pink-600 to-pink-400 text-white"
      )}
    >
      <div className="mr-3">
        <Icon size={18} />
      </div>
      <span className="flex-1">{name}</span>
      {count && (
        <div className="bg-zinc-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {count}
        </div>
      )}
    </Link>
  );
} 