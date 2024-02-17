export interface IPlace {
  googlePlaceId?: number | null;
  placeId?: number;
  name: string;
  formattedAddress: string;
  types: string;
  latitude: number;
  longitude: number;
  photoReference: string;
  orderNum?: number;
  memo?: {
    color: string;
    content: string;
  };
}

interface IPlaceRequestInner {
  placeId?: number;
  orderNum?: number;
  memo?: {
    color: string;
    content: string;
  };
}

export interface IDayUpdates {
  [key: string]: IPlaceRequestInner[];
}

export interface IPlaceRequestBody {
  dayUpdates: IDayUpdates;
  placeDeleteIds: number[];
}

export interface IDayPlan {
  [key: string]: IPlace[];
}

export interface IMemo {
  color: string;
  content: string;
}
