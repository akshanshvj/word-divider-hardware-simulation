interface ALUComponentProps {
  active?: boolean;
  operation?: string;
}

const ALUComponent = ({ active = false, operation = 'SUB' }: ALUComponentProps) => {
  return (
    <div 
      className={`hardware-block rounded-lg p-6 min-w-[180px] transition-all duration-300 ${
        active ? 'border-[hsl(var(--neon-green))] shadow-[0_0_20px_hsl(var(--neon-green)/0.6)]' : ''
      }`}
    >
      <div className={`text-sm font-bold mb-3 text-center ${active ? 'text-[hsl(var(--neon-green))]' : 'text-muted-foreground'}`}>
        ALU
      </div>
      <div className="flex items-center justify-center mb-2">
        <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center ${
          active 
            ? 'border-[hsl(var(--neon-green))] bg-[hsl(var(--neon-green)/0.1)]' 
            : 'border-[hsl(var(--hardware-border))] bg-[hsl(var(--muted))]'
        }`}>
          <span className={`text-2xl font-bold ${active ? 'text-[hsl(var(--neon-green))]' : 'text-muted-foreground'}`}>
            -
          </span>
        </div>
      </div>
      <div className="text-xs text-center text-muted-foreground">
        {operation}
      </div>
    </div>
  );
};

export default ALUComponent;
