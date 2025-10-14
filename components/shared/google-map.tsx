/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useRef, useState } from "react"
import { createRoot, Root } from "react-dom/client"
import Marker from "@/public/svgs/marker"
import CustomInfoWindow from "./custom-info"
import { StoreLocation } from "@/app/store-locations/page"

interface GoogleMapProps {
    stores: StoreLocation[]
    selectedStore: StoreLocation | null
    onMapClick: () => void
    setSelectedStore: (store: StoreLocation | null) => void
}
let googleMapsScriptPromise: Promise<void> | null = null;
const loadGoogleMaps = (apiKey: string): Promise<void> => {
    if (typeof window === "undefined") return Promise.reject();

    // ✅ Already loaded
    if ((window as any).google?.maps) return Promise.resolve();

    // ✅ Already loading
    if (googleMapsScriptPromise) return googleMapsScriptPromise;

    // 🚀 First time: create the promise
    googleMapsScriptPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = (err) => reject(err);
        document.head.appendChild(script);
    });

    return googleMapsScriptPromise;
};

export default function GoogleMap({ stores, selectedStore, setSelectedStore }: GoogleMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<google.maps.Map | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const markersRef = useRef<google.maps.OverlayView[]>([]);
    const infoWindowRootRef = useRef<Root | null>(null)
    const infoWindowOverlayRef = useRef<google.maps.OverlayView | null>(null)

    // Initialize map + polyline on mount
    useEffect(() => {
        const initMap = async () => {
            try {
                await loadGoogleMaps(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "");
                if (!mapRef.current) return;

                const defaultCenter = { lat: 23.8041, lng: 90.4152 }; // fallback center

                const map = new google.maps.Map(mapRef.current, {
                    center: defaultCenter,
                    zoom: 7.5,
                    disableDefaultUI: true,
                    zoomControl: true,
                });
                mapInstance.current = map;
                setMapLoaded(true);

            } catch (err) {
                console.error("Failed to load Google Maps", err);
            }
        };

        initMap();

        return () => {
            console.log("Cleaning up map instance");
        };
    }, []);

    useEffect(() => {
        if (!mapLoaded || !mapInstance.current) return;

        // Clear existing markers
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];
        const map = mapInstance.current;
        stores.forEach((store) => {
            const target = new google.maps.LatLng(store.lat, store.lng);
            const markerDiv = document.createElement("div");
            markerDiv.style.position = "absolute";
            markerDiv.style.cursor = "pointer";
            markerDiv.style.transform = "translate(-50%, -100%)";
            markerDiv.style.pointerEvents = "auto";

            const markerOverlay = new google.maps.OverlayView();
            (markerOverlay as any).position = target;
            markerOverlay.onAdd = function () {
                const panes = this.getPanes();
                panes?.overlayMouseTarget?.appendChild(markerDiv);

                // initial draw attempt; if projection not ready, 'idle' listener will call draw
                try {
                    this.draw();
                } catch (e) {
                    /* ignore */
                }

                // ensure draw after map becomes idle (helps modal/hidden init cases)
                try {
                    google.maps.event.addListenerOnce(map, "idle", () => {
                        try {
                            this.draw();
                        } catch (e) {
                            /* ignore */
                        }
                    });
                } catch (e) {
                    /* ignore */
                }
            };
            markerOverlay.draw = function () {
                const projection = this.getProjection();
                if (!projection) return;
                const pos: google.maps.LatLng | undefined = (this as any).position;
                if (!pos) return;
                const pixel = projection.fromLatLngToDivPixel(pos);
                if (!pixel) return;
                markerDiv.style.left = `${pixel.x}px`;
                markerDiv.style.top = `${pixel.y}px`;
            };

            markerOverlay.onRemove = function () {
                if (markerDiv.parentNode) {
                    try {
                        markerDiv.parentNode.removeChild(markerDiv);
                    } catch (e) {
                        /* ignore */
                    }
                }
            };
            markerDiv.addEventListener("click", (e) => {
                e.stopPropagation();
                // showInfo();
                setSelectedStore(store)
                map.setZoom(12);
            });

            markerOverlay.setMap(map);
            markersRef.current.push(markerOverlay);
            const root = createRoot(markerDiv);
            root.render(<Marker />);
        })
    }, [stores, mapLoaded]);

    useEffect(() => {
        if (!mapLoaded || !mapInstance.current || !selectedStore) {
            // Clean up existing overlay
            if (infoWindowOverlayRef.current) {
                infoWindowOverlayRef.current.setMap(null)
                infoWindowOverlayRef.current = null
            }
            if (infoWindowRootRef.current) {
                // infoWindowRootRef.current.unmount()
                infoWindowRootRef.current = null
            }
            return
        }

        const map = mapInstance.current
        const infoDiv = document.createElement("div")
        infoDiv.style.position = "absolute"
        infoDiv.style.transform = "translate(-50%, -100%)"
        infoDiv.style.marginTop = "-10px" // Offset above the marker
        infoDiv.style.pointerEvents = "auto"
        infoDiv.style.zIndex = "1000"

        const infoOverlay = new google.maps.OverlayView()
            ; (infoOverlay as any).position = { lat: selectedStore.lat, lng: selectedStore.lng }

        infoOverlay.onAdd = function () {
            const panes = this.getPanes()
            panes?.floatPane?.appendChild(infoDiv)

            try {
                this.draw()
            } catch (e) {
                /* ignore */
            }

            try {
                google.maps.event.addListenerOnce(map, "idle", () => {
                    try {
                        this.draw()
                    } catch (e) {
                        /* ignore */
                    }
                })
            } catch (e) {
                /* ignore */
            }
        }

        infoOverlay.draw = function () {
            const projection = this.getProjection()
            if (!projection) return

            const pos: google.maps.LatLng | undefined = (this as any).position
            if (!pos) return

            const pixel = projection.fromLatLngToDivPixel(pos)
            if (!pixel) return

            infoDiv.style.left = `${pixel.x}px`
            infoDiv.style.top = `${pixel.y}px`
        }

        infoOverlay.onRemove = () => {
            if (infoDiv.parentNode) {
                try {
                    infoDiv.parentNode.removeChild(infoDiv)
                } catch (e) {
                    /* ignore */
                }
            }
        }

        infoOverlay.setMap(map)
        infoWindowOverlayRef.current = infoOverlay

        // Render custom React component
        const root = createRoot(infoDiv)
        infoWindowRootRef.current = root
        root.render(
            <CustomInfoWindow
                store={selectedStore}
                onClose={() => {
                    setSelectedStore(null)
                }}
            />
        )
        if (selectedStore.lat && selectedStore.lng) {
            mapInstance.current.setCenter({ lat: selectedStore.lat + + 0.0420, lng: selectedStore.lng });
        } else {

        }
        mapInstance.current.setZoom(12);
        // Cleanup
        return () => {
            if (infoWindowOverlayRef.current) {
                infoWindowOverlayRef.current.setMap(null)
            }
            if (infoWindowRootRef.current) {
                // infoWindowRootRef.current.unmount()
            }
        }
    }, [selectedStore, mapLoaded])

    return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}
