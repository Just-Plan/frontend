export interface IPlace {
  googlePlaceId?: string | null;
  placeId?: number;
  name: string;
  formattedAddress: string;
  types: string;
  latitude: string;
  longitude: string;
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

export interface IPlaceDetailResponse {
  name: string;
  rating: number;
  types: string[];
  photos: {
    height: number;
    width: number;
    photo_reference: string;
    html_attributions: string[];
  }[];
  mbti: string[];
  comment: [];
  user_ratings_total: number;
  formatted_phone_number: string;
  opening_hours: {
    periods: {
      open: {
        day: 0;
        time: string;
      };
      close: {
        day: 0;
        time: string;
      };
    }[];
    open_now: boolean;
    weekday_text: string[];
  };
}
