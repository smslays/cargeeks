import {
  Container,
  Grid,
  FormControl,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  Stack,
  styled,
  Paper,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import PostService from "../../../services/PostService";
import PostCatalog from "./PostCatalog";
interface IBuyUsedProps {}

const Item = styled(Paper)({
  backgroundColor: "whitesmoke",
  padding: 2,
  textAlign: "center",
  color: "grey",
  cursor: "pointer",
});

interface IInitialFilterData {
  brand: string[];
  fuelType: string[];
}
interface IAllPosts {
  [key: string]: any;
}
const BuyUsed: React.FunctionComponent<IBuyUsedProps> = (props) => {
  const [initialFilterData, setInitialFilterData] =
    React.useState<IInitialFilterData>();

  const [allPosts, setAllPosts] = React.useState<IAllPosts>();
  const [filterState, setFilterState] = React.useState({
    brand: "",
    fuelType: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const handleChange = (e: SelectChangeEvent ) => {
    const { name, value } = e.target;
    setFilterState((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = e.target;
    setFilterState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const loadPosts = async () => {
    const response = await PostService.fetchAllPosts();
    if (response?.data) setAllPosts(response?.data);
  };

  const loadFilterDetails = async () => {
    const response = await PostService.getFilterDetails();
    if (response?.data) setInitialFilterData(response?.data?.data);
  };
  React.useEffect(() => {
    loadPosts();
    loadFilterDetails();
  }, []);
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
            <OutlinedInput
              id="standard-adornment-amount"
              type="search"
              placeholder="Find Your Dream Car With Us "
              startAdornment={
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        {/* //end of search bar */}
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <Item>
              <FormControl fullWidth>
                <InputLabel id="brand">Brand</InputLabel>
                <Select
                  labelId="brand"
                  id="brand"
                  name="brand"
                  label="Brand"
                  onChange={handleChange}
                >
                  {Array.isArray(initialFilterData?.brand) &&
                    initialFilterData?.brand.map((brand, i) => (
                      <MenuItem value={brand + i}>{brand}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Item>
            <Item>
              <FormControl fullWidth>
                <InputLabel id="fuelType">Fuel Type</InputLabel>
                <Select
                  labelId="fuelType"
                  id="fuelType"
                  name="fuelType"
                  label="Fuel Type"
                  onChange={handleChange}
                >
                  {Array.isArray(initialFilterData?.fuelType) &&
                    initialFilterData?.fuelType.map((fuelType, i) => (
                      <MenuItem value={fuelType } key={fuelType + i}>{fuelType}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Item>
            <Item>
              <TextField
                label="Min. Price"
                type="number"
                name="minPrice"
                onChange={handlePriceChange}
              />
            </Item>
            <Item>
              <TextField
                label="Max. Price"
                type="number"
                name="maxPrice"
                onChange={handlePriceChange}
              />
            </Item>
          </Stack>
        </Grid>
      </Grid>
      <hr />
      <PostCatalog posts={allPosts} />
    </Container>
  );
};

export default BuyUsed;
