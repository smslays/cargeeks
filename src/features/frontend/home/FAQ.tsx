import * as React from "react";
import { styled, Card, Grid, Box } from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
interface IFAQProps {}

const FAQ: React.FunctionComponent<IFAQProps> = (props) => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <>
      <Grid container spacing={2} sx={{ p: 4 }}>
        <Grid sx={{ mb: 1, mt: 1, ml: 3 }} item xs={12}>
          <h3>FREQUENTLY ASKED QUESTIONS</h3>
        </Grid>
        <Grid sx={{ p: 3, pt: 0, ml: 3 }} item xs={12}>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>So how can I buy a car on CarGeeks?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                - If you've ever bought clothes or groceries online, you already
                know how this works!
                <br />
                - It's simple. Start by browsing the huge variety of cars listed
                here. Use our Car Finder to help you narrow it down as per the
                style, brand or colour of your choice.
                <br />
                - When you find that perfect car, you can check out its
                features, see the pictures, and look at the car from every angle
                with the 360 view.
                <br />- Now go ahead and book a test drive by paying a
                refundable deposit. And now, you and the car meet.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography>
                There are so many cars listed here. Are they all in good
                condition?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                - Absolutely! Before each car is even listed, it goes through a
                rigorous evaluation process - so you can be sure you're buying a
                second-hand car in as good a condition as it can be in.
                <br />
                - Every car undergoes a thorough inspection - 140 checkpoint
                quality tests need to be passed, and refurbished accordingly by
                our experts.
                <br />
                - We also dig deep, checking the RTO background, service
                history, outstanding finance, blacklisting and yes, even history
                of theft (we've thought of everything, trust us).
                <br />
                - If any car doesn’t tick each and every one of our boxes, we
                won’t even list it for sale. We’re picky like that.
                <br />- But if the car is good to go after all this, it gets a
                CarGeeks certification and goes up for sale! So never fear,
                CarGeeks has given the all-clear.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography>Are your prices negotiable? Can I haggle?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                -You will not feel the need to negotiate at all.
                <br />
                -You’ll see, all the prices are reasonable and competitive,
                assigned by experts after taking multiple factors into
                consideration. And remember - CarGeeks brings with it several
                other benefits - a comprehensive 12-month warranty, free RC
                transfer, free home delivery, zero cancellation or return
                charges, and an unbeatable 7 day easy return policy. <br />
                -Trust us, we’ve thought of everything needed while buying a
                second-hand car and you’ll find the experience and benefit worth
                the amount you pay! In some circumstances, there may be some
                additional charges that arise in the ownership transfer process
                but that is dictated entirely by the RTO.
                <br />- For the car itself, the CarGeeks listed price is great,
                and what you see is what you pay.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography>
                I see that you provide a warranty. How does that work?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                We don't want you to be worrying about unforeseen repair or
                maintenance costs when you should be thinking about showing off
                your car. Even though our detailed inspection and reconditioning
                ensures that the vehicle is in great condition, every car comes
                with a free twelve month warranty covering key parts of your
                vehicle.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </>
  );
};

export default FAQ;
