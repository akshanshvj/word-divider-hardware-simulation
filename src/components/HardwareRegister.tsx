interface HardwareRegisterProps {
  label: string;
  value: string;
  active?: boolean;
  color?: 'cyan' | 'green' | 'orange';
  bits?: number;
}

const HardwareRegister = ({ label, value, active = false, color = 'cyan', bits = 8 }: HardwareRegisterProps) => {
  const colorClasses = {
    cyan: 'border-[hsl(var(--neon-cyan))]',
    green: 'border-[hsl(var(--neon-green))]',
    orange: 'border-[hsl(var(--neon-orange))]',
  };

  const glowClasses = {
    cyan: 'shadow-[0_0_20px_hsl(var(--neon-cyan)/0.6)]',
    green: 'shadow-[0_0_20px_hsl(var(--neon-green)/0.6)]',
    orange: 'shadow-[0_0_20px_hsl(var(--neon-orange)/0.6)]',
  };

  const textColorClasses = {
    cyan: 'text-[hsl(var(--neon-cyan))]',
    green: 'text-[hsl(var(--neon-green))]',
    orange: 'text-[hsl(var(--neon-orange))]',
  };

  // Pad binary value to specified bits
  const paddedValue = value.padStart(bits, '0');

  return (
    <div 
      className={`hardware-block rounded-lg p-4 min-w-[200px] transition-all duration-300 ${
        active ? `${colorClasses[color]} ${glowClasses[color]}` : ''
      }`}
    >
      <div className={`text-xs font-semibold mb-2 ${active ? textColorClasses[color] : 'text-muted-foreground'}`}>
        {label}
      </div>
      <div className={`binary-display text-lg ${active ? textColorClasses[color] : 'text-foreground'}`}>
        {paddedValue}
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        Dec: {parseInt(paddedValue, 2) || 0}
      </div>
    </div>
  );
};

export default HardwareRegister;
