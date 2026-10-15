import React, { useState, useEffect } from 'react';
import { sfx } from './audioEffects';

export default function ThermalArena() {
  const [clockSpeed, setClockSpeed] = useState(2.0); // GHz
  const [voltage, setVoltage] = useState(1.2); // Volts
  const [coolingPower, setCoolingPower] = useState(50); // W
  const [temperature, setTemperature] = useState(45); // °C
  const [score, setScore] = useState(0);
  const [crashed, setCrashed] = useState(false);

  // Simulation Loop for Temperature and Score
  useEffect(() => {
    if (crashed) return;

    const interval = setInterval(() => {
      setTemperature(prevTemp => {
        // Temp rises with clock speed squared and voltage, drops with cooling
        const heatGen = (clockSpeed * clockSpeed * voltage) * 15;
        const heatDissipated = coolingPower * 0.8;
        let newTemp = prevTemp + (heatGen - heatDissipated) * 0.1;

        if (newTemp < 30) newTemp = 30;

        // Check for Blue Screen of Death (Thermal Runaway >= 100°C)
        if (newTemp >= 100) {
          setCrashed(true);
          sfx.playThermalFizz();
          return 100;
        }

        return Math.round(newTemp * 10) / 10;
      });

      if (!crashed) {
        setScore(prev => prev + Math.floor(clockSpeed * 10));
      }
    }, 500);

    return () => clearInterval(interval);
  }, [clockSpeed, voltage, coolingPower, crashed]);

  const resetGame = () => {
    setClockSpeed(2.0);
    setVoltage(1.2);
    setCoolingPower(50);
    setTemperature(45);
    setScore(0);
    setCrashed(false);
    sfx.playClockTick();
  };

  // Determine bus glow color based on temperature
  const busColor = temperature > 80 ? '#ff3333' : temperature > 65 ? '#f59e0b' : '#00ffcc';

  return (
    <div style={{ fontFamily: 'monospace', padding: '20px', background: crashed ? '#0000aa' : '#050b14', color: '#00ffcc', minHeight: '100vh', transition: 'background 0.3s' }}>
      {crashed ? (
        <div style={{ background: '#0000aa', color: '#fff', padding: '40px', textAlign: 'center', marginTop: '30px', border: '4px solid #fff', borderRadius: '8px' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '10px' }}>:(</h1>
          <h2>A fatal exception 0E has occurred at 0028:C0011E36</h2>
          <p style={{ margin: '15px 0' }}>Your CPU overheated and hit thermal shutdown (Blue Screen of Death)!</p>
          <p>Final Score: <strong>{score}</strong> Performance Units</p>
          <button 
            onClick={resetGame} 
            style={{ background: '#fff', color: '#0000aa', border: 'none', padding: '12px 24px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '20px' }}
          >
            Reboot System 🔄
          </button>
        </div>
      ) : (
        <div>
          <h1>Dashboard 3: Thermal Throttling Arena (1990s-2010s)</h1>
          <p>The GHz Race: Push frequency and voltage for maximum performance points, but balance your cooling rig before thermal runaway!</p>

          {/* Animated Thermal Dissipation Bus */}
          <div style={{ margin: '15px 0', background: '#0a1628', padding: '10px', borderRadius: '6px', border: '1px solid #005555' }}>
            <span style={{ fontSize: '11px', color: busColor }}>THERMAL DISSIPATION BUS 🔥 Core Temp: {temperature.toFixed(1)}°C | Score: {score} pts</span>
            <svg height="30" width="100%">
              <line 
                x1="0" y1="15" x2="100%" y2="15" 
                stroke={busColor} 
                strokeWidth={temperature > 75 ? '5' : '3'} 
                strokeDasharray={temperature > 75 ? '4,4' : 'none'}
                style={{ transition: 'all 0.2s ease' }}
              />
            </svg>
          </div>

          <div style={{ display: 'flex', gap: '30px', marginTop: '20px', flexWrap: 'wrap' }}>
            {/* Controls Panel */}
            <div style={{ border: '2px solid #00ffcc', padding: '20px', borderRadius: '8px', width: '300px', background: '#0a1628' }}>
              <h3>Overclocking Rig</h3>
              
              <div style={{ margin: '15px 0' }}>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>
                  Clock Speed: <strong>{clockSpeed.toFixed(1)} GHz</strong>
                </label>
                <input 
                  type="range" min="1.0" max="6.0" step="0.1" 
                  value={clockSpeed} 
                  onChange={(e) => { setClockSpeed(parseFloat(e.target.value)); sfx.playClockTick(); }}
                  style={{ width: '100%', accentColor: '#00ffcc' }}
                />
              </div>

              <div style={{ margin: '15px 0' }}>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>
                  Core Voltage: <strong>{voltage.toFixed(2)} V</strong>
                </label>
                <input 
                  type="range" min="1.0" max="1.8" step="0.05" 
                  value={voltage} 
                  onChange={(e) => { setVoltage(parseFloat(e.target.value)); sfx.playClockTick(); }}
                  style={{ width: '100%', accentColor: '#00ffcc' }}
                />
              </div>

              <div style={{ margin: '15px 0' }}>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>
                  Cooling Power: <strong>{coolingPower} W</strong>
                </label>
                <input 
                  type="range" min="10" max="150" step="5" 
                  value={coolingPower} 
                  onChange={(e) => { setCoolingPower(parseInt(e.target.value)); sfx.playClockTick(); }}
                  style={{ width: '100%', accentColor: '#38bdf8' }}
                />
              </div>

              <button 
                onClick={resetGame} 
                style={{ width: '100%', background: 'transparent', color: '#00ffcc', border: '1px solid #00ffcc', padding: '10px', cursor: 'pointer', marginTop: '10px', fontWeight: 'bold' }}
              >
                Reset Rig 🔄
              </button>
            </div>

            {/* Live Telemetry Panel */}
            <div style={{ border: `2px solid ${busColor}`, padding: '20px', borderRadius: '8px', flex: 1, background: '#0a1628' }}>
              <h3>Live Telemetry & Performance</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px' }}>
                <div style={{ border: '1px dashed #00ffcc', padding: '15px', textAlign: 'center', borderRadius: '6px' }}>
                  <span style={{ fontSize: '12px', color: '#88aaff' }}>CORE TEMPERATURE</span>
                  <h1 style={{ color: busColor, margin: '10px 0' }}>{temperature.toFixed(1)}°C</h1>
                  <p style={{ fontSize: '13px', margin: 0 }}>{temperature > 80 ? '⚠️ WARNING: CRITICAL HEAT' : '🟢 Optimal Thermal Zone'}</p>
                </div>
                <div style={{ border: '1px dashed #00ffcc', padding: '15px', textAlign: 'center', borderRadius: '6px' }}>
                  <span style={{ fontSize: '12px', color: '#88aaff' }}>PERFORMANCE SCORE</span>
                  <h1 style={{ color: '#ffb000', margin: '10px 0' }}>{score} pts</h1>
                  <p style={{ fontSize: '13px', margin: 0 }}>Accumulating from frequency output</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}