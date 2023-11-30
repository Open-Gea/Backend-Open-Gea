
export interface WateringNeeds {
    geocode: {
        lat: number,
        lng: number
    },
    language:string
    
  }

export interface Agriculture {
    geocode: {
        lat: number,
        lng: number
    }
    crop?: any,
    soilDepth?: number
    language:string
}

export interface seasonalFInfo {
    products: string
}

export interface seasonalFPoint {
    products: string,
    lat: number,
    lon: number,
    rt: number,
    t: number
}
