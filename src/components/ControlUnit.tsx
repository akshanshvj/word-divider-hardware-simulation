interface ControlUnitProps {
  active?: boolean;
  state?: string;
  clockPulse?: boolean;
}

const ControlUnit = ({ active = false, state = 'IDLE', clockPulse = false }: ControlUnitProps) => {
  return (
    <div 
      className={`hardware-block rounded-lg p-6 transition-all duration-300 ${
        active ? 'border-[hsl(var(--neon-orange))] shadow-[0_0_20px_hsl(var(--neon-orange)/0.6)]' : ''
      }`}
    >
      <div className={`text-sm font-bold mb-4 text-center ${active ? 'text-[hsl(var(--neon-orange))]' : 'text-muted-foreground'}`}>
        CONTROL UNIT (FSM)
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">State:</span>
          <span className={`text-sm font-semibold ${active ? 'text-[hsl(var(--neon-orange))]' : 'text-foreground'}`}>
            {state}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Clock:</span>
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
            clockPulse 
              ? 'bg-[hsl(var(--neon-orange))] shadow-[0_0_10px_hsl(var(--neon-orange))]' 
              : 'bg-[hsl(var(--muted))]'
          }`} />
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-[hsl(var(--hardware-border))]">
        <div className="text-xs text-muted-foreground text-center">
          Control Signals
        </div>
        <div className="flex gap-1 mt-2 justify-center">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              className={`w-2 h-6 rounded ${
                active && clockPulse 
                  ? 'bg-[hsl(var(--neon-orange)/0.8)]' 
                  : 'bg-[hsl(var(--muted))]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ControlUnit;
