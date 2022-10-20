import { Country } from "./data";

export interface PredictibleSelector {
  data: Country[]
  text: string,
  suggestions: string[]
}