import * as React from "react";
import {
  Toast,
  errorToast,
  successToast,
  warningToast,
  promiseToast,
} from "../../../ui/toasts/Toast";
import FAQ from "./FAQ";
import Footer from "./Footer";
import WhyBuy from "./WhyBuy";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <>
      <>
        <section style={{ width: "100%", padding: "0px 40px" }}>
          <img src="cargeek.jpg" style={{ width: "100%",height:"538px" }} />
        </section>
      </>
      <WhyBuy />
      <FAQ />
      <Footer />
    </>
  );
};

export default Home;
