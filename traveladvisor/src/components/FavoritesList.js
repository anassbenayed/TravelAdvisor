import React from "react";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

export default function FavoritesList({
  Data,
  RemoveItem,
  setIsViewingFavorites,
}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.listHeader}>
        <Button
          endIcon={<CloseIcon />}
          variant="outlined"
          color="secondary"
          onClick={() => setIsViewingFavorites(false)}
        >
          Close
        </Button>
      </div>
      <div className={classes.list}>
        {Data !== [] &&
          Data?.map((place, index) => {
            return (
              <div key={index} className={classes.favItem}>
                <div className={classes.place}>
                  <div className={classes.placeName}>{place.name}</div>
                  <div className={classes.placeAddress}>{place.address}</div>
                </div>
                <div className={classes.remove}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => RemoveItem(place)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
      {Data === [] && (
        <div className={classes.noFav}>
          <div className={classes.noFavText}>No favorites yet</div>
        </div>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 25,
  },
  loading: {
    width: "100%",
    height: "600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  listHeader: {
    // width: "5%",
    // height: "5%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  list: {
    height: "75vh",
    overflow: "auto",
  },
  place: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  placeName: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  placeAddress: {
    fontSize: "0.75rem",
    marginBottom: "1rem",
  },
  remove: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
  },
  favItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottom: "1px solid #ccc",
  },
  noFav: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderBottom: "1px solid #ccc",
  },
  noFavText: {
    fontSize: "1rem",
    fontWeight: "bold",
    marginTop: "1rem",
  },
}));
