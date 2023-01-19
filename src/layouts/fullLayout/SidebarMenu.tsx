import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink as NLink, Link, useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import routes from "../../shared/routes/AdminRoutes";
import { styled } from "@mui/material";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../features/frontend/auth/AuthSlice";

const NavLink = styled(NLink)`
  text-decoration: none;
  margin-right: 5px;
`;

interface ISidebarMenuProps {}

const SidebarMenu: React.FunctionComponent<ISidebarMenuProps> = (props) => {
  const loggedUser = useSelector(selectLoggedUser);
  return (
    <>
      <List>
        {Array.isArray(routes) &&
          routes
            .filter(
              (route) =>
                route.showInMenu && route?.roles?.includes(loggedUser?.role)
            )
            .map(({ path, icon, label}, index) => (
              <ListItem
                key={label + index}
                disablePadding
                sx={{ display: "block" }}
              >
                <NavLink
                  end
                  key={path + index}
                  to={path}
                  style={({ isActive }) => ({
                    color: isActive ? "black" : "grey",
                  })}
                >
                  <ListItemButton sx={{ minHeight: 48, px: 2.5 }}>
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 1,
                        justifyContent: "center",
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={label} />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            ))}
      </List>
    </>
  );
};

export default SidebarMenu;
