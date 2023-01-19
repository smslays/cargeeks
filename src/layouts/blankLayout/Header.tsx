import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CarRentalOutlined } from "@mui/icons-material";
import routes from "../../shared/routes/FrontendRoutes";
import { NavLink as NLink, Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  addLoggedUser,
  selectLoggedUser,
} from "../../features/frontend/auth/AuthSlice";
import { useLocation } from "react-router-dom";
import session from "redux-persist/lib/storage/session";

const NavLink = styled(NLink)`
  text-decoration: none;
  margin-right: 5px;
`;
const StyledLink = styled(Link)`
  color: white;
  margin-left: 10px;
  margin-top: 7px;
  text-decoration: none;
  cursor: pointer;
`;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

const Header = (props: Props) => {
  const loggedUser = useSelector(selectLoggedUser);
  const { window } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (loggedUser?._id && (pathname == "/login" || pathname == "/register")) {
      navigate("/");
    }
  }, [pathname, loggedUser]);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        CarGeeks
      </Typography>
      <Divider />
      <List
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "550 px",
          
        }}
      >
        {Array.isArray(routes) &&
          routes
            .filter((route) => route.showInMenu)
            .map(({ label, path }, i) => (
              <NavLink
                key={path + i}
                sx={{ color: "#fff",paddingRight:"5px" }}
                to={path}
                style={({ isActive }) => ({
                  color: isActive ? "#DEDEDE" : "white",
                })}
              >
                <ListItem key={path + i} disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={label}  />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <IconButton sx={{ color: "#fff" }}>
              <CarRentalOutlined />
            </IconButton>
            Car Geeks
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {Array.isArray(routes) &&
              routes
                .filter((route) => route.showInMenu)
                .map(({ label, path }, i) => (
                  <NavLink
                    key={path + i}
                    sx={{ color: "#fff",paddingRight:"10px" }}
                    to={path}
                    style={({ isActive }) => ({
                      color: isActive ? "#DEDEDE" : "white",
                    })}
                  >
                    {label}
                  </NavLink>
                ))}
          </Box>
          <Box alignSelf="start" sx={{ marginLeft: 10, marginTop: 1 }}>
            {!loggedUser?._id && (
              <>
                <StyledLink to="login">Login</StyledLink>
                <StyledLink to="register">Register</StyledLink>
              </>
            )}

            {loggedUser?._id && (
              <StyledLink to="secured">My Account</StyledLink>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};
export default Header;
