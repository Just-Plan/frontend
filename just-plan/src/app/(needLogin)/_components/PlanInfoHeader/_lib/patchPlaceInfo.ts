import { IPlaceRequestBody } from "@/types/place.types";

export const patchPlaceInfo = async (planId: number, body:IPlaceRequestBody) => {

  const res = await fetch(`http://13.125.188.226:8080/api/place/update/planId/${planId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QG5hdmVyLmNvbSIsImlhdCI6MTcwNzIyNTg3MSwiZXhwIjoxNzA3MjMzMDcxfQ.5s6cr37bedvDXx6pzjDRTlMZtV3ANRUPjEG1bmNNbq4`,
    },
    // body: JSON.stringify({...newBody, dayUpdates: newDayUpdates})
    body: JSON.stringify(body)

  });
  return res.json();
}