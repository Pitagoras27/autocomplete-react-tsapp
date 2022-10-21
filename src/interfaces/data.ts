export interface Country {
  iso2 ?: string;
  cities ?: string;
  iso3: string;
  country: string;
}

export interface Data {
  data: Country[]
}
