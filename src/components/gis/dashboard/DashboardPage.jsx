// import React from "react";
// function DashboardPage() {
//   return (
//    <div>DashboardPage</div>
//   );
// }

// export default DashboardPage;

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polygon, Rectangle, useMapEvents, FeatureGroup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import Select from "react-select";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { IconChartHistogram } from '@tabler/icons-react';
// import { IconButton } from "@mui/material";
import firstBookMark from "../../../assets/Icons/bookmarks/3043608.png"
import secondBookMark from "../../../assets/Icons/bookmarks/3436914.png";
import thirdBookMark from "../../../assets/Icons/bookmarks/42681-cyclone-icon.png";
import fourthBookMark from "../../../assets/Icons/bookmarks/8725358.png";
import fifthBookMark from "../../../assets/Icons/bookmarks/4973825.png";
import { networkHandler } from "../../../https/NetworkHandler";
import { Button } from "@/components/ui/button";
import SaveIcon from "../../../assets/Icons/save-icon.png";
import locationIcon from "../../../assets/Icons/google_maps-icon.png";
import bookmarkIcon from "../../../assets/Icons/bookmark-icon.png";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


// Bookmark icons setup
const icons = {
  A: new L.Icon({ iconUrl: firstBookMark, iconSize: [40, 41], iconAnchor: [12, 41] }),
  B: new L.Icon({ iconUrl: secondBookMark, iconSize: [45, 41], iconAnchor: [12, 41] }),
  C: new L.Icon({ iconUrl: thirdBookMark, iconSize: [40, 41], iconAnchor: [12, 41] }),
  D: new L.Icon({ iconUrl: fourthBookMark, iconSize: [40, 41], iconAnchor: [12, 41] }),
  E: new L.Icon({ iconUrl: fifthBookMark, iconSize: [38, 41], iconAnchor: [12, 41] }),
};

const options = [
  { value: "A", label: "Forest Fire Hotspot" },
  { value: "B", label: "Flood" },
  { value: "C", label: "Cyclone" },
  { value: "D", label: "Cloud Burst" },
  { value: "E", label: "High Wave" },
];

const optionsForColours = [
  { value: "green", label: "Green" },
  { value: "red", label: "Red" },
];

const DashboardPage = () => {
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [polygonData, setPolygonData] = useState(null)
  const [coordinates, setCoordinates] = useState([])
  const [markers, setMarkers] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const navigate = useNavigate();
  const userId = "asdasd";
  const [changeButtonColor, setChangeButtonColor] = useState(false);

  const getShapes = async () => {
    try {
      const res = await networkHandler.get('/getShapes');
      setPolygonData(res.polygons)
    } catch (error) {
      console.log("error getting coordinates", error)
    }
  }
  useEffect(() => {
    getShapes()
  }, [])

  // Handle map clicks for placing bookmarks
  const MapClickHandler = () => {

    useMapEvents({
      click(e) {
        if (selectedBookmark && !isDrawing) {
          const { lat, lng } = e.latlng;
          // console.log(`Bookmark ${selectedBookmark}:`, lat, lng);
          setMarkers((prev) => [...prev, { lat, lng, type: selectedBookmark }]);
        }
      },
    });
    return null;
  };


  // Handle shape creation
  const handleCreated = (e) => {
    const { layerType, layer } = e;
    if (layerType === "polygon" || layerType === "rectangle") {
      const coordinates = layer.getLatLngs();
      setCoordinates((prev) => [...prev, { color: selectedColor ? selectedColor : "red", coordinates: coordinates.flat() }]);
      // console.log("Shape Coordinates:", coordinates);
    }
    setIsDrawing(false);
  };

  // Handle drawing start
  const handleDrawStart = () => {
    setIsDrawing(true);
  };

  const handlePostCoordinates = async () => {
    const res = await networkHandler.post(`/saveShapes`, {
      "industryId": 1,
      "userId": userId,
      "polygons": coordinates
    });
    alert("posted successfully....");
    setCoordinates([])
  }


  return (
    <div className="px-6">
      <div>
        <p className="text-[16px] text-[#666666] font-semibold mb-2 pt-10">Factory or Industry Name</p>
        <Input className="border-[#cccccc] w-[40vw]" type="text" placeholder="Enter name here" />
      </div>

      <div className="flex relative items-center justify-between mt-10">
        <img src={locationIcon} className="w-[1vw] h-[1.5vw] absolute top-[0.7vw] left-3" />
        <Input className="border-[#cccccc] w-[30vw] pl-8 placeholder:text-[#9aa6ac]" type="text" placeholder="Search Location" />
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <div className="rounded-[50%] shadow-xl w-10 h-10 flex items-center justify-center">
                <img src={bookmarkIcon} className="w-4 h-5" />
              </div>
            </DialogTrigger>
            <DialogContent className="z-[2000] fixed sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                <Select
                  options={options}
                  onChange={(selected) => setSelectedBookmark(selected.value)}
                  placeholder="Select Bookmark Type"
                />
                </div>
                <div className="grid gap-3">
                <Select
                  options={optionsForColours}
                  onChange={(s) => setSelectedColor(s.value)}
                  placeholder="Select Polygon color"
                />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="bg-white" variant="outline" type="submit">Save changes</Button>
                </DialogClose>
                
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>

      <MapContainer center={[17.385, 78.4867]} zoom={15} style={{ height: "480px", width: "100%" }} className="my-5 z-0">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleCreated}
            onDrawStart={handleDrawStart}
            draw={{
              polygon: {
                allowIntersection: false,
                showArea: true,
                shapeOptions: { color: selectedColor ?? "red" },
              },
              rectangle: { shapeOptions: { color: selectedColor ?? "red" } },
              circle: false,
              marker: false,
              polyline: false,
            }}
          />
        </FeatureGroup>

        <MapClickHandler />
        {polygonData && polygonData.map((polygon, index) => {
          let coordsArray = polygon.coordinates.map((coord) => [coord.lat, coord.lng]);

          return (
            <Polygon
              key={index}
              positions={coordsArray}
              pathOptions={{ color: polygon.color }}
            />
          )
        })}


        {markers.map((marker, idx) => (
          <Marker
            key={idx}
            position={[marker.lat - 0.001, marker.lng- 0.0001]}
            icon={icons[marker.type]}
          />
        ))}
      </MapContainer>

      <div className="flex items-center justify-between mb-10">
        <p>238P & 240P, Vakalapudi, Kakinada Industrial Area, Kakinada, Andhra Pradesh 533005</p>
        <Button className={`${changeButtonColor ? "bg-[#e4c811]" : "bg-[#d3d3d3]"} text-white px-7`} onClick={() => setChangeButtonColor((prev) => !prev)}><img src={SaveIcon} className="w-5 h-5" />Save</Button>
      </div>
    </div>
  );
};

export default DashboardPage;

