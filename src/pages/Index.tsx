import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import HardwareRegister from '@/components/HardwareRegister';
import ALUComponent from '@/components/ALUComponent';
import ControlUnit from '@/components/ControlUnit';
import DataWires from '@/components/DataWires';
import { performDivision, DivisionStep } from '@/utils/divisionAlgorithm';
import { Play, RotateCcw, Zap } from 'lucide-react';

const Index = () => {
  const [dividend, setDividend] = useState('27');
  const [divisor, setDivisor] = useState('5');
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<DivisionStep[]>([]);
  const [clockPulse, setClockPulse] = useState(false);

  const bits = 8;

  const currentState = steps[currentStep] || {
    dividend: '0'.repeat(bits),
    divisor: '0'.repeat(bits),
    quotient: '0'.repeat(bits),
    remainder: '0'.repeat(bits),
    aluActive: false,
    controlState: 'IDLE',
    description: 'Ready to start simulation',
  };

  // Wire connections matching the diagram structure
  const wires = [
    // Control Unit to Divisor (down)
    { id: 'w1', x1: 600, y1: 120, x2: 600, y2: 200, active: isRunning, color: 'orange' as const },
    // Divisor to Control (feedback up)
    { id: 'w2', x1: 650, y1: 200, x2: 650, y2: 120, active: currentState.aluActive, color: 'cyan' as const },
    // Divisor to ALU (down)
    { id: 'w3', x1: 600, y1: 280, x2: 600, y2: 340, active: currentState.aluActive, color: 'cyan' as const },
    // Dividend to ALU (right)
    { id: 'w4', x1: 320, y1: 360, x2: 520, y2: 360, active: currentState.aluActive, color: 'cyan' as const },
    // ALU to Remainder (right)
    { id: 'w5', x1: 680, y1: 360, x2: 850, y2: 360, active: currentState.aluActive, color: 'green' as const },
    // Dividend to Quotient (down)
    { id: 'w6', x1: 250, y1: 410, x2: 250, y2: 500, active: currentState.controlState === 'UPDATE_Q', color: 'orange' as const },
    // ALU to Quotient (down-left)
    { id: 'w7', x1: 560, y1: 400, x2: 320, y2: 520, active: currentState.controlState === 'UPDATE_Q', color: 'green' as const },
  ];

  useEffect(() => {
    if (isRunning && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setClockPulse(true);
        setTimeout(() => setClockPulse(false), 300);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length - 1) {
      setIsRunning(false);
    }
  }, [isRunning, currentStep, steps.length]);

  const handleStart = () => {
    const div = parseInt(dividend) || 0;
    const divs = parseInt(divisor) || 1;
    
    if (div > 255 || divs > 255 || div < 0 || divs < 0) {
      alert('Please enter values between 0 and 255');
      return;
    }

    const divisionSteps = performDivision(div, divs, bits);
    setSteps(divisionSteps);
    setCurrentStep(0);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setSteps([]);
  };

  const isComplete = currentStep === steps.length - 1 && steps.length > 0;

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="w-8 h-8 text-[hsl(var(--neon-cyan))]" />
          <h1 className="text-4xl font-bold text-foreground">
            Word Divider Hardware Simulation
          </h1>
        </div>
        <p className="text-muted-foreground">
          Interactive visualization of binary division at the hardware level
        </p>
      </div>

      {/* Control Panel */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="hardware-block rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <Label htmlFor="dividend" className="text-foreground mb-2 block">
                Dividend (0-255)
              </Label>
              <Input
                id="dividend"
                type="number"
                value={dividend}
                onChange={(e) => setDividend(e.target.value)}
                disabled={isRunning}
                className="bg-input border-border text-foreground"
                min="0"
                max="255"
              />
            </div>
            <div>
              <Label htmlFor="divisor" className="text-foreground mb-2 block">
                Divisor (0-255)
              </Label>
              <Input
                id="divisor"
                type="number"
                value={divisor}
                onChange={(e) => setDivisor(e.target.value)}
                disabled={isRunning}
                className="bg-input border-border text-foreground"
                min="1"
                max="255"
              />
            </div>
            <Button
              onClick={handleStart}
              disabled={isRunning}
              className="bg-[hsl(var(--neon-cyan))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--neon-cyan)/0.8)] shadow-[0_0_20px_hsl(var(--neon-cyan)/0.5)]"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Simulation
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-[hsl(var(--neon-orange))] text-[hsl(var(--neon-orange))] hover:bg-[hsl(var(--neon-orange)/0.1)]"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Hardware Visualization */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="relative bg-[hsl(var(--card))] rounded-lg p-8 min-h-[600px]">
          <DataWires wires={wires} width={1200} height={600} />
          
          <div className="relative z-10">
            {/* Row 1: Control Unit (centered top) */}
            <div className="flex justify-center mb-12">
              <ControlUnit
                active={isRunning}
                state={currentState.controlState}
                clockPulse={clockPulse}
              />
            </div>

            {/* Row 2: Divisor Register (centered) */}
            <div className="flex justify-center mb-12">
              <HardwareRegister
                label="DIVISOR REGISTER"
                value={currentState.divisor}
                active={currentState.aluActive}
                color="cyan"
                bits={bits}
              />
            </div>

            {/* Row 3: Dividend and ALU (side by side) */}
            <div className="flex justify-center items-center gap-8 mb-12">
              <HardwareRegister
                label="DIVIDEND REGISTER"
                value={currentState.dividend}
                active={currentState.aluActive}
                color="cyan"
                bits={bits}
              />
              <ALUComponent
                active={currentState.aluActive}
                operation="SUBTRACT"
              />
            </div>

            {/* Row 4: Quotient and Remainder (bottom row) */}
            <div className="flex justify-center gap-32">
              <HardwareRegister
                label="QUOTIENT REGISTER"
                value={currentState.quotient}
                active={currentState.controlState === 'UPDATE_Q'}
                color="green"
                bits={bits}
              />
              <HardwareRegister
                label="REMAINDER REGISTER"
                value={currentState.remainder}
                active={currentState.aluActive}
                color="green"
                bits={bits}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Status Display */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="hardware-block rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Operation Status
            </h3>
            {isComplete && (
              <div className="flex items-center gap-2 text-[hsl(var(--neon-green))]">
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--neon-green))] shadow-[0_0_10px_hsl(var(--neon-green))]" />
                <span className="font-semibold">Division Complete ✅</span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length || 1}
            </div>
            <div className="text-foreground">
              {currentState.description}
            </div>
          </div>
        </div>
      </div>

      {/* Educational Description */}
      <div className="max-w-7xl mx-auto">
        <div className="hardware-block rounded-lg p-6 border-[hsl(var(--neon-cyan)/0.3)]">
          <h3 className="text-lg font-semibold text-[hsl(var(--neon-cyan))] mb-3">
            About This Simulation
          </h3>
          <p className="text-foreground leading-relaxed">
            This interactive hardware simulation shows the internal working of a <strong>Word Divider circuit</strong> — 
            demonstrating registers, ALU (Arithmetic Logic Unit), and control signals in real time. 
            The simulation uses a <strong>restoring division algorithm</strong> where the divisor is repeatedly subtracted 
            from the dividend until the remainder is less than the divisor. Each step is visualized with glowing data paths, 
            active components, and synchronized clock pulses, providing insight into how digital division works at the hardware level.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
