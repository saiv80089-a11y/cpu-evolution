import React, { useState } from 'react';

const milestones = [
  {
    era: "1940s-1950s",
    title: "The Vacuum Tube & Relay Era",
    pioneer: "ENIAC & Early Pioneers",
    description: "Computers occupied entire rooms, using thousands of fragile vacuum tubes and manual patch cables to perform basic arithmetic."
  },
  {
    era: "1970s",
    title: "The Birth of the Microprocessor",
    pioneer: "Intel 4004 (1971)",
    description: "The invention of the monolithic CPU crammed 2,300 transistors onto a single silicon chip, birthing personal computing and changing the trajectory of modern technology[cite: 1]."
  },
  {
    era: "1980s",
    title: "The Breadboard & Home Computer Era",
    pioneer: "8-bit Home Micros & Breadboards",
    description: "Engineers and hobbyists prototyped circuits on breadboards using Zilog Z80 and MOS 6502 chips, laying the groundwork for consumer software culture."
  },
  {
    era: "1990s-2010s",
    title: "The GHz Race & Multi-Core Shift",
    pioneer: "Pentium Era to Multi-Core",
    description: "Clock speeds soared past 3 GHz until thermal walls forced engineers to pivot toward multi-core processing and advanced cooling rigs."
  },
  {
    era: "Present Era",
    title: "AI, Chiplets & Modern Multi-Die Architectures",
    pioneer: "Heterogeneous Architecture",
    description: "Monolithic scaling limits led to 3D-stacked chiplets, interposers, and dedicated Neural Processing Units optimized explicitly for deep learning workloads."
  }
];

export default function MuseumLog() {
  const [selectedCard, setSelectedCard] = useState(milestones[1]); // Default to Intel 4004

  return (
    <div style={{ fontFamily: 'monospace', padding: '20px', background: '#090d16', color: '#38bdf8', minHeight: '100vh' }}>
      <h1>Museum Log & Historical Compendium</h1>
      <p>Explore the real-world engineering milestones that shaped computer architecture history!</p>

      <div style={{ display: 'flex', gap: '30px', marginTop: '20px', flexWrap: 'wrap' }}>
        {/* Milestones Sidebar List */}
        <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {milestones.map((m, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedCard(m)}
              style={{
                border: '1px solid #38bdf8',
                padding: '15px',
                borderRadius: '6px',
                cursor: 'pointer',
                background: selectedCard.title === m.title ? '#0369a1' : '#111827',
                color: selectedCard.title === m.title ? '#fff' : '#38bdf8',
                transition: 'background 0.2s'
              }}
            >
              <span style={{ fontSize: '11px', opacity: 0.8 }}>{m.era}</span>
              <h4 style={{ margin: '5px 0 0 0' }}>{m.title}</h4>
            </div>
          ))}
        </div>

        {/* Lore Card Details Panel */}
        <div style={{ flex: '2 1 400px', border: '2px solid #38bdf8', padding: '25px', borderRadius: '8px', background: '#111827' }}>
          <span style={{ background: '#0284c7', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
            {selectedCard.era}
          </span>
          <h2 style={{ color: '#f43f5e', marginTop: '15px' }}>{selectedCard.title}</h2>
          <h4 style={{ color: '#a855f7' }}>Key Milestone: {selectedCard.pioneer}</h4>
          
          <div style={{ borderLeft: '3px solid #38bdf8', paddingLeft: '15px', margin: '20px 0' }}>
            <p style={{ lineHeight: '1.6', fontSize: '15px', color: '#e2e8f0' }}>
              {selectedCard.description}
            </p>
          </div>

          <div style={{ background: '#030712', padding: '15px', borderRadius: '6px', border: '1px dashed #38bdf8', marginTop: '20px' }}>
            <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 'bold' }}>💡 ARCHITECTURAL TAKEAWAY</span>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '8px 0 0 0' }}>
              Every major leap—from manual patch wires to microprocessors[cite: 1], and onward to multi-die chiplets—was driven by the relentless quest to overcome physical limits in density, power, and thermal dissipation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}