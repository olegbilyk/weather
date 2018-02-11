import React from 'react'
import { render } from 'react-dom'
import Page from './components/Page'
import store from './store/index'
import { Provider } from 'react-redux'

render(<Provider store={store}><Page /></Provider>, document.getElementById('app'))
