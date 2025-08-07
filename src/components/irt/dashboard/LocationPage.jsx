import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import configData from "./config";

export default function LocationPage() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const geodata = configData.MAPTILER_DATASET_ID;
    const center = { lng: 80.2381, lat: 16.2232 };
    const zoom = 6;
    maptilersdk.config.apiKey = configData.MAPTILER_API_KEY;
    const [heatmapLayer, setHeatmapLayer] = useState("");
    const [pointLayer, setPointLayer] = useState("");
    const [pointLabels, setPointLabels] = useState("");
    const [selectedMapLayer, setSelectedMapLayer] = useState("point"); // 'point' or 'heatmap'
    const [mapLoaded, setMapLoaded] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [clickedItem, setClickedItem] = useState();

    useEffect(() => {
        if (map.current) return; // stops map from intializing more than once
        //map options: https://docs.maptiler.com/sdk-js/api/map/
        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.DATAVIZ.LIGHT, //more about map styles: https://docs.maptiler.com/sdk-js/api/map-styles/
            center: [center.lng, center.lat],
            zoom: zoom,
            hash: true,
        });

        //Read more about MapTiler Heatmap Helper: https://docs.maptiler.com/sdk-js/api/helpers/#heatmap
        map.current.on("load", () => {
            const { heatmapLayerId } = maptilersdk.helpers.addHeatmap(map.current, {
                data: geodata ,
                property: "price",
                weight: [
                    { propertyValue: 1, value: 1 },
                    { propertyValue: 10, value: 0 },
                ],
                radius: [
                    { propertyValue: 1, value: 20 },
                    { propertyValue: 10, value: 5 },
                ],
                colorRamp: maptilersdk.ColorRampCollection.COOL,
            });
            setHeatmapLayer(heatmapLayerId);
            setMapLoaded(true);
        });

        //Read more about MapTiler Point Helper: https://docs.maptiler.com/sdk-js/api/helpers/#point
        map.current.on("load", () => {
            const { pointLayerId, labelLayerId } = maptilersdk.helpers.addPoint(
                map.current,
                {
                    data: geodata,
                    pointColor: maptilersdk.ColorRampCollection.COOL.scale(0, 30),
                    property: "minimum_nights",
                    pointOpacity: 0.5,
                    showLabel: true,
                    labelColor: "black",
                    // pointRadius: 10,
                    // cluster: true,
                },
            );

            setPointLabels(labelLayerId);
            setPointLayer(pointLayerId);
            setMapLoaded(true);
        });
    }, [center.lng, center.lat, zoom]);

    // use effect for popup
    useEffect(() => {
        if (mapLoaded) {
            map.current.on("click", pointLayer, (e) => {
                let coordinates = e.features[0].geometry.coordinates.slice();
                let description = e.features[0].properties.name;

                new maptilersdk.Popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map.current);

                setClickedItem(e.features[0].properties);
                setIsOpen(true);
            });
        }
    }, [mapLoaded]);

    // use effects for visualization switch
    useEffect(() => {
        if (heatmapLayer && mapLoaded) {
            map.current.setLayoutProperty(
                heatmapLayer,
                "visibility",
                selectedMapLayer === "heatmap" ? "visible" : "none",
            );
        }
    }, [heatmapLayer, selectedMapLayer, mapLoaded]);

    useEffect(() => {
        if (pointLayer && mapLoaded) {
            map.current.setLayoutProperty(
                pointLayer,
                "visibility",
                selectedMapLayer === "point" ? "visible" : "none",
            );
            map.current.setLayoutProperty(
                pointLabels,
                "visibility",
                selectedMapLayer === "point" ? "visible" : "none",
            );
        }
    }, [pointLayer, selectedMapLayer, mapLoaded]);

    const handleVisualizationChange = () => {
        setSelectedMapLayer((prev) => (prev === "point" ? "heatmap" : "point"));
    };

    return (
        <div className="flex gap-4 p-10">
            {/* First Map */}
            <div className="w-1/2 my-5 z-0 border-r-2 pr-4 py-8 ">
                <MapContainer
                    center={[16.2232, 80.2381]}
                    zoom={7}
                    style={{ height: "380px", width: "100%" }}
                    className="rounded"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap contributors'
                    />
                </MapContainer>
            </div>

            {/* Second Map + Button */}
            <div className="w-1/2 flex flex-col gap-4">
                <Button
                    className="z-10 bg-blue-400 text-white"
                    onClick={handleVisualizationChange}
                >
                    Change to {selectedMapLayer === "point" ? "heatmap" : "points"}
                </Button>
                <div className="flex-1">
                    <div ref={mapContainer} id="map" className="w-full h-full rounded" />
                </div>
            </div>
        </div>

    );
}