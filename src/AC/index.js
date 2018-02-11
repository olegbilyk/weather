import { LOAD_CITY_NOW, SEARCH_TEXT } from '../constants'

export function loadCityNow (city) {
  return {
    type: LOAD_CITY_NOW,
    callAPI: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=20&units=metric&APPID=db6b06579dad6bdce918071f61275e19`
  }
}

export function searchText (text, time) {
  return {
    type: SEARCH_TEXT,
    payload: {text, time},
    generateId: true
  }
}
