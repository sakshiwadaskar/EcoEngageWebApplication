import { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { Event } from "../models/Event";
import "../assets/css/BasicMap.css";

interface BasicMapProps {
  events: Event[];
}

export default function BasicMap({ events }: BasicMapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maptilersdk.Map | null>(null); // Ref for the map object
  const boston = { lng: -71.08980336931096, lat: 42.34053842478537 };
  const [zoom] = useState(14);
  const mapAPIKey = import.meta.env.VITE_MAP_APIKEY;
  maptilersdk.config.apiKey = mapAPIKey;

  useEffect(() => {
    if (!mapContainer.current || !events.length) return; // Ensure map container and events are available

    // Clear existing markers
    if (mapRef.current) {
      mapRef.current.remove();
    }

    // Initialize the map
    mapRef.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [boston.lng, boston.lat],
      zoom: zoom,
    });

    // Add marker for Boston
    new maptilersdk.Marker({ color: "#FF0000" })
      .setLngLat([boston.lng, boston.lat])
      .addTo(mapRef.current);

    // Add markers for each event's location
    events.forEach((plantationEvent) => {
      const coordinates = {
        lat: plantationEvent.location.latitude,
        lng: plantationEvent.location.longitude,
      };
      if (mapRef.current) {
        new maptilersdk.Marker({ color: "#FF0000" })
          .setLngLat([coordinates.lng, coordinates.lat])
          .addTo(mapRef.current);
      }
    });
  }, [boston.lng, boston.lat, zoom, events]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
