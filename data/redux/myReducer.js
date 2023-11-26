/*
reducer is a function with ((case test))
that return an object to be dispatched

the action sends the case format as an object to the reducer
*/

const CITY_CHANGED = 'CITY_CHANGED';

const initialState = {
    CITY: 'Doha',
  };

export const myReducer = (state = initialState, action) => {
    switch (action.type) {
      case CITY_CHANGED:
        console.log('city changed in reducer to= '+action.payload)
        return {
          CITY: action.payload,
        };
      default:
        return state;
    }
  };