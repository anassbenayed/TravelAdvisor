import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";

export default function PlaceCard({ place, placeRef, selected }) {
  if (selected) {
    placeRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return (
    <Card elevation={4}>
      <CardMedia
        style={{ height: 240 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={place.name}
      ></CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Typography>
            {place.num_reviews} review{place.num_reviews > 1 && "s"}
          </Typography>
        </Box>
        {place.address && (
          <Typography
            gutterBottom
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <LocationOnIcon />
            {place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <PhoneIcon />
            {place.phone}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
