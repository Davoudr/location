import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
// ================================================================== main component
const MapComponent = () => {
  // ---------------------------------------------------------------- hard coded varibles
  // -------------------------------- onLoad config for the map
  const defaultProps = {
    center: {
      lat: 45.56,
      lng: -73.68,
    },
    zoom: 11,
  };
  // -------------------------------- locations for being spotted on the map
  const locationsArr = [
    { lat: 45.493853370155186, lng: -73.6620613861083 },
    { lat: 45.51214089189288, lng: -73.60644309997558 },
    { lat: 45.590517345804734, lng: -73.575544052124 },
  ];
  // ---------------------------------------------------------------- storing map data
  const [mapInfo, setMapInfo] = useState(null);
  const handleApiLoaded = (map, maps) => {
    setMapInfo({ maps: maps, map: map });
  };
  // ---------------------------------------------------------------- marker maker function
  const markerMaker = (thelat, thelng) => {
    const marker = new mapInfo.maps.Marker({
      position: { lat: thelat, lng: thelng },
      map: mapInfo.map,
      // icon: svgIcon,
    });
    marker.setVisible(true);
  };
  // ---------------------------------------------------------------- adding marker to any sellected location
  const [selectedLocation, setSelectedLocation] = useState(null);
  // -------------------------------- storing location lat-lng
  const onClickHandle = (map, ev) => {
    setSelectedLocation({ lat: map.lat, lng: map.lng });
    console.log(selectedLocation);
  };
  // -------------------------------- creating marker on selected location
  useEffect(() => {
    if (mapInfo !== null && selectedLocation !== null) {
      markerMaker(selectedLocation.lat, selectedLocation.lng);
    }
  }, [mapInfo, selectedLocation]);
  // ---------------------------------------------------------------- component which create marker on the given location
  const MarkerMakerComponent = ({ thelat, thelng, text }) => {
    if (mapInfo !== null) {
      markerMaker(thelat, thelng);
    }
    return true;
  };
  // ==================================================================
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        onClick={(map, ev) => {
          onClickHandle(map, ev);
        }}
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_API,
          libraries: ["places"].join(","),
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {locationsArr.map((location) => {
          return (
            <MarkerMakerComponent
              thelat={location.lat}
              thelng={location.lng}
              text={"this place"}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};
// ==================================================================
export default MapComponent;
