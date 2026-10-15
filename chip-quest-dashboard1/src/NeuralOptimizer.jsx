import React, { useState } from 'react';

export default function NeuralOptimizer() {
  const [chiplets, setChiplets] = useState([
    { id: 1, type: 'NPU (Neural Core)', assignedTask: 'LLM Token Generation', load: 80, power: 45 },
    { id: 2, type: 'GPU (Parallel Core)', assignedTask: 'Matrix Multiplication', load: 95, power: 120 },
    { id: 3, type: 'CPU (Host Core)', assignedTask: 'OS Scheduler / Routing', load: 30, power: 25 },
  ]);

  const [powerBudget, setPowerBudget] = useState(200);
  const [latency, setLatency] = useState(12); // in milliseconds
  const [throughput, setThroughput] = useState(450); // tokens/sec

  const handleTaskChange = (id, newTask) => {
    const updated = chiplets.map(c => {
      if (c.id === id) {
        let newPower = c.power;
        if (newTask === 'Deep Learning Training') newPower = 90;
        else if (newTask === 'Inference & Token Gen') newPower = 50;
        else if (newTask === 'Data Preprocessing') newPower = 30;
        return { ...c, assignedTask: newTask, power: newPower };
      }
      return c;
    });
    setChiplets(updated);
  };

  const totalPowerUsed = chiplets.reduce((acc, c) => acc + c.power, 0);
  const isOverBudget = totalPowerUsed > powerBudget;

  return (
    <div style={{ fontFamily: 'monospace', padding: '20px', background: '#0b0f19', color: '#00f0ff', minHeight: '100vh' }}>
      <h1>Dashboard 4: Modern AI & Chiplet Grid (Present & Beyond)</h1>
      <p>Heterogeneous Computing: Distribute AI workloads across advanced multi-die chiplets and NPUs while staying under the thermal/power envelope!</p>

      <div style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
        {/* Chiplet Assignment Panel */}
        <div style={{ flex: 2, border: '2px solid #00f0ff', padding: '20px', borderRadius: '8px', background: '#111827' }}>
          <h3>3D Chiplet & Accelerator Array</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
            {chiplets.map((chip) => (
              <div key={chip.id} style={{ border: '1px dashed #00f0ff', padding: '15px', borderRadius: '6px', background: '#1f2937' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong>{chip.type}</strong>
                  <span>Power Draw: <strong>{chip.power} W</strong></span>
                </div>
                <label style={{ fontSize: '12px', color: '#9ca3af' }}>Assign Workload:</label><br/>
                <select 
                  value={chip.assignedTask}
                  onChange={(e) => handleTaskChange(chip.id, e.target.value)}
                  style={{ width: '100%', padding: '8px', background: '#111', color: '#00f0ff', border: '1px solid #00f0ff', marginTop: '5px' }}
                >
                  <option value="LLM Token Generation">LLM Token Generation (NPU Optimized)</option>
                  <option value="Matrix Multiplication">Matrix Multiplication (GPU Optimized)</option>
                  <option value="OS Scheduler / Routing">OS Scheduler / Routing (CPU Optimized)</option>
                  <option value="Deep Learning Training">Deep Learning Training (Heavy Workload)</option>
                  <option value="Data Preprocessing">Data Preprocessing (Light Workload)</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Telemetry & Power Budget Panel */}
        <div style={{ flex: 1, border: '2px solid #00f0ff', padding: '20px', borderRadius: '8px', background: '#111827' }}>
          <h3>System Metrics</h3>
          <div style={{ marginTop: '20px' }}>
            <p>Power Budget Limit: <strong>{powerBudget} W</strong></p>
            <p>Total Power Consumption:</p>
            <h2 style={{ color: isOverBudget ? '#ff3333' : '#00f0ff', margin: '5px 0' }}>{totalPowerUsed} W</h2>
            <p>{isOverBudget ? '⚠️ POWER EXCEEDED: THROTTLING ACTIVE!' : '🟢 Within Power Envelope'}</p>
          </div>

          <hr style={{ borderColor: '#374151', margin: '20px 0' }}/>

          <div>
            <p>Estimated Inference Latency:</p>
            <h3 style={{ color: '#ffb000' }}>{isOverBudget ? '45.2 ms (Laggy)' : '8.4 ms (Ultra-Fast)'}</h3>
            <p style={{ marginTop: '15px' }}>AI Throughput Efficiency:</p>
            <h3 style={{ color: '#00ff66' }}>{isOverBudget ? '120 tokens/sec' : '850 tokens/sec'}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}