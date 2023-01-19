import * as React from "react";
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
} from "@mui/material";
interface IWhyBuyProps {}

const WhyBuy: React.FunctionComponent<IWhyBuyProps> = (props) => {
  return (
    <>
      <Grid container spacing={6} sx={{ p: 5 }}>
        <Grid item xs={12}>
          <h3>WHY BUY FROM US?</h3>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card sx={{ maxWidth: 345, height: 350 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://www.cars24.com/js/6f751a9d48793a9685f4a1313fed19ab.svg"
                alt=""
                sx={{ width: "100%", height: "auto", p: 12, pb: 3, pt: 3 }}
              />
              <CardContent sx={{ p: 5, pt: 1, pb: 3 }}>
                <Typography gutterBottom variant="h5" component="div">
                  Easy Financing Options
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Become eligible for Zero Down Payment via EMIs of up to 72
                  months and instant loans.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card sx={{ maxWidth: 345, height: 350 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://www.cars24.com/js/72ee8594f9a2e0d3f78d675ff84c0333.svg"
                alt=""
                sx={{ width: "100%", height: "auto", p: 12, pb: 3, pt: 3 }}
              />
              <CardContent sx={{ p: 5, pt: 1, pb: 3 }}>
                <Typography gutterBottom variant="h5" component="div">
                  12-Month Warranty
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Enjoy peace of mind with our 12-Month Warranty that is
                  standard across all cars that we sell.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card sx={{ maxWidth: 345, height: 350 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://www.cars24.com/js/7f7b7d5596e5e520b606dd534be627b0.svg"
                alt=""
                sx={{ width: "100%", height: "auto", p: 12, pb: 3, pt: 3 }}
              />
              <CardContent sx={{ p: 5, pt: 1, pb: 3 }}>
                <Typography gutterBottom variant="h5" component="div">
                  140-Quality Checks
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Inspected across 140 parameters and refurbished by
                  auto-experts, our cars are ready for the road.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card sx={{ maxWidth: 345, height: 350 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://www.cars24.com/js/bbbbd42860bbd47dabc26a2c8ead6905.svg"
                alt=""
                sx={{ width: "100%", height: "auto", p: 12, pb: 3, pt: 3 }}
              />
              <CardContent sx={{ p: 5, pt: 1, pb: 3 }}>
                <Typography gutterBottom variant="h5" component="div">
                  7-Day Return
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Love it, keep it. Changed your mind? Return it within 7 days
                  for a full refund.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={6}
        sx={{ p: 5, display: "flex", justifyContent: "space-evenly" }}
      >
        <Grid item xs={12}>
          <h3>BUY IN 3 EASY STEPS</h3>
        </Grid>
        <Grid item xs={6} md={4} sx={{ pl: 2 }}>
          <Card sx={{ maxWidth: 345, height: 300 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsMZKjV-_Asseyp2RaSpDHQ3UGNZcEXpVkOA&usqp=CAU"
                alt=""
                sx={{ p: 1, mt: 2 }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Find the perfect car for you
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Seamlessly browse thousands of MRL Certified cars.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} md={4}>
          <Card sx={{ maxWidth: 345, height: 300 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ7SFSXU1ZR483HFzvzQ-h8Hia5QKjTDkH1iLuU2RF-5-a0RjzBI_SHOvPCVJDNvr783I&usqp=CAU"
                alt=""
                sx={{ p: 1, mt: 2 }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Test Drive at home or a CarGeeks hub
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  Enjoy the convenience of a home test drive or visit a CARS24
                  hub for free.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} md={4}>
          <Card sx={{ maxWidth: 345, height: 300 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7r6y4cMpdZISMbbaViLcXWnBK3PCTLaaJyg&usqp=CAU"
                alt=""
                sx={{ p: 1, mt: 2 }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Buy it your way
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  You can pay in full or have it financed, the choice is yours.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default WhyBuy;
