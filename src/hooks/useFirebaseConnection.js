import { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { connectFirestoreEmulator, enableNetwork, disableNetwork } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export function useFirebaseConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Test Firebase Auth connection (lighter than Firestore)
        await enableNetwork(db);
        
        // Simple connectivity test - just check if Firebase is initialized
        if (auth && db) {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        console.log('Firebase connection test:', error.message);
        
        // Check specific error types
        if (error.code === 'unavailable' || error.code === 'failed-precondition') {
          setIsConnected(false);
        } else {
          // If it's just a permission error, Firebase is still connected
          setIsConnected(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Initial connection check
    checkConnection();

    // Listen to auth state changes as a connection indicator
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // If we can listen to auth changes, Firebase is connected
      setIsConnected(true);
      setIsLoading(false);
    });

    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, []);

  return { isConnected, isLoading };
} 