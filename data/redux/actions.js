const CITY_CHANGED = 'CITY_CHANGED';

export const change_city = (city) => {
    console.log('action started, city = '+ city);
    return({
    type: CITY_CHANGED,
    payload: city,
  })};