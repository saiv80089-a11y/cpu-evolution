import React, { useState, useEffect } from 'react';
import { CPU4Bit } from './cpuSimulator';
import SiliconCity from './SiliconCity';
import ThermalArena from './ThermalArena';
import NeuralOptimizer from './NeuralOptimizer';
import NextGenArena from './NextGenArena';
import MuseumLog from './MuseumLog';
import AchievementTracker from './AchievementTracker';
import { sfx } from './audioEffects';

export default function App() {
  const [currentDashboard, setCurrentDashboard] = useState(1);
  const [busActive, setBusActive] = useState(false);

  // Global Quest Stats
  const [gameStats, setGameStats] = useState({
    cpuSteps: 0,
    routedChips: 6, // Unlocks Silicon Architect badge easily for testing
    stableOverclock: true,
    frontierExplored: true
  });

  // Dashboard 1 State & Logic
  const [cpu, setCpu] = useState(new CPU4Bit());
  const [stateView, setStateView] = useState({ PC: 0, AC: 0, IR: 0, memory: Array(16).fill(0), running: false });

  useEffect(() => {
    const newCpu = new CPU4Bit();
    newCpu.loadProgram([0b1010, 0b0011, 0b1100], [5, 3]);
    newCpu.running = true;
    setCpu(newCpu);
    setStateView({ PC: newCpu.PC, AC: newCpu.AC, IR: newCpu.IR, memory: [...newCpu.memory], running: newCpu.running });
  }, []);

  const handleStep = () => {
    if (!cpu.running) return;
    sfx.playClockTick();
    setBusActive(true);
    setTimeout(() => setBusActive(false), 300);

    cpu.step();
    setGameStats(prev => ({ ...prev, cpuSteps: prev.cpuSteps + 1 }));
    setStateView({
      PC: cpu.PC,
      AC: cpu.AC,
      IR: cpu.IR,
      memory: [...cpu.memory],
      running: cpu.running
    });

    if (!cpu.running) {
      sfx.playErrorBuzz();
    }
  };

  return (
    <div style={{ fontFamily: 'monospace', background: '#121212', color: '#00ff66', minHeight: '100vh', padding: '20px' }}>
      {/* Global Achievement & Quest Bar */}
      <AchievementTracker stats={gameStats} />

      {/* Top Navigation Bar */}
      <nav style={{ display: 'flex', gap: '6px', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px', flexWrap: 'wrap' }}>
        <button onClick={() => setCurrentDashboard(1)} style={{ background: currentDashboard === 1 ? '#00ff66' : 'transparent', color: currentDashboard === 1 ? '#000' : '#00ff66', border: '1px solid #00ff66', padding: '8px 8px', cursor: 'pointer', fontWeight: 'bold' }}>Dash 1: 4-Bit</button>
        <button onClick={() => setCurrentDashboard(2)} style={{ background: currentDashboard === 2 ? '#ffb000' : 'transparent', color: currentDashboard === 2 ? '#000' : '#ffb000', border: '1px solid #ffb000', padding: '8px 8px', cursor: 'pointer', fontWeight: 'bold' }}>Dash 2: Silicon</button>
        <button onClick={() => setCurrentDashboard(3)} style={{ background: currentDashboard === 3 ? '#00ffcc' : 'transparent', color: currentDashboard === 3 ? '#000' : '#00ffcc', border: '1px solid #00ffcc', padding: '8px 8px', cursor: 'pointer', fontWeight: 'bold' }}>Dash 3: Thermal</button>
        <button onClick={() => setCurrentDashboard(4)} style={{ background: currentDashboard === 4 ? '#00f0ff' : 'transparent', color: currentDashboard === 4 ? '#000' : '#00f0ff', border: '1px solid #00f0ff', padding: '8px 8px', cursor: 'pointer', fontWeight: 'bold' }}>Dash 4: AI</button>
        <button onClick={() => setCurrentDashboard(5)} style={{ background: currentDashboard === 5 ? '#c084fc' : 'transparent', color: currentDashboard === 5 ? '#000' : '#c084fc', border: '1px solid #c084fc', padding: '8px 8px', cursor: 'pointer', fontWeight: 'bold' }}>Dash 5: Next-Gen</button>
        <button onClick={() => setCurrentDashboard(6)} style={{ background: currentDashboard === 6 ? '#38bdf8' : 'transparent', color: currentDashboard === 6 ? '#000' : '#38bdf8', border: '1px solid #38bdf8', padding: '8px 8px', cursor: 'pointer', fontWeight: 'bold' }}>Museum Log</button>
      </nav>

      {/* Conditional Rendering */}
      {currentDashboard === 1 && (
        <div>
          <h1>Dashboard 1: The 4-Bit CPU Sandbox</h1>
          <p>Execute clock cycles to unlock achievements across computer history!</p>
          
          <div style={{ margin: '15px 0', background: '#0a0a0a', padding: '10px', borderRadius: '6px', border: '1px solid #222' }}>
            <span style={{ fontSize: '11px', color: '#888' }}>SYSTEM BUS MONITOR ⚡</span>
            <svg height="30" width="100%">
              <line 
                x1="0" y1="15" x2="100%" y2="15" 
                stroke={busActive ? '#ffff00' : '#003311'} 
                strokeWidth={busActive ? '4' : '2'} 
                strokeDasharray={busActive ? '5,5' : 'none'}
                style={{ transition: 'all 0.1s ease' }}
              />
            </svg>
          </div>

          <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
            <div style={{ border: '1px solid #00ff66', padding: '15px', borderRadius: '8px', width: '250px' }}>
              <h3>Registers</h3>
              <p>Program Counter (PC): <strong>{stateView.PC.toString(2).padStart(4, '0')}</strong> ({stateView.PC})</p>
              <p>Accumulator (AC): <strong>{stateView.AC.toString(2).padStart(4, '0')}</strong> ({stateView.AC})</p>
              <p>Instruction (IR): <strong>{stateView.IR.toString(2).padStart(4, '0')}</strong></p>
              <button 
                onClick={handleStep} 
                disabled={!stateView.running}
                style={{ background: '#00ff66', color: '#000', border: 'none', padding: '10px 15px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
              >
                {stateView.running ? "Pulse Clock Cycle ⚡" : "CPU Halted 🛑"}
              </button>
            </div>

            <div style={{ border: '1px solid #00ff66', padding: '15px', borderRadius: '8px', flex: 1 }}>
              <h3>RAM Memory (16 Bytes)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {stateView.memory.map((val, idx) => (
                  <div key={idx} style={{ border: '1px dashed #00ff66', padding: '10px', textAlign: 'center', background: idx === stateView.PC ? '#003311' : 'transparent' }}>
                    <span style={{ fontSize: '10px', color: '#888' }}>[{idx}]</span><br/>
                    <strong>{val}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {currentDashboard === 2 && <SiliconCity />}
      {currentDashboard === 3 && <ThermalArena />}
      {currentDashboard === 4 && <NeuralOptimizer />}
      {currentDashboard === 5 && <NextGenArena />}
      {currentDashboard === 6 && <MuseumLog />}
    </div>
  );
}