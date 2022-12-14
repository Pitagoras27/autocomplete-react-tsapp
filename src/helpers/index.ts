import { Country } from "../interfaces";

export const generateId = () => {
  const random = Math.random().toString(36);
  const date = Date.now().toString(36);
  const result = random + date
  return result.substring(3, result.length);
}

export const formatData = (data: Country[]) => {
  return data.map(country => {
    delete country.iso2
    delete country.cities

    return country;
  });
}