import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import L, { LatLng, LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import { makeStyles, Typography, Paper } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

export default function LLMap({
  places,
  coords,
  setBounds,
  setCoords,
  setChildClicked,
}) {
  const classes = useStyles();
  const mapRef = React.createRef(null);
  const [position, setPosition] = useState([36.807133, 10.185171]);
  const [markers, setMarkers] = useState(null);
  const [allMarkers, setallMarkers] = useState(null);

  var LeafIcon = L.Icon.extend({
    options: {
      iconSize: [38, 95],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76],
    },
  });

  var greenIcon = new LeafIcon({
    iconUrl: "http://leafletjs.com/examples/custom-icons/leaf-green.png",
    shadowUrl: "http://leafletjs.com/examples/custom-icons/leaf-shadow.png",
  });

  function LocateMe() {
    const map = useMapEvents({
      click() {
        map.locate({ enableHighAccuracy: true });
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null && position === [36.807133, 10.185171] ? null : (
      <Marker position={position} icon={greenIcon}>
        <Popup>I find you!</Popup>
      </Marker>
    );
  }

  function DisplayMarkers() {
    const mMap = useMap();
    const map = useMapEvents({
      moveend() {
        console.log("load markers");

        setBounds(mMap.getBounds());
        setCoords(mMap.getCenter());
        const markers = allMarkers?.filter((m) => map?.getBounds().contains(m));
        setMarkers(markers);
      },
    });

    return markers == null
      ? null
      : places?.length > 0 &&
          places?.map((place, index) => (
            <Marker
              key={index}
              position={[place.latitude, place.longitude]}
              icon={greenIcon}
              eventHandlers={{
                click: (e) => {
                  setChildClicked(place);
                },
              }}
            >
              <Popup>
                <Typography>{place.name}</Typography>
                <div>
                  <img
                    className={classes.cardImage}
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                    }
                  />
                  <Rating
                    readOnly
                    size={"small"}
                    value={Number(place.rating)}
                  />
                </div>
              </Popup>
            </Marker>
          ));
  }

  function generateMarkers(count, bounds) {
    const minLat = bounds.getSouthWest().lat,
      rangeLng = bounds.getNorthEast().lat - minLat,
      minLng = bounds.getSouthWest().lng,
      rangeLat = bounds.getNorthEast().lng - minLng;

    const result = Array.from({ length: count }, (v, k) => {
      return new LatLng(
        minLat + Math.random() * rangeLng,
        minLng + Math.random() * rangeLat
      );
    });
    return result;
  }

  useEffect(() => {
    const southWest = new LatLng(36.824932, 10.194655),
      northEast = new LatLng(36.794009, 10.164443),
      bounds = new LatLngBounds(southWest, northEast);
    const myMarkers = generateMarkers(25, bounds);
    setallMarkers(myMarkers);
  }, []);

  return (
    <MapContainer
      className={classes.mapContainer}
      ref={mapRef}
      center={position}
      zoom={16}
      zoomControl={true}
      doubleClickZoom={true}
      scrollWheelZoom={false}
      dragging={true}
      zoomAnimation={true}
      easeLinearity={0.35}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution={undefined}
      />
      <DisplayMarkers />
    </MapContainer>
  );
}

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    height: "90vh",
    width: "100%",
  },
  paper: {
    width: 100,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: 10,
  },
  cardImage: {
    height: 85,
    width: 85,
    cursor: "pointer",
  },
}));
