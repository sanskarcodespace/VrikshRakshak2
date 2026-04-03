"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

// Fix for Leaflet marker icons in Next.js
const fixLeafletIcons = () => {
  const L = require("leaflet");
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
};

// Dynamic import for Leaflet components to avoid SSR errors
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });
const MarkerClusterGroup = dynamic(() => import("react-leaflet-cluster"), { ssr: false });

// Import hooks normally, but they will only be used inside the dynamically imported components
import { useMapEvents, useMap } from "react-leaflet";

// Heatmap logic component
function HeatLayer({ points }: { points: [number, number, number][] }) {
  const map = useMap();
  useEffect(() => {
    // @ts-ignore
    if (!window.L || !window.L.heatLayer) return;
    // @ts-ignore
    const heat = window.L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 10,
      gradient: { 0.4: 'blue', 0.65: 'lime', 1: 'red' }
    }).addTo(map);
    return () => { map.removeLayer(heat); };
  }, [map, points]);
  return null;
}

interface TreeMapProps {
  trees: any[];
  onSelectCoords?: (coords: { lat: number; lng: number }) => void;
  className?: string;
  showHeat?: boolean;
}

function MapEvents({ onSelectCoords }: { onSelectCoords?: (coords: { lat: number; lng: number }) => void }) {
  // @ts-ignore
  useMapEvents({
    click(e: any) {
      if (onSelectCoords) {
        onSelectCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    },
  });
  return null;
}

export function TreeMap({ trees, onSelectCoords, className, showHeat = false }: TreeMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fixLeafletIcons();
    // Load Heatmap CSS/JS if not present
    if (!document.getElementById('leaflet-heat')) {
       const script = document.createElement('script');
       script.id = 'leaflet-heat';
       script.src = 'https://leaflet.github.io/Leaflet.heat/dist/leaflet-heat.js';
       document.head.appendChild(script);
    }
  }, []);

  const heatPoints = trees.map(t => [t.lat || t.coords?.lat, t.lng || t.coords?.lng, (100 - (t.health || 100)) / 100]) as [number, number, number][];

  return (
    <div className={cn("relative rounded-3xl overflow-hidden border border-white/10 shadow-glow group", className)}>
      {/* Coordinate Inspector Overlay */}
      <div className="absolute bottom-4 right-4 z-10 glass border-white/10 px-4 py-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
         <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Geo_Source_Active</p>
         <p className="text-[12px] font-mono text-primary font-bold">SCANNING_COORDINATES...</p>
      </div>

      {/* @ts-ignore */}
      <MapContainer 
        center={[20.5937, 78.9629]} 
        zoom={5} 
        style={{ height: "100%", width: "100%", background: "#06130a" }}
        scrollWheelZoom={true}
        className="z-0"
      >
        <TileLayer
          // High contrast hybrid layer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {onSelectCoords && <MapEvents onSelectCoords={onSelectCoords} />}

        {showHeat ? (
          <HeatLayer points={heatPoints} />
        ) : (
          /* @ts-ignore */
          <MarkerClusterGroup chunkedLoading zoomToBoundsOnClick>
            {trees.map((tree, i) => (
              <Marker key={i} position={[tree.lat || tree.coords?.lat, tree.lng || tree.coords?.lng]}>
                 <Popup>
                    <div className="p-3 space-y-2 min-w-[160px]">
                       <div className="flex justify-between items-start">
                          <p className="font-bold text-sm text-primary">{tree.species || "Unknown Species"}</p>
                          <Badge variant="outline" className="text-[8px] py-0">{tree.id || "T-0000"}</Badge>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Geo_Tag_Telemetry</p>
                          <div className="bg-muted px-2 py-1 rounded-lg font-mono text-[9px] text-foreground/80">
                             LAT: {(tree.lat || tree.coords?.lat).toFixed(4)}<br/>
                             LNG: {(tree.lng || tree.coords?.lng).toFixed(4)}
                          </div>
                       </div>
                       <p className="text-[10px] uppercase font-bold text-eco-green">Health Index: {tree.health || 100}%</p>
                    </div>
                 </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        )}
      </MapContainer>

      {/* Decorative Overlays */}
      <div className="absolute top-4 left-4 z-10 glass border-white/10 px-3 py-1.5 rounded-xl pointer-events-none">
         <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Live_Network_Sync
         </span>
      </div>
    </div>
  );
}
