import React, { createContext, useState, useContext } from 'react';

const SimulationContext = createContext();

export const SimulationProvider = ({ children }) => {
  // Phases: IDLE -> RISING -> ALERT -> ACTION_TAKEN -> RESOLVED
  const [phase, setPhase] = useState('IDLE');
  
  const advancePhase = () => {
    setPhase(prev => {
      switch(prev) {
        case 'IDLE': return 'RISING';
        case 'RISING': return 'ALERT';
        case 'ALERT': return 'ACTION_TAKEN';
        case 'ACTION_TAKEN': return 'RESOLVED';
        default: return prev;
      }
    });
  };

  const completeAction = () => {
    if (phase === 'ALERT') {
      setPhase('ACTION_TAKEN');
      setTimeout(() => {
        setPhase('RESOLVED');
      }, 2000); // Automatically resolve after action is taken in demo
    }
  };

  const resetSimulation = () => {
    setPhase('IDLE');
  };

  return (
    <SimulationContext.Provider value={{ phase, advancePhase, completeAction, resetSimulation }}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => useContext(SimulationContext);
