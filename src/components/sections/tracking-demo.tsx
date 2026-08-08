"use client";

import { useMemo, useState } from "react";
import { Search, MapPinned, Clock3, FileText, Thermometer } from "lucide-react";

const DEMO_SHIPMENTS: Record<
  string,
  {
    id: string;
    status: string;
    origin: string;
    destination: string;
    eta: string;
    mode: string;
    progress: number;
    temperature?: string;
    history: { time: string; event: string; location: string }[];
  }
> = {
  "SVK-94821": {
    id: "SVK-94821",
    status: "In transit",
    origin: "Shanghai, CN",
    destination: "Chicago, US",
    eta: "14 Aug 2026 · 18:00 UTC",
    mode: "Ocean FCL",
    progress: 72,
    history: [
      { time: "02 Aug 08:10", event: "Container gated in", location: "Shanghai Yangshan" },
      { time: "03 Aug 21:40", event: "Vessel departed", location: "Shanghai" },
      { time: "07 Aug 11:20", event: "Transshipment completed", location: "Singapore" },
      { time: "10 Aug 16:05", event: "Arrived at destination port", location: "Rotterdam" },
    ],
  },
  "SVK-77201": {
    id: "SVK-77201",
    status: "Customs clearance",
    origin: "Frankfurt, DE",
    destination: "Lyon, FR",
    eta: "07 Aug 2026 · 16:40 UTC",
    mode: "Road · Cold chain",
    progress: 84,
    temperature: "4.2°C",
    history: [
      { time: "06 Aug 19:15", event: "Picked up under temperature control", location: "Frankfurt Hub" },
      { time: "07 Aug 02:40", event: "Border crossing completed", location: "Kehl / Strasbourg" },
      { time: "07 Aug 09:10", event: "Customs documentation submitted", location: "Lyon inbound" },
    ],
  },
};

export function TrackingDemo() {
  const [query, setQuery] = useState("SVK-94821");
  const [activeId, setActiveId] = useState("SVK-94821");

  const shipment = useMemo(() => DEMO_SHIPMENTS[activeId], [activeId]);

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const key = query.trim().toUpperCase();
    if (DEMO_SHIPMENTS[key]) {
      setActiveId(key);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[28px] border border-border bg-white p-6 shadow-soft md:p-8">
        <h2 className="font-heading text-2xl text-navy">Track a shipment</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Try demo IDs <span className="font-semibold text-navy">SVK-94821</span> or{" "}
          <span className="font-semibold text-navy">SVK-77201</span>.
        </p>
        <form onSubmit={onSearch} className="mt-6 flex gap-2">
          <label htmlFor="tracking-id" className="sr-only">
            Tracking number
          </label>
          <input
            id="tracking-id"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter tracking number"
            className="h-12 flex-1 rounded-2xl border border-border px-4 text-sm outline-none ring-royal/30 focus:ring-2"
          />
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl gradient-royal px-5 text-sm font-semibold text-white"
          >
            <Search className="size-4" />
            Track
          </button>
        </form>
        <div className="mt-6 grid gap-3">
          {Object.values(DEMO_SHIPMENTS).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveId(item.id);
                setQuery(item.id);
              }}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                activeId === item.id
                  ? "border-royal bg-royal/5"
                  : "border-border hover:bg-surface"
              }`}
            >
              <p className="text-sm font-semibold text-navy">{item.id}</p>
              <p className="text-xs text-muted-foreground">
                {item.origin} → {item.destination}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-border bg-white p-6 shadow-lift md:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-royal">Live tracking</p>
            <h3 className="font-heading text-3xl text-navy">{shipment.id}</h3>
          </div>
          <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
            {shipment.status}
          </span>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          <Info icon={MapPinned} label="Route" value={`${shipment.origin} → ${shipment.destination}`} />
          <Info icon={Clock3} label="ETA" value={shipment.eta} />
          <Info icon={FileText} label="Mode" value={shipment.mode} />
          <Info
            icon={Thermometer}
            label="Temperature"
            value={shipment.temperature ?? "Ambient"}
          />
        </div>

        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span>{shipment.progress}%</span>
        </div>
        <div className="mb-8 h-2.5 overflow-hidden rounded-full bg-surface">
          <div
            className="h-full rounded-full gradient-royal transition-all duration-700"
            style={{ width: `${shipment.progress}%` }}
          />
        </div>

        <h4 className="font-heading text-lg text-navy">Location history</h4>
        <ol className="mt-4 space-y-4">
          {shipment.history.map((event) => (
            <li key={event.time + event.event} className="relative pl-6">
              <span className="absolute left-0 top-1.5 size-2.5 rounded-full bg-royal" />
              <p className="text-sm font-semibold text-navy">{event.event}</p>
              <p className="text-xs text-muted-foreground">
                {event.time} · {event.location}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface/60 p-4">
      <Icon className="mb-2 size-4 text-royal" />
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold text-navy">{value}</p>
    </div>
  );
}
