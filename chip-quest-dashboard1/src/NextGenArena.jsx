import React, { useState } from 'react';

export default function NextGenArena() {
  const [activeParadigm, setActiveParadigm] = useState('PHOTONIC');

  // Photonic State
  const [laserIntensity, setLaserIntensity] = useState(75); // mW
  const [waveguideAlignment, setWaveguideAlignment] = useState(92); // %

  // Quantum State
  const [qubitCount, setQubitCount] = useState(16);
  const [coherenceTime, setCoherenceTime] = useState(50); // microseconds

  // Neuromorphic State
  const [synapseDensity, setSynapseDensity] = useState(1000);
  const [firingThreshold, setFiringThreshold] = useState(0.4);

  // Carbon Nanotube State
  const [nanotubeSpacing, setNanotubeSpacing] = useState(1.2); // nm
  const [gateVoltage, setGateVoltage] = useState(0.7); // V

  return (
    <div style={{ fontFamily: 'monospace', padding: '20px', background: '#030712', color: '#c084fc', minHeight: '100vh' }}>
      <h1>Dashboard 5: Next-Gen Computing Frontier (Future Era)</h1>
      <p>Exotic Architectures: Experiment with Light, Qubits, Spiking Neurons, and Carbon Nanotubes!</p>

      {/* Paradigm Selector Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
        {[
          { id: 'PHOTONIC', label: '1. Photonic (Light)' },
          { id: 'QUANTUM', label: '2. Quantum (Qubits)' },
          { id: 'NEUROMORPHIC', label: '3. Neuromorphic (Brain)' },
          { id: 'NANOTUBE', label: '4. Carbon Nanotubes' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveParadigm(tab.id)}
            style={{
              background: activeParadigm === tab.id ? '#c084fc' : 'transparent',
              color: activeParadigm === tab.id ? '#000' : '#c084fc',
              border: '1px solid #c084fc',
              padding: '10px 15px',
              cursor: 'pointer',
              fontWeight: 'bold',
              borderRadius: '6px'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Paradigm Controller & Telemetry */}
      <div style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
        
        {/* Controls Panel */}
        <div style={{ flex: 1, border: '2px solid #c084fc', padding: '20px', borderRadius: '8px', background: '#111827' }}>
          <h3>Architecture Configurator</h3>

          {activeParadigm === 'PHOTONIC' && (
            <div>
              <p><strong>Photonic Computing:</strong> Routing light through optical waveguides.</p>
              <div style={{ margin: '15px 0' }}>
                <label>Laser Diode Intensity: <strong>{laserIntensity} mW</strong></label><br/>
                <input type="range" min="10" max="150" value={laserIntensity} onChange={(e) => setLaserIntensity(Number(e.target.value))} style={{ width: '100%', accentColor: '#c084fc' }} />
              </div>
              <div style={{ margin: '15px 0' }}>
                <label>Waveguide Alignment: <strong>{waveguideAlignment}%</strong></label><br/>
                <input type="range" min="50" max="100" value={waveguideAlignment} onChange={(e) => setWaveguideAlignment(Number(e.target.value))} style={{ width: '100%', accentColor: '#c084fc' }} />
              </div>
            </div>
          )}

          {activeParadigm === 'QUANTUM' && (
            <div>
              <p><strong>Quantum Computing:</strong> Qubits in superposition states.</p>
              <div style={{ margin: '15px 0' }}>
                <label>Active Qubits: <strong>{qubitCount} Qubits</strong></label><br/>
                <input type="range" min="4" max="64" step="4" value={qubitCount} onChange={(e) => setQubitCount(Number(e.target.value))} style={{ width: '100%', accentColor: '#c084fc' }} />
              </div>
              <div style={{ margin: '15px 0' }}>
                <label>Coherence Time: <strong>{coherenceTime} us</strong></label><br/>
                <input type="range" min="10" max="200" value={coherenceTime} onChange={(e) => setCoherenceTime(Number(e.target.value))} style={{ width: '100%', accentColor: '#c084fc' }} />
              </div>
            </div>
          )}

          {activeParadigm === 'NEUROMORPHIC' && (
            <div>
              <p><strong>Neuromorphic Computing:</strong> Spiking neural networks inspired by biology.</p>
              <div style={{ margin: '15px 0' }}>
                <label>Synapse Density: <strong>{synapseDensity} k/mm²</strong></label><br/>
                <input type="range" min="100" max="5000" step="100" value={synapseDensity} onChange={(e) => setSynapseDensity(Number(e.target.value))} style={{ width: '100%', accentColor: '#c084fc' }} />
              </div>
              <div style={{ margin: '15px 0' }}>
                <label>Firing Threshold: <strong>{firingThreshold} V</strong></label><br/>
                <input type="range" min="0.1" max="1.0" step="0.05" value={firingThreshold} onChange={(e) => setFiringThreshold(Number(e.target.value))} style={{ width: '100%', accentColor: '#c084fc' }} />
              </div>
            </div>
          )}

          {activeParadigm === 'NANOTUBE' && (
            <div>
              <p><strong>Carbon Nanotubes:</strong> Atom-thin switching matrices replacing silicon.</p>
              <div style={{ margin: '15px 0' }}>
                <label>Nanotube Pitch Spacing: <strong>{nanotubeSpacing} nm</strong></label><br/>
                <input type="range" min="0.5" max="3.0" step="0.1" value={nanotubeSpacing} onChange={(e) => setNanotubeSpacing(Number(e.target.value))} style={{ width: '100%', accentColor: '#c084fc' }} />
              </div>
              <div style={{ margin: '15px 0' }}>
                <label>Gate Voltage: <strong>{gateVoltage} V</strong></label><br/>
                <input type="range" min="0.2" max="1.5" step="0.05" value={gateVoltage} onChange={(e) => setGateVoltage(Number(e.target.value))} style={{ width: '100%', accentColor: '#c084fc' }} />
              </div>
            </div>
          )}
        </div>

        {/* Live Simulation Output */}
        <div style={{ flex: 1, border: '2px solid #c084fc', padding: '20px', borderRadius: '8px', background: '#111827' }}>
          <h3>Frontier Telemetry</h3>
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ border: '1px dashed #c084fc', padding: '15px', textAlign: 'center' }}>
              <span style={{ fontSize: '12px', color: '#a855f7' }}>COMPUTATIONAL SPEED MULTIPLIER</span>
              <h1 style={{ color: '#38bdf8', margin: '5px 0' }}>
                {activeParadigm === 'PHOTONIC' && `${(laserIntensity * (waveguideAlignment / 100) * 12.5).toFixed(0)}x`}
                {activeParadigm === 'QUANTUM' && `${Math.pow(2, qubitCount / 4).toExponential(2)}x`}
                {activeParadigm === 'NEuromorphic' && `${(synapseDensity * 1.5).toFixed(0)} OPS/W`}
                {activeParadigm === 'NANOTUBE' && `${(50 / nanotubeSpacing).toFixed(1)} GHz equiv`}
              </h1>
              <p>Compared to classical baseline silicon</p>
            </div>

            <div style={{ border: '1px dashed #c084fc', padding: '15px', textAlign: 'center' }}>
              <span style={{ fontSize: '12px', color: '#a855f7' }}>THERMAL / POWER EFFICIENCY</span>
              <h2 style={{ color: '#4ade80', margin: '5px 0' }}>
                {activeParadigm === 'PHOTONIC' && 'Near-Zero Heat (Optical)'}
                {activeParadigm === 'QUANTUM' && 'Cryogenic (-273°C Required)'}
                {activeParadigm === 'NEUROMORPHIC' && 'Ultra-Low Power (20 Watts)'}
                {activeParadigm === 'NANOTUBE' && 'Zero Quantum Leakage'}
              </h2>
              <p>Physical substrate stability index</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}