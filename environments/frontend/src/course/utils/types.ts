export interface Geometry {
  location: Location
}

export interface GoogleReponse {
  results: Results[]
  status: 'OK' | 'ZERO_RESULTS'
}

export interface Location {
  lat: number
  lng: number
}

export interface Results {
  geometry: Geometry
}
