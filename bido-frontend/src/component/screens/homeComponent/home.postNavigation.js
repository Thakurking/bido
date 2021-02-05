import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  Typography,
  CardActions,
  Button,
  CardContent,
  CardMedia,
  CardActionArea,
  Container,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import "../../../App.css";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
    marginTop: "15%",
  },
  // paper: {
  //   padding: theme.spacing(2),
  //   textAlign: "center",
  //   backgroundColor: "#343a40",
  // },
  //Card Inside Paper
  root: {
    maxWidth: "100%",
    borderRadius: "10px",
    border: "none",
  },
  cardAction: {
    backgroundColor: "#343a40",
  },
  cardButton: {
    backgroundColor: "wheat",
  },
  media: {
    height: 80,
  },
}));

const PostNavigation = () => {
  const classes = useStyles();
  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={12} md={6}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Catering Services"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Catering
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardAction}>
                  <Button
                    size="small"
                    variant="contained"
                    className={classes.cardButton}
                  >
                    View More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Shipping Services"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Shipping
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardAction}>
                  <Button
                    size="small"
                    variant="contained"
                    className={classes.cardButton}
                  >
                    View More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Construction Services"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Construction
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardAction}>
                  <Button
                    size="small"
                    variant="contained"
                    className={classes.cardButton}
                  >
                    View More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Interior Design Services"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Interior Design
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardAction}>
                  <Button
                    size="small"
                    variant="contained"
                    className={classes.cardButton}
                  >
                    View More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default PostNavigation;
