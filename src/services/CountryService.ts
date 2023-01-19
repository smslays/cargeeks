import { countryAPI } from "../api";
class CountryService {
  static getAllCountries() {
    return countryAPI.get("/countries");
  }
  static getAllStates(country: string) {
    return countryAPI.get(`/countries/${country}/states`);
  }
  static getAllCities(country: string, state: string) {
    return countryAPI.get(`/countries/${country}/states/${state}/cities`);
  }
  static async getCountry(code: string) {
    const country = await countryAPI.get(`/countries/${code}`);
    return country;
  }
  static async getState(country: string, state: string, code: string) {
    const countryObj = await countryAPI.get(
      `/countries/${country}/states/${state}`
    );
    return countryObj;
  }
}
export default CountryService;
