import {createStore, applyMiddleware, compose} from 'redux'
import reducer from '../reducer/index'
import api from '../middlewares/api'
import randomId from '../middlewares/randomId'

const enhancer = compose(
  applyMiddleware(api, randomId)
)

const store = createStore(reducer, {}, enhancer)

export default store
