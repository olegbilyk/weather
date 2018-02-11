import { FAIL, LOAD_CITY_NOW, SUCCESS } from '../constants'

export default (users = {
  entities: {
    city: 'city',
    country: 'country',
    weatherList: []
  },
  loading: false,
  loaded: false,
  fail: {
    isFail: false,
    textFail: ''
  }
}, action) => {
  const {type, data, status} = action

  switch (type) {
    case LOAD_CITY_NOW:
      return {...users, loading: true}
    case LOAD_CITY_NOW + SUCCESS:
      if (status === 200) {
        const weatherList = data.list.reduce((acc, cur) => {
          return [...acc, {
            id: cur.dt,
            temp: cur.main.temp,
            weatherId: cur.weather[0].id,
            time: cur.dt_txt
          }]
        }, [])

        const entities = {
          city: data.city.name,
          country: data.city.country,
          weatherList: weatherList
        }

        return {
          ...users, entities, loading: false, loaded: true, fail: {isFail: false}
        }
      } else if ((status === 400) || (status === 404)) {
        return {
          ...users,
          loading: false,
          fail: {
            isFail: true,
            textFail: `${data.message} :(`
          }
        }
      }

      return {...users}
    case LOAD_CITY_NOW + FAIL:
      return {
        ...users,
        loading: false,
        fail: {
          isFail: true,
          textFail: 'Load data fail :('
        }
      }
  }

  return users
}
