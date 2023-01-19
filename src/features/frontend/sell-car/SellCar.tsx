import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import {
  Container,
  TextField,
  Card,
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  SelectChangeEvent,
  FormLabel,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";
import PlusIcon from "@mui/icons-material/PlusOne";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { cars, commercial, twoWheelers } from "./data";
import FrontendRoutes from "../../../shared/routes/FrontendRoutes";
import PostService from "../../../services/PostService";
import { errorToast, successToast } from "../../../ui/toasts/Toast";

const RFormControl = styled(FormControl)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

interface IVehicleState {
  brands: string[];
  models: string[];
}
interface IImageState {
  [key: string]: any;
  interiorImages: string[] | any;
  exteriorImages: string[] | any;
}
interface ISellCarProps {}
interface IPost {
  [key: string]: any;
}
const SellCar: React.FunctionComponent<ISellCarProps> = (props) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [post, setPost] = React.useState<IPost>({
    type: "",
    brand: "",
    insurance: {
      expiry: "",
      type: "",
    },
    interiorImages: [],
    exteriorImages: [],
  });

  const resetPost = () => {
    setPost({
      type: "",
      brand: "",
      insurance: {
        expiry: "",
        type: "",
      },
      interiorImages: [],
      exteriorImages: [],
    });
  };

  const [vehicleState, setVehicleState] = React.useState<IVehicleState>({
    brands: [],
    models: [],
  });

  const [imageState, setImageState] = React.useState<IImageState>({
    interiorImages: [],
    exteriorImages: [],
  });

  const handlePostChange = (e: any) => {
    const { name, value } = e.target;
    setPost((p) => ({ ...p, [name]: value }));
  };

  const handleInsuranceChange = (name: string, value: string) => {
    setPost((post) => ({
      ...post,
      insurance: { ...post.insurance, [name]: value },
    }));
  };

  //set brands based on vehicle type
  const filterBrand = (brandArr: any[]) => {
    const arr = brandArr?.map((vehicle) => vehicle.brand);
    setVehicleState((state) => ({ ...state, brands: arr }));
  };

  React.useEffect(() => {
    if (post.type == "twoWheeler") {
      filterBrand(twoWheelers);
    } else if (post.type == "car") {
      filterBrand(cars);
    } else if (post.type == "commercial") {
      filterBrand(commercial);
    } else if (post.type == "moped") {
      filterBrand(twoWheelers);
    }
  }, [post.type]);

  //set brands based on vehicle type

  const filterModel = (vehicleType: string, brand: string) => {
    if (post.type == "twoWheeler") {
      const bikeObj = twoWheelers?.find((bike) => bike.brand == post.brand);
      setVehicleState((state) => ({
        ...state,
        models: bikeObj?.bikes?.model || [],
      }));
    }
    if (post.type == "moped") {
      const bikeObj = twoWheelers?.find((bike) => bike.brand == post.brand);
      setVehicleState((state) => ({
        ...state,
        models: bikeObj?.moped?.model || [],
      }));
    } else if (post.type == "car") {
      const carObj = cars?.find((car) => car.brand == post.brand);
      setVehicleState((state) => ({
        ...state,
        models: carObj?.model?.map((obj) => obj.Model) || [],
      }));
    } else if (post.type == "commercial") {
      const comObj = commercial?.find(
        (commercial) => commercial.brand == post.brand
      );
      let arr: string[] = [];
      if (comObj?.trucks?.model || comObj?.buses?.model)
        arr = [...comObj?.trucks?.model, ...comObj?.buses?.model];
      if (comObj?.pickup?.model) arr = [...arr, ...comObj?.pickup?.model];
      if (comObj?.Vans?.model) arr = [...arr, ...comObj?.Vans?.model];

      setVehicleState((state) => ({
        ...state,
        models: arr,
      }));
    }
  };

  React.useEffect(() => {
    if (post.brand) {
      filterModel(post.type, post.brand);
    }
  }, [post.brand]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files, name } = e.target;
    let fileArr: File[] = [];
    if (name == "interiorImages") fileArr.push(...post?.interiorImages);
    if (name == "exteriorImages") fileArr.push(...post?.exteriorImages);
    if (files)
      for (const file of files) {
        fileArr.push(file);
      }
    setPost((p) => ({ ...p, [name]: fileArr.slice(0, 10) }));
  };

  const convertImagesToBase64 = (name: string, fileArr: File[]) => {
    setImageState((state) => ({ ...state, [name]: [] }));
    const arr: any[] = [];
    for (const file of fileArr) {
      (() => {
        const reader = new FileReader();

        reader.onload = function () {
          if (Array.isArray(arr)) arr.push(reader.result);
          setImageState((state) => ({ ...state, [name]: arr }));
        };
        reader.readAsDataURL(file);
      })();
    }
  };

  React.useEffect(() => {
    convertImagesToBase64("interiorImages", post.interiorImages);
  }, [post.interiorImages]);

  React.useEffect(() => {
    convertImagesToBase64("exteriorImages", post.exteriorImages);
  }, [post.exteriorImages]);

  const AddMoreImage = ({
    name,
    handleChange,
  }: {
    name: string;
    handleChange: any;
  }) => {
    return (
      <>
        <label style={{}} htmlFor={name}>
          <Box
            sx={{
              height: 100,
              width: 50,
              backgroundColor: "#2222",
              fontSize: "1.5 em",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: 1,
              cursor: "pointer",
            }}
          >
            <PlusIcon />
          </Box>
        </label>
        <input
          type="file"
          multiple
          id={name}
          name={name}
          onChange={handleImageChange}
          accept=".png,.jpg,.webp,.svg"
          style={{ display: "none" }}
        />
      </>
    );
  };

  const createPost = () => {
    console.log("Post: ", post);

    const fd = new FormData();
    const props = Object.keys(post);
    for (const p of props) {
      if (p == "insurance") {
        fd.append("insurance.type", post?.insurance?.type);
        fd.append("insurance.expiry", post?.insurance?.expiry);
      } else if (p == "interiorImages") {
        for (const file of post?.interiorImages) {
          fd.append("interiorImages", file);
        }
      } else if (p == "exteriorImages") {
        for (const file of post?.exteriorImages) {
          fd.append("exteriorImages", file);
        }
      }
      fd.append(p, post[p]);
    } //for

    console.log("Form Data: ", fd);
    PostService.createPost(fd)
      .then((response) => {
        successToast("Post Created");
        setActiveStep(0);
        resetPost();
        setImageState({ interiorImages: [], exteriorImages: [] });
      })
      .catch((err) => {
        console.error(err);
        errorToast("Could not Create Post");
      });
  };

  const handleNext = () => {
    if (activeStep == maxSteps - 1) {
      createPost();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = [
    {
      label: "New Post Details",
      body: (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="title"
                label="Post Title"
                onChange={handlePostChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                type="number"
                name="price"
                label="Price"
                onChange={handlePostChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Is Negotiable"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="currentLocation"
                label="Current Location"
                onChange={handlePostChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="type">Vehicle Type</InputLabel>
                  <Select
                    labelId="type"
                    id="type"
                    label="Type"
                    name="type"
                    onChange={handlePostChange}
                  >
                    <MenuItem value="twoWheeler">Two Wheeler</MenuItem>
                    <MenuItem value="moped">Moped</MenuItem>
                    <MenuItem value="car">Car</MenuItem>
                    <MenuItem value="commercial">Commercial</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="brand">Brand</InputLabel>
                  <Select
                    labelId="brand"
                    id="brand"
                    label="Brand"
                    name="brand"
                    onChange={handlePostChange}
                  >
                    {Array.isArray(vehicleState?.brands) &&
                      vehicleState?.brands?.map((brand, i) => (
                        <MenuItem key={brand + i} value={brand}>
                          {brand}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="model">Model</InputLabel>
                  <Select
                    labelId="model"
                    id="model"
                    label="Model"
                    name="model"
                    onChange={handlePostChange}
                  >
                    {Array.isArray(vehicleState?.models) &&
                      vehicleState?.models?.map((model, i) => (
                        <MenuItem key={model + i} value={model}>
                          {model}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="bootSpace"
                type="number"
                label="Boot Space"
                disabled={post?.type != "car"}
                onChange={handlePostChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="groundClearance"
                type="number"
                label="Ground Clearance"
                onChange={handlePostChange}
              />
            </Grid>
          </Grid>
        </>
      ),
    },
    {
      label: "Vehicle Details",
      body: (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="mYear"
                type="month"
                label="Manufactured In "
                onChange={handlePostChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="km"
                type="number"
                label="Total Kms Driven "
                onChange={handlePostChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="mileage"
                type="number"
                label="Mileage "
                onChange={handlePostChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="noOfOwner"
                type="number"
                label="No Of Owners "
                onChange={handlePostChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="fuelType">Fuel Type</InputLabel>
                  <Select
                    labelId="fuelType"
                    id="fuelType"
                    label="fuelType"
                    name="fuelType"
                    onChange={handlePostChange}
                  >
                    <MenuItem value="petrol">Petrol</MenuItem>
                    <MenuItem value="diesel">Diesel</MenuItem>
                    <MenuItem value="cng">CNG</MenuItem>
                    <MenuItem value="ev">EV</MenuItem>
                    <MenuItem value="hybrid">Hybrid</MenuItem>
                    <MenuItem value="ethanol">Ethanol</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="rtoNo"
                label="RTO No"
                onChange={handlePostChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="chassisNo"
                label="Chassis No"
                onChange={handlePostChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="expiry"
                type="date"
                label="Insurance Expiry Date"
                onChange={(e) =>
                  handleInsuranceChange("expiry", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="insuranceType">Insurance Type</InputLabel>
                  <Select
                    labelId="insuranceType"
                    id="insuranceType"
                    label="Insurance Type"
                    name="insuranceType"
                    onChange={(e: SelectChangeEvent) =>
                      handleInsuranceChange("type", e.target.value)
                    }
                  >
                    <MenuItem value="thirdParty">Third Party</MenuItem>
                    <MenuItem value="comprehensive">Comprehensive</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="transmissionType">
                    Transmission Type
                  </InputLabel>
                  <Select
                    labelId="transmissionType"
                    id="transmissionType"
                    label="Transmission Type"
                    name="transmissionType"
                    onChange={handlePostChange}
                  >
                    <MenuItem value="automatic">Automatic</MenuItem>
                    <MenuItem value="axel">Axel</MenuItem>
                    <MenuItem value="belt">Belt</MenuItem>
                    <MenuItem value="chain">Chain</MenuItem>
                    <MenuItem value="manual">Manual</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="airbags"
                type="number"
                label="Total Airbags"
                disabled={post?.type != "car"}
                onChange={handlePostChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="fuelTank"
                type="number"
                label="Fuel Tank"
                onChange={handlePostChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="seatingCapacity"
                type="number"
                label="Seating Capacity"
                onChange={handlePostChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="length"
                type="number"
                label="Length"
                onChange={handlePostChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                name="height"
                type="number"
                label="Height"
                onChange={handlePostChange}
              />
            </Grid>
          </Grid>
        </>
      ),
    },
    {
      label: "Extra Features",
      body: (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <RFormControl>
                <FormLabel id="musicSystem">Music System</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="musicSystem"
                  name="musicSystem"
                  onChange={handlePostChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                    disabled={post?.type == "twoWheeler"}
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label="No"
                    disabled={post?.type == "twoWheeler"}
                  />
                </RadioGroup>
              </RFormControl>
            </Grid>
            <Grid item xs={12}>
              <RFormControl>
                <FormLabel id="orvm">ORVM</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="orvm"
                  name="orvm"
                  onChange={handlePostChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                    disabled={post?.type != "twoWheeler"}
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label="No"
                    disabled={post?.type != "twoWheeler"}
                  />
                </RadioGroup>
              </RFormControl>
            </Grid>
            <Grid item xs={12}>
              <RFormControl>
                <FormLabel id="engineStartStop">
                  Engine Start/Stop Button
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="engineStartStop"
                  name="engineStartStop"
                  onChange={handlePostChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </RFormControl>
            </Grid>
            <Grid item xs={12}>
              <RFormControl>
                <FormLabel id="centralLocking">Central Locking</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="centralLocking"
                  name="centralLocking"
                  onChange={handlePostChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                    disabled={post?.type == "twoWheeler"}
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label="No"
                    disabled={post?.type == "twoWheeler"}
                  />
                </RadioGroup>
              </RFormControl>
            </Grid>
            <Grid item xs={12}>
              <RFormControl>
                <FormLabel id="powerWindow">Power Window</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="centralLocking"
                  name="centralLocking"
                  onChange={handlePostChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                    disabled={post?.type == "twoWheeler"}
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label="No"
                    disabled={post?.type == "twoWheeler"}
                  />
                </RadioGroup>
              </RFormControl>
            </Grid>
            <Grid item xs={12}>
              <RFormControl>
                <FormLabel id="sunroof">SunRoof</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="sunroof"
                  name="sunroof"
                  onChange={handlePostChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                    disabled={post?.type == "twoWheeler"}
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label="No"
                    disabled={post?.type == "twoWheeler"}
                  />
                </RadioGroup>
              </RFormControl>
            </Grid>
            <Grid item xs={12}>
              <RFormControl>
                <FormLabel id="ac">AC</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="ac"
                  name="ac"
                  onChange={handlePostChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                    disabled={post?.type == "twoWheeler"}
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label="No"
                    disabled={post?.type == "twoWheeler"}
                  />
                </RadioGroup>
              </RFormControl>
            </Grid>
            <Grid item xs={12}>
              <RFormControl>
                <FormLabel id="loanStatus">Loan Status</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="loanStatus"
                  name="loanStatus"
                  onChange={handlePostChange}
                >
                  <FormControlLabel
                    value="open"
                    control={<Radio />}
                    label="Open"
                  />
                  <FormControlLabel
                    value="closed"
                    control={<Radio />}
                    label="Closed"
                  />
                </RadioGroup>
              </RFormControl>
            </Grid>
          </Grid>
        </>
      ),
    },
    {
      label: "Images",
      body: (
        <>
          <Paper sx={{ overflow: "auto" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h5
                  style={{
                    margin: 10,
                    marginBottom: 0,
                    textDecoration: "bold",
                  }}
                >
                  Interior Images
                </h5>
              </Grid>

              {post?.interiorImages?.length < 10 && (
                <Grid item xs={12} md={3}>
                  <AddMoreImage
                    name="interiorImages"
                    handleChange={handleImageChange}
                  />
                </Grid>
              )}

              {Array.isArray(imageState?.interiorImages) &&
                imageState.interiorImages?.map((img, i) => {
                  return (
                    <Grid item xs={12} md={3}>
                      <Box sx={{ maxWidth: 100, maxHeight: 100 }}>
                        <img src={img} style={{ width: "100%", height: 100 }} />
                      </Box>
                    </Grid>
                  );
                })}
            </Grid>
            {/* exterior images */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h5
                  style={{
                    margin: 10,
                    marginBottom: 0,
                    textDecoration: "bold",
                  }}
                >
                  Exterior Images
                </h5>
              </Grid>
              {post?.exteriorImages?.length < 10 && (
                <Grid item xs={12} md={3}>
                  <AddMoreImage
                    name="exteriorImages"
                    handleChange={handleImageChange}
                  />
                </Grid>
              )}
              {Array.isArray(imageState?.exteriorImages) &&
                imageState.exteriorImages?.map((img, i) => {
                  return (
                    <Grid item xs={12} md={3}>
                      <Box sx={{ maxWidth: 100, maxHeight: 100 }}>
                        <img src={img} style={{ width: "100%", height: 100 }} />
                      </Box>
                    </Grid>
                  );
                })}
            </Grid>
          </Paper>
        </>
      ),
    },
  ];

  const maxSteps = steps.length;

  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", justifyContent: "center", width: 800 }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Paper
          square
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
            pl: 2,
            bgcolor: "background.default",
            justifyContent: "center",
          }}
        >
          <Typography>{steps[activeStep]?.label}</Typography>
        </Paper>
        <Box sx={{ maxWidth: 700, width: "100%", p: 2, ml: 3 }}>
          <Card variant="elevation" sx={{ padding: 2, height: "100%" }}>
            {steps[activeStep].body}
          </Card>
        </Box>
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              // disabled={activeStep === maxSteps - 1}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    </Container>
  );
};

export default SellCar;
