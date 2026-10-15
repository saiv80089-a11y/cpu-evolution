import React, { useState, useEffect } from 'react';

export default function AchievementTracker({ stats }) {
  const [unlocked, setUnlocked] = useState([]);

  useEffect(() => {
    const achievements = [];
    if (stats.cpuSteps >= 3) achievements.push('FIRST_PULSE');
    if (stats.routedChips >= 5) achievements.push('SILICON_ARCHITECT');
    if (stats.stableOverclock) achievements.push('OVERCLOCK_MASTER');
    if (stats.frontierExplored) achievements.push('QUANTUM_PIONEER');
    setUnlocked(achievements);
  }, [stats]);

  const badges = [
    { id: 'FIRST_PULSE', title: '⚡ First Pulse', desc: 'Successfully execute a 4-bit instruction cycle.' },
    { id: 'SILICON_ARCHITECT', title: '🏙️ Silicon Architect', desc: 'Route 5 or more microchips in Silicon City.' },
    { id: 'OVERCLOCK_MASTER', title: '🔥 Overclock Master', desc: 'Maintain peak clock speed without system failure.' },
    { id: 'QUANTUM_PIONEER', title: '🌌 Quantum Pioneer', desc: 'Experiment with next-generation exotic architectures.' },
  ];

  return (
    <div style={{ border: '2px solid #ffb000', padding: '15px', borderRadius: '8px', background: '#1a1400', marginBottom: '20px' }}>
      <h3 style={{ color: '#ffb000', margin: '0 0 10px 0' }}>🏆 Global Achievement Tracker ({unlocked.length}/{badges.length})</h3>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        {badges.map((b) => {
          const isUnlocked = unlocked.includes(b.id);
          return (
            <div 
              key={b.id} 
              style={{ 
                border: `1px solid ${isUnlocked ? '#ffb000' : '#444'}`, 
                padding: '10px', 
                borderRadius: '6px', 
                background: isUnlocked ? '#2d2200' : '#111', 
                opacity: isUnlocked ? 1 : 0.4,
                flex: '1 1 200px'
              }}
            >
              <div style={{ fontWeight: 'bold', color: isUnlocked ? '#ffb000' : '#777' }}>{b.title}</div>
              <div style={{ fontSize: '11px', color: '#ccc', marginTop: '4px' }}>{b.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}