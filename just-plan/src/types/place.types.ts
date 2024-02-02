export interface IPlace {
  googlePlaceId: number | null,
  name: string,
  formattedAddress: string,
  types: string,
  latitude: number,
  longitude: number,
  photoReference: string,
  order?: number,
  memo?: {
    color: string,
    text: string,
  }
}