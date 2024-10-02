import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from 'leaflet';

// Default Leaflet marker icon fix
delete (L.Icon.Default as any).prototype._getIconUrl; // Type assertion to any

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Define prop types for the LeafletMap component
interface LeafletMapProps {
  latitude: number;  // Pass latitude from the parent component
  longitude: number; // Pass longitude from the parent component
}

const LeafletMap: React.FC<LeafletMapProps> = ({ latitude, longitude }) => {
  const [markerPosition, setMarkerPosition] = useState<[number, number]>([latitude, longitude]);  // Set initial position based on props

  // Update marker position whenever latitude or longitude changes
  useEffect(() => {
    setMarkerPosition([latitude, longitude]);
  }, [latitude, longitude]);

  return (
    <div className="pl-5">
      <MapContainer center={markerPosition} zoom={13} style={{ height: "412px", width: "350px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={markerPosition} />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
