import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  favoritesTitle: {
    color: "white",
  },
}));

export default function MainHeader({ selected, openFavorites, AddNewFav }) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar style={{ flex: 1, justifyContent: "space-between" }}>
        <div>
          <Typography variant="h6" className={classes.title}>
            Travel Advisor: Restaurants, Hotels, and Attractions
          </Typography>
          <Typography variant="h8" className={classes.title}>
            Selected place: {selected?.name}
          </Typography>
        </div>

        <div>
          {/* add favorite places popup and view details */}
          <Button
            className={classes.favoritesTitle}
            onClick={() =>
              AddNewFav({
                name: selected?.name,
                address: selected?.address,
              })
            }
          >
            Add to Favorites
          </Button>
          {/* add show favorite places button */}
          <Button
            className={classes.favoritesTitle}
            onClick={() => openFavorites(true)}
          >
            View Favorites
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
