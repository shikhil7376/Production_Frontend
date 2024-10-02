import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from 'leaflet';
import axios from "axios";
import { Button } from "@nextui-org/react";

// Default Leaflet marker icon fix
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Define prop types for the LeafletMap component
interface LeafletMapProps {
  setLocation: (location: { lat: number; lng: number; address: string }) => void;
  location:{address:string,lat:number,lng:number}  // Pass selected location to parent component
}

const LeafletMap: React.FC<LeafletMapProps> = ({ setLocation,location }) => {
    console.log(location);
    
  const [markerPosition, setMarkerPosition] = useState<[number, number]>([location.lat, location.lng]); // Default position
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const getAddress = async (lat: number, lng: number) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
        params: {
          lat,
          lon: lng,
          format: "json"
        }
      });
      return response.data.display_name || "Address not found";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Address not found";
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      async click(e) {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]); // Update marker position
        const address = await getAddress(lat, lng);
        setLocation({ lat, lng, address }); // Pass latitude and longitude as the selected location
      }
    });
    return null;
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a location");
      return;
    }
    
    setLoading(true); // Set loading state to true

    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: searchTerm,
          format: "json",
          addressdetails: 1,
          limit: 1
        }
      });

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        const address = response.data[0].display_name;
        setMarkerPosition([parseFloat(lat), parseFloat(lon)]);
        setLocation({ lat: parseFloat(lat), lng: parseFloat(lon), address });
      } else {
        alert("Location not found");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a location"
          className="rounded-lg text-sm font-roboto"
        />
        <Button 
          className="font-semibold bg-customPurple text-small text-white" 
          onClick={handleSearch}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>
      <MapContainer 
        key={`${markerPosition[0]}-${markerPosition[1]}`} 
        center={markerPosition} 
        zoom={13} 
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={markerPosition} />
        <MapClickHandler />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
