import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { Device } from '@/lib/supabase';
import { useAuth } from './auth';

type DevicesContextType = {
  devices: Device[];
  loading: boolean;
  error: string | null;
  registerDevice: (name: string, serialNumber: string) => Promise<void>;
  updateDevice: (id: string, updates: Partial<Device>) => Promise<void>;
  refreshDevices: () => Promise<void>;
};

const DevicesContext = createContext<DevicesContextType | undefined>(undefined);

export function DevicesProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('devices')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setDevices(data || []);
    } catch (err) {
      setError('Failed to fetch devices');
      console.error('Error fetching devices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchDevices();
    } else {
      setDevices([]);
    }
  }, [session]);

  const registerDevice = async (name: string, serialNumber: string) => {
    try {
      setError(null);
      const { error: insertError } = await supabase.from('devices').insert({
        name,
        serial_number: serialNumber,
        user_id: session?.user.id!,
      });

      if (insertError) throw insertError;
      await fetchDevices();
    } catch (err) {
      setError('Failed to register device');
      throw err;
    }
  };

  const updateDevice = async (id: string, updates: Partial<Device>) => {
    try {
      setError(null);
      const { error: updateError } = await supabase
        .from('devices')
        .update(updates)
        .eq('id', id);

      if (updateError) throw updateError;
      await fetchDevices();
    } catch (err) {
      setError('Failed to update device');
      throw err;
    }
  };

  return (
    <DevicesContext.Provider
      value={{
        devices,
        loading,
        error,
        registerDevice,
        updateDevice,
        refreshDevices: fetchDevices,
      }}>
      {children}
    </DevicesContext.Provider>
  );
}

export const useDevices = () => {
  const context = useContext(DevicesContext);
  if (context === undefined) {
    throw new Error('useDevices must be used within a DevicesProvider');
  }
  return context;
};