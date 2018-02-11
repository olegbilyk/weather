import { SEARCH_TEXT } from '../constants'

export default (history = [], action) => {
  const {type, payload, randomId} = action

  switch (type) {
    case SEARCH_TEXT:
      return [...history, {
        id: randomId,
        time: payload.time,
        text: payload.text
      }]
  }

  return history
}
