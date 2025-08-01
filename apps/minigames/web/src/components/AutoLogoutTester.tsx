'use client';

import { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { tokenStorage } from '../utils/tokenStorage';

export default function AutoLogoutTester() {
  const [testState, setTestState] = useState<{
    isRunning: boolean;
    stage: string;
    countdown: number;
    logs: string[];
    autoRefreshDisabled: boolean;
  }>({
    isRunning: false,
    stage: 'idle',
    countdown: 0,
    logs: [],
    autoRefreshDisabled: false
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const testStartTime = useRef<number>(0);
  const currentStageRef = useRef<string>('idle');

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const elapsed = testStartTime.current ? Math.floor((Date.now() - testStartTime.current) / 1000) : 0;
    setTestState(prev => ({
      ...prev,
      logs: [`[${timestamp}] (+${elapsed}s) ${message}`, ...prev.logs.slice(0, 19)]
    }));
  };

  const checkTokenStatus = () => {
    const accessToken = tokenStorage.getAccessToken();
    const refreshToken = tokenStorage.getRefreshToken();

    if (!accessToken && !refreshToken) {
      return 'logged-out';
    }

    if (!accessToken) {
      return 'access-expired';
    }

    try {
      const accessDecoded = jwtDecode<{ exp: number }>(accessToken);
      const refreshDecoded = refreshToken ? jwtDecode<{ exp: number }>(refreshToken) : null;

      const now = Math.floor(Date.now() / 1000);
      const accessTimeLeft = accessDecoded.exp - now;
      const refreshTimeLeft = refreshDecoded ? refreshDecoded.exp - now : 0;

      if (refreshTimeLeft <= 0) {
        return 'refresh-expired';
      }

      if (accessTimeLeft <= 0) {
        return 'access-expired';
      }

      return 'both-valid';
    } catch {
      return 'invalid-tokens';
    }
  };

  const startAutoLogoutTest = () => {
    testStartTime.current = Date.now();
    currentStageRef.current = 'starting';
    setTestState(prev => ({
      ...prev,
      isRunning: true,
      stage: 'starting',
      logs: [],
      autoRefreshDisabled: true
    }));

    addLog('🚀 Iniciando prueba de logout automático');
    addLog('⚠️ Auto-refresh DESHABILITADO para esta prueba');
    addLog('📋 Configuración: Access=30s, Refresh=2min');

    // Deshabilitar auto-refresh temporalmente
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Monitor cada segundo
    intervalRef.current = setInterval(() => {
      const status = checkTokenStatus();
      const elapsed = Math.floor((Date.now() - testStartTime.current) / 1000);

      setTestState(prev => ({ ...prev, countdown: elapsed }));

      switch (status) {
        case 'both-valid':
          if (elapsed === 30) {
            addLog('⏰ Access token debería expirar ahora...');
          }
          break;

        case 'access-expired':
          if (currentStageRef.current !== 'access-expired') {
            currentStageRef.current = 'access-expired';
            setTestState(prev => ({ ...prev, stage: 'access-expired' }));
            addLog('🟡 Access token EXPIRADO - Refresh token aún válido');
            addLog('⏳ Esperando expiración del refresh token...');
          }
          break;

        case 'refresh-expired':
        case 'logged-out':
          if (currentStageRef.current !== 'logged-out') {
            currentStageRef.current = 'logged-out';
            setTestState(prev => ({
              ...prev,
              stage: 'logged-out',
              isRunning: false
            }));
            addLog('🔴 LOGOUT AUTOMÁTICO EXITOSO');
            addLog('✅ Ambos tokens expiraron - Usuario deslogueado');

            // Cleanup
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          }
          break;
      }
    }, 1000);
  };

  const stopTest = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTestState(prev => ({
      ...prev,
      isRunning: false,
      stage: 'idle',
      autoRefreshDisabled: false
    }));
    addLog('🛑 Prueba detenida manualmente');
  };

  const getStageColor = () => {
    switch (testState.stage) {
      case 'starting': return 'bg-blue-100 text-blue-800';
      case 'access-expired': return 'bg-yellow-100 text-yellow-800';
      case 'logged-out': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageDescription = () => {
    switch (testState.stage) {
      case 'starting': return 'Monitoreando tokens...';
      case 'access-expired': return 'Access token expirado, esperando refresh...';
      case 'logged-out': return 'LOGOUT AUTOMÁTICO COMPLETADO';
      default: return 'Presiona "Iniciar Prueba" para comenzar';
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">🔬 Prueba de Logout Automático</h3>

      {/* Estado actual */}
      <div className={`p-4 rounded-lg mb-4 ${getStageColor()}`}>
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-semibold">Estado: {testState.stage}</h4>
            <p className="text-sm">{getStageDescription()}</p>
          </div>
          {testState.isRunning && (
            <div className="text-right">
              <div className="text-2xl font-mono">{testState.countdown}s</div>
              <div className="text-xs">Tiempo transcurrido</div>
            </div>
          )}
        </div>
      </div>

      {/* Cronología esperada */}
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h5 className="font-semibold mb-2">📅 Cronología esperada:</h5>
        <ul className="text-sm space-y-1">
          <li className="flex">
            <span className="w-12 text-gray-500">0s:</span>
            <span>Prueba iniciada - Ambos tokens válidos</span>
          </li>
          <li className="flex">
            <span className="w-12 text-gray-500">30s:</span>
            <span>🟡 Access token expira</span>
          </li>
          <li className="flex">
            <span className="w-12 text-gray-500">120s:</span>
            <span>🔴 Refresh token expira → LOGOUT AUTOMÁTICO</span>
          </li>
        </ul>
      </div>

      {/* Controles */}
      <div className="mb-4">
        {!testState.isRunning ? (
          <button
            onClick={startAutoLogoutTest}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            🚀 Iniciar Prueba Automática
          </button>
        ) : (
          <button
            onClick={stopTest}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            🛑 Detener Prueba
          </button>
        )}
      </div>

      {/* Logs en tiempo real */}
      <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm h-48 overflow-y-auto">
        <h5 className="text-white mb-2">📝 Log de la Prueba:</h5>
        {testState.logs.length === 0 ? (
          <p className="text-gray-500">Esperando inicio de prueba...</p>
        ) : (
          testState.logs.map((log, index) => (
            <div key={index} className="mb-1">
              {log}
            </div>
          ))
        )}
      </div>

      {/* Advertencia */}
      <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400">
        <p className="text-sm">
          <strong>⚠️ Importante:</strong> Esta prueba deshabilita temporalmente el auto-refresh
          para simular inactividad real. Los tokens expirarán sin renovarse automáticamente.
        </p>
      </div>
    </div>
  );
}
