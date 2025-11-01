interface Wire {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active?: boolean;
  color?: 'cyan' | 'green' | 'orange';
}

interface DataWiresProps {
  wires: Wire[];
  width?: number;
  height?: number;
}

const DataWires = ({ wires, width = 1200, height = 600 }: DataWiresProps) => {
  const getColor = (color: string = 'cyan', active: boolean = false) => {
    if (!active) return 'hsl(var(--wire-inactive))';
    
    switch (color) {
      case 'green':
        return 'hsl(var(--neon-green))';
      case 'orange':
        return 'hsl(var(--neon-orange))';
      default:
        return 'hsl(var(--neon-cyan))';
    }
  };

  return (
    <svg 
      className="absolute inset-0 pointer-events-none"
      width={width}
      height={height}
      style={{ zIndex: 0 }}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <marker
          id="arrowhead-cyan"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="hsl(var(--neon-cyan))" />
        </marker>
        <marker
          id="arrowhead-green"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="hsl(var(--neon-green))" />
        </marker>
        <marker
          id="arrowhead-orange"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="hsl(var(--neon-orange))" />
        </marker>
      </defs>
      
      {wires.map((wire) => (
        <line
          key={wire.id}
          x1={wire.x1}
          y1={wire.y1}
          x2={wire.x2}
          y2={wire.y2}
          stroke={getColor(wire.color, wire.active)}
          strokeWidth={wire.active ? 3 : 2}
          strokeDasharray={wire.active ? '10,5' : '0'}
          filter={wire.active ? 'url(#glow)' : ''}
          markerEnd={wire.active ? `url(#arrowhead-${wire.color || 'cyan'})` : ''}
          className={wire.active ? 'animate-pulse' : ''}
          style={{
            animation: wire.active ? 'data-flow 1s linear infinite' : 'none',
            strokeDashoffset: wire.active ? 1000 : 0,
          }}
        />
      ))}
    </svg>
  );
};

export default DataWires;
