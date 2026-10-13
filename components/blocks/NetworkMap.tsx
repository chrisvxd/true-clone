import { useMemo, type ReactNode } from "react";

export type NetworkMapProps = {
  sectors: { label: string; weight: number }[];
  connections: number;
  centerLogo: string;
  caption: ReactNode;
};

// Small deterministic PRNG so the map renders identically on server and client.
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 1000;
const H = 640;
const CX = W / 2;
const CY = H / 2 + 10;

export function NetworkMap({
  sectors = [],
  connections = 90,
  centerLogo,
  caption,
}: NetworkMapProps) {
  const layout = useMemo(() => {
    const rand = mulberry32(2006);
    const total = sectors.reduce((s, x) => s + Math.max(1, x.weight || 1), 0) || 1;

    const clusters = sectors.map((sector, i) => {
      const angle = -Math.PI / 2 + (i / Math.max(sectors.length, 1)) * Math.PI * 2;
      const share = Math.max(1, sector.weight || 1) / total;
      const r = 48 + share * 260;
      const x = CX + Math.cos(angle) * 330;
      const y = CY + Math.sin(angle) * 215;
      const count = Math.round(8 + share * 90);
      const nodes = Array.from({ length: count }, () => {
        const a = rand() * Math.PI * 2;
        const d = Math.sqrt(rand()) * r * 0.85;
        return { x: x + Math.cos(a) * d, y: y + Math.sin(a) * d, s: 1.6 + rand() * 2.2 };
      });
      return { ...sector, x, y, r, nodes };
    });

    const all = clusters.flatMap((c, ci) => c.nodes.map((n) => ({ ...n, ci })));
    const links = all.length
      ? Array.from({ length: connections }, (_, i) => {
          const a = all[Math.floor(rand() * all.length)];
          const b = all[Math.floor(rand() * all.length)];
          return { a, b, highlight: i % 11 === 0 };
        }).filter((l) => l.a.ci !== l.b.ci)
      : [];

    return { clusters, links };
  }, [sectors, connections]);

  return (
    <div className="mx-auto mt-10 max-w-site px-4 lg:px-0">
      <svg
        viewBox={`0 -20 ${W} ${H + 40}`}
        className="h-auto w-full"
        role="img"
        aria-label={typeof caption === "string" && caption ? caption : "Founder network map"}
      >
        {layout.clusters.map((c) => (
          <g key={c.label}>
            <circle cx={c.x} cy={c.y} r={c.r} fill="var(--muted)" opacity={0.5} />
            <text
              x={c.x}
              y={c.y < CY ? c.y - c.r - 10 : c.y + c.r + 22}
              textAnchor="middle"
              fontSize={13}
              className="fill-muted-foreground font-mono tracking-[0.08em] uppercase"
            >
              {c.label}
            </text>
          </g>
        ))}

        {layout.links.map((l, i) => {
          const mx = (l.a.x + l.b.x) / 2 + (CX - (l.a.x + l.b.x) / 2) * 0.35;
          const my = (l.a.y + l.b.y) / 2 + (CY - (l.a.y + l.b.y) / 2) * 0.35;
          return (
            <path
              key={i}
              d={`M${l.a.x},${l.a.y} Q${mx},${my} ${l.b.x},${l.b.y}`}
              fill="none"
              stroke={l.highlight ? "var(--brand-blue)" : "var(--foreground)"}
              strokeOpacity={l.highlight ? 0.55 : 0.07}
              strokeWidth={l.highlight ? 1.25 : 0.8}
            />
          );
        })}

        {layout.clusters.flatMap((c) =>
          c.nodes.map((n, i) => (
            <circle
              key={`${c.label}-${i}`}
              cx={n.x}
              cy={n.y}
              r={n.s}
              fill="var(--foreground)"
              opacity={0.55}
            />
          ))
        )}

        <circle cx={CX} cy={CY} r={46} fill="var(--primary)" />
        {centerLogo && (
          <image
            href={centerLogo}
            x={CX - 30}
            y={CY - 9}
            width={60}
            height={18}
            preserveAspectRatio="xMidYMid meet"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        )}
      </svg>
      {caption && (
        <p className="mx-auto mt-4 max-w-[680px] text-center font-mono text-xs tracking-[0.05em] text-muted-foreground">
          {caption}
        </p>
      )}
    </div>
  );
}
