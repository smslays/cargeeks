import * as React from "react";
import { config } from "../../../api";
import {
  Container,
  Grid,
  Box,
  TextField as TField,
  Avatar,
  Button,
  Divider,
  Paper,
  Card,
  FormControl,
  InputLabel,
  Select as Slect,
  MenuItem,
  SelectChangeEvent,
  Switch,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import User from "../../../shared/models/UserModel";
import { styled } from "@mui/system";
import CountryService from "../../../services/CountryService";
import { string } from "yup";
import UserService from "../../../services/UserService";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../frontend/auth/AuthSlice";
import { errorToast, successToast } from "../../../ui/toasts/Toast";
interface IUserFormProps {
  type: string;
  initialUser?: User;
  role: string;
}
interface CountryType {
  countries: any[];
  states: any[];
  cities: any[];
}

const TextField = styled(TField)`
  background-color: whitesmoke;
`;
const Select = styled(Slect)`
  background-color: whitesmoke;
`;
const UserForm: React.FunctionComponent<IUserFormProps> = ({
  type,
  initialUser,
  role,
}) => {
  const [user, setUser] = React.useState<User>({
    name: {
      first: "",
      last: "",
    },
    mobile: "",
    email: "",
  });
  //get current logged user data
  const loggedUser = useSelector(selectLoggedUser);
  const [editField, setEditField] = React.useState<boolean>(false);
  const [countryState, setCountryState] = React.useState<CountryType>({
    countries: [],
    states: [],
    cities: [],
  });

  const [profilePic, setProfilePic] = React.useState<string>("");

  const loadCountries = async () => {
    const response = await CountryService.getAllCountries();
    if (response?.data) {
      setCountryState((state) => ({ ...state, countries: response.data }));
    }
  };
  const loadStates = async (country: string) => {
    const response = await CountryService.getAllStates(country);
    if (response?.data) {
      setCountryState((state) => ({ ...state, states: response.data }));
    }
  };
  const loadCities = async (country: string, state: string) => {
    const response = await CountryService.getAllCities(country, state);
    if (response?.data) {
      setCountryState((state) => ({ ...state, cities: response.data }));
    }
  };

  const handleEdit = () => {
    setEditField(!editField);
    //     loadCountries();
  };

  const updateUser = (id: string, user: FormData) => {
    UserService.updateUser(id, user)
      .then((response) => {
        successToast("Profile Updated...");
      })
      .catch((err) => {
        console.error(err);
        errorToast("Profile not Updated");
      });
  };
  const addUser = (user: FormData) => {
    UserService.createUser(user)
      .then((response) => {
        const message = response?.data?.message || "User created";
        successToast(message);
      })
      .catch((err) => {
        console.error(err);
        const message = err?.response?.data?.message || "User cant be created";
        errorToast(message);
      });
  };

  const handleUpdateUser = () => {
    const fd = new FormData();
    // append fields to formdata
    if (user?.name?.first) fd.append("name.first", user?.name?.first as string);
    if (user?.name?.last) fd.append("name.last", user?.name?.last as string);
    if (user?.address?.street)
      fd.append("address.street", user?.address?.street as string);
    if (user?.address?.city)
      fd.append("address.city", user?.address?.city as string);
    if (user?.address?.country)
      fd.append("address.country", user?.address?.country as string);
    if (user?.address?.state)
      fd.append("address.state", user?.address?.state as string);
    if (user?.address?.pincode)
      fd.append("address.pincode", user?.address?.pincode as string);
    if (user?.mobile) fd.append("mobile", user?.mobile as string);
    if (user?.email) fd.append("email", user?.email as string);
    if (user?.role) fd.append("role", role as string);
    if (user?.status) fd.append("status", user?.status as string);
    if (user?.pan) fd.append("pan", user?.pan as string);
    if (user?.verified)
      fd.append("verified", user?.verified as unknown as string);
    if (user?.occupation) fd.append("occupation", user?.occupation as string);
    if (user?.password) fd.append("password", user?.password as string);
    if (user?.gender) fd.append("gender", user?.gender as string);
    if (user?.avatar) fd.append("avatar", user?.avatar as string);
    if (user?.dob) fd.append("dob", user?.dob as unknown as string);

    if (type == "profile" || type == "edit") {
      updateUser(user?._id as string, fd);
    } else {
      addUser(fd);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, name: { ...user?.name, [name]: value } });
  };
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, address: { ...user?.address, [name]: value } });
  };
  const handleCountrySelect = (e: SelectChangeEvent<unknown>) => {
    const { name, value } = e.target;
    setUser({ ...user, address: { ...user?.address, [name]: value } });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) setUser({ ...user, avatar: file });

    const reader = new FileReader();
    reader.onload = () => {
      setProfilePic(reader.result as string);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  //loading states based on country selected
  React.useEffect(() => {
    if (user?.address?.country) loadStates(user?.address?.country);
  }, [user?.address?.country]);

  //loading cities based on state selected
  React.useEffect(() => {
    if (user?.address?.state)
      loadCities(user?.address?.country as string, user?.address?.state);
  }, [user?.address?.state]);

  React.useEffect(() => {
    loadCountries();
  }, []);
  React.useEffect(() => {
    if (type != "profile") {
      setEditField(true);
    }
    if (type == "profile") setUser({ ...loggedUser });
    else if (type == "edit") setUser({ ...initialUser });
  }, [initialUser]);

  return (
    <>
      <Container>
        <Paper variant="elevation">
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              {/* avatar */}
              <Card sx={{ backgroundColor: "whitesmoke", margin: 5 }}>
                <Avatar
                  sx={{ width: 250, height: 250, margin: "auto" }}
                  src={
                    profilePic
                      ? profilePic
                      : typeof user?.avatar == "string"
                      ? `${config.serverBaseURL}/${user.avatar}`
                      : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"
                  }
                />
                <label htmlFor="avatar">Upload</label>
                <input
                  style={{ display: "none" }}
                  type="file"
                  accept=".jpg,.png"
                  onChange={handleAvatarChange}
                  id="avatar"
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={8} sx={{ mt: 6, p: 5 }}>
              {/* nested grid container */}
              <Grid container spacing={2} sx={{ pl: 5 }}>
                {type == "profile" && (
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch checked={editField} onChange={handleEdit} />
                      }
                      label="Edit Profile"
                    />
                  </Grid>
                )}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="First name"
                    name="first"
                    InputProps={{
                      readOnly: !editField,
                    }}
                    value={user?.name?.first}
                    onChange={handleNameChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Last name"
                    name="last"
                    InputProps={{
                      readOnly: !editField,
                    }}
                    value={user?.name?.last}
                    onChange={handleNameChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Mobile"
                    name="mobile"
                    value={user?.mobile}
                    InputProps={{
                      readOnly: !editField,
                    }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Email"
                    name="email"
                    InputProps={{
                      readOnly: !editField,
                    }}
                    value={user?.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="PAN"
                    name="pan"
                    InputProps={{
                      readOnly: !editField,
                    }}
                    value={user?.pan}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Occupation"
                    name="occupation"
                    InputProps={{
                      readOnly: !editField,
                    }}
                    value={user?.occupation}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="DOB"
                    type="date"
                    name="dob"
                    InputProps={{
                      readOnly: !editField,
                    }}
                    value={user?.dob}
                    onChange={handleChange}
                  />
                </Grid>

                {type == "add" && (
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      label="Password"
                      name="password"
                      type="password"
                      InputProps={{
                        readOnly: !editField,
                      }}
                      value={user?.password}
                      onChange={handleChange}
                    />
                  </Grid>
                )}

                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="gender">Gender</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="gender"
                      name="gender"
                      value={user?.gender}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Street"
                    name="street"
                    InputProps={{
                      readOnly: !editField,
                    }}
                    value={user?.address?.street}
                    onChange={handleAddressChange}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="country">Country</InputLabel>
                    <Select
                      labelId="country"
                      id="demo-simple-select"
                      value={user?.address?.country}
                      label="Country"
                      name="country"
                      inputProps={{
                        readOnly: !editField,
                      }}
                      onChange={handleCountrySelect}
                    >
                      {Array.isArray(countryState?.countries) &&
                        countryState?.countries.map((country, i) => (
                          <MenuItem
                            key={country.name + i}
                            value={country?.iso2}
                          >
                            {country?.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="state">State</InputLabel>
                    <Select
                      labelId="state"
                      inputProps={{
                        readOnly: !editField,
                      }}
                      name="state"
                      id="demo-simple-select"
                      value={user?.address?.state}
                      label="State"
                      onChange={handleCountrySelect}
                    >
                      {Array.isArray(countryState.states) &&
                        countryState.states.map((state, i) => (
                          <MenuItem key={state.name + i} value={state?.iso2}>
                            {state?.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="city">City</InputLabel>
                    <Select
                      labelId="city"
                      id="demo-simple-select"
                      inputProps={{
                        readOnly: !editField,
                      }}
                      name="city"
                      value={user?.address?.city}
                      label="City"
                      onChange={handleCountrySelect}
                    >
                      {Array.isArray(countryState.cities) &&
                        countryState.cities.map((city, i) => (
                          <MenuItem key={city.name + i} value={city?.name}>
                            {city?.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    InputProps={{
                      readOnly: !editField,
                    }}
                    variant="outlined"
                    label="Pincode"
                    name="pincode"
                    value={user?.address?.pincode}
                    onChange={handleAddressChange}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                      labelId="status"
                      id="demo-simple-select"
                      inputProps={{
                        readOnly: !editField,
                      }}
                      name="status"
                      value={user?.status}
                      label="Status"
                      onChange={(e: SelectChangeEvent<unknown>) =>
                        setUser({ ...user, status: e.target.value as string })
                      }
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    sx={{ mb: 5 }}
                    variant="contained"
                    onClick={handleUpdateUser}
                    disabled={!editField}
                  >
                    {type == "add" ? "Create" : "Update"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default UserForm;
