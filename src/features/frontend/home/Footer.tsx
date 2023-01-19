import * as React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { styled } from "@mui/material";
import { Link, NavLink as NLink } from "react-router-dom";
interface IFooterProps {}
const NavLink = styled(NLink)`
  text-decoration: none;
  margin-right: 5px;
`;
const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return (
    <MDBFooter
      className="text-center text-white "
      style={{ backgroundColor: "#1976d2" }}
    >
      <MDBContainer className="p-4 pb-0" style={{ marginBottom: 0 }}>
        <section className="mb-4">
          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="facebook-f" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="twitter" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="google" />
          </MDBBtn>
          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="instagram" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="linkedin-in" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="github" />
          </MDBBtn>
        </section>
        <section>
          <p className="d-flex justify-content-center align-items-center">
            <span className="me-3">Register here for latest updates !</span>
            <MDBBtn type="button" outline color="light" rounded>
              <NavLink
                to="/register"
                style={({ isActive }) => ({
                  color: isActive ? "#DEDEDE" : "white",
                })}
              >
                Sign Up
              </NavLink>
            </MDBBtn>
          </p>
        </section>
      </MDBContainer>

      <div className="text-center pb-3" style={{ backgroundColor: "#1976d2" }}>
        © 2023 Copyright:
        <a className="text-white" href="http://localhost:3000/">
          www.cargeeks.com
        </a>
      </div>
    </MDBFooter>
  );
};

export default Footer;
