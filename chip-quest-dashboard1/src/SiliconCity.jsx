import React, { useState } from 'react';
import { sfx } from './audioEffects';

export default function SiliconCity() {
  const [grid, setGrid] = useState(Array(36).fill(null));
  const [selectedTool, setSelectedTool] = useState('TRANSISTOR');
  const [budget, setBudget] = useState(12);
  const [score, setScore] = useState(0);
  const [activeBusRoute, setActiveBusRoute] = useState(false);

  const handleTileClick = (index) => {
    const newGrid = [...grid];
    const currentVal = newGrid[index];

    if (currentVal) {
      // Remove component and refund budget
      newGrid[index] = null;
      setBudget(prev => prev + 1);
      sfx.playErrorBuzz();
    } else {
      if (budget <= 0) {
        sfx.playErrorBuzz();
        return;
      }
      // Place component
      newGrid[index] = selectedTool;
      setBudget(prev => prev - 1);
      sfx.playBuildSuccess();
      setActiveBusRoute(true);
      setTimeout(() => setActiveBusRoute(false), 250);
      setScore(prev => prev + 150);
    }
    setGrid(newGrid);
  };

  const checkDesign = () => {
    const filledCount = grid.filter(Boolean).length;
    if (filledCount >= 6) {
      sfx.playBuildSuccess();
      setScore(prev => prev + 500);
      alert("Success! Your 8-bit CPU layout passes verification! 🎉 Score bonus awarded!");
    } else {
      sfx.playErrorBuzz();
      alert("Incomplete layout! Place at least 6 components to route the CPU.");
    }
  };

  return (
    <div style={{ fontFamily: 'monospace', padding: '20px', background: '#08080c', color: '#ffb000', minHeight: '100vh' }}>
      <h1>Dashboard 2: Silicon City (1970s-1980s Die Layout)</h1>
      <p>Choose your tool, manage your transistor budget, and route your die while enjoying live chiptune feedback!</p>
      
      {/* Die Routing Bus Animation Bar */}
      <div style={{ margin: '15px 0', background: '#120b00', padding: '10px', borderRadius: '6px', border: '1px solid #443300' }}>
        <span style={{ fontSize: '11px', color: '#ffb000' }}>DIE INTERCONNECT BUS ⚡ Score: {score} pts | Budget: {budget} left</span>
        <svg height="30" width="100%">
          <line 
            x1="0" y1="15" x2="100%" y2="15" 
            stroke={activeBusRoute ? '#ffffff' : '#ffb000'} 
            strokeWidth={activeBusRoute ? '5' : '2'} 
            strokeDasharray={activeBusRoute ? '8,4' : 'none'}
            style={{ transition: 'all 0.1s ease' }}
          />
        </svg>
      </div>

      <div style={{ display: 'flex', gap: '30px', marginTop: '20px', flexWrap: 'wrap' }}>
        {/* Toolbox Panel */}
        <div style={{ border: '2px solid #ffb000', padding: '15px', borderRadius: '8px', width: '240px', background: '#111008' }}>
          <h3>Architect Toolbox</h3>
          <p style={{ fontSize: '12px', color: '#ccc', margin: '5px 0 15px 0' }}>Select a component to stamp onto the wafer:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button 
              onClick={() => { setSelectedTool('TRANSISTOR'); sfx.playClockTick(); }}
              style={{ background: selectedTool === 'TRANSISTOR' ? '#ffb000' : 'transparent', color: selectedTool === 'TRANSISTOR' ? '#000' : '#ffb000', border: '1px solid #ffb000', padding: '10px', cursor: 'pointer', fontWeight: 'bold', textAlign: 'left' }}
            >
              ⚡ [T] Transistor
            </button>
            <button 
              onClick={() => { setSelectedTool('BUS'); sfx.playClockTick(); }}
              style={{ background: selectedTool === 'BUS' ? '#ffb000' : 'transparent', color: selectedTool === 'BUS' ? '#000' : '#ffb000', border: '1px solid #ffb000', padding: '10px', cursor: 'pointer', fontWeight: 'bold', textAlign: 'left' }}
            >
              🔗 [=] Copper Bus
            </button>
            <button 
              onClick={() => { setSelectedTool('REGISTER'); sfx.playClockTick(); }}
              style={{ background: selectedTool === 'REGISTER' ? '#ffb000' : 'transparent', color: selectedTool === 'REGISTER' ? '#000' : '#ffb000', border: '1px solid #ffb000', padding: '10px', cursor: 'pointer', fontWeight: 'bold', textAlign: 'left' }}
            >
              📦 [R] Register Cell
            </button>
          </div>
          <button 
            onClick={checkDesign}
            style={{ width: '100%', marginTop: '30px', background: '#00ff66', color: '#000', border: 'none', padding: '12px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}
          >
            Run Fab Verification 🔬
          </button>
        </div>

        {/* Silicon Die Grid (6x6) */}
        <div style={{ border: '2px solid #ffb000', padding: '15px', borderRadius: '8px', background: '#12121f' }}>
          <h3>Silicon Die Wafer (6x6 Matrix)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 60px)', gap: '8px', marginTop: '10px' }}>
            {grid.map((cell, idx) => {
              let bg = 'transparent';
              let label = '';
              let color = '#ffb000';

              if (cell === 'TRANSISTOR') {
                bg = '#332200';
                label = '⚡ T';
              } else if (cell === 'BUS') {
                bg = '#003322';
                label = '🔗 BUS';
                color = '#00ffcc';
              } else if (cell === 'REGISTER') {
                bg = '#220033';
                label = '📦 REG';
                color = '#c084fc';
              }

              return (
                <div 
                  key={idx} 
                  onClick={() => handleTileClick(idx)}
                  style={{ 
                    width: '60px', height: '60px', 
                    border: `1px dashed ${color}`, 
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                    cursor: 'pointer',
                    background: bg,
                    fontWeight: 'bold', fontSize: '11px',
                    color: color,
                    borderRadius: '4px'
                  }}
                >
                  <span style={{ fontSize: '9px', opacity: 0.6 }}>[{idx}]</span>
                  <span style={{ marginTop: '2px' }}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}