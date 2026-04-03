"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";

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
import { useMapEvents } from "react-leaflet";

interface TreeMapProps {
  trees: any[];
  onSelectCoords?: (coords: { lat: number; lng: number }) => void;
  className?: string;
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

export function TreeMap({ trees, onSelectCoords, className }: TreeMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fixLeafletIcons();
  }, []);

  if (!isMounted) return <div className={cn("bg-accent/5 rounded-3xl animate-pulse", className)} />;

  return (
    <div className={cn("relative rounded-3xl overflow-hidden border border-white/10 shadow-glow", className)}>
      {/* @ts-ignore */}
      <MapContainer 
        center={[20.5937, 78.9629]} 
        zoom={5} 
        style={{ height: "100%", width: "100%", background: "#0a0a0a" }}
        scrollWheelZoom={true}
        className="z-0"
      >
        <TileLayer
          // Dark mode tile layer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {onSelectCoords && <MapEvents onSelectCoords={onSelectCoords} />}

        {/* @ts-ignore */}
        <MarkerClusterGroup chunkedLoading zoomToBoundsOnClick>
          {trees.map((tree, i) => (
            <Marker key={i} position={[tree.lat || tree.coords?.lat, tree.lng || tree.coords?.lng]}>
               <Popup>
                  <div className="p-2 space-y-1">
                     <p className="font-bold text-sm">{tree.species || "Unknown Species"}</p>
                     <p className="text-xs text-muted-foreground font-mono">{tree.id || "T-0000"}</p>
                     <p className="text-[10px] uppercase font-bold text-primary">Health Index: {tree.health || 100}%</p>
                  </div>
               </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
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
