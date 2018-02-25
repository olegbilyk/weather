import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { injectGlobal, keyframes } from 'react-emotion'
import { connect } from 'react-redux'
import { loadCityNow, searchText } from '../AC/index'
import Loader from './Loader'
import Days from './Days'
import Search from './Search'
import SearchHistory from './SearchHistory'

injectGlobal`
  :root {
    --color-default: #434345;
    --color-danger: #e50a0a;
    --color-white: #fff;
    --color-primary: #9b9b9b;
    --color-primary-2: #6534ff;
    --color-primary-3: #62bcfa;
    --color-primary-4: #212121;
    --color-border: #c2c2c2;
    --color-border-hover: #949494;
    --font: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  body {
    margin: 0;
  }
`

const fadeBoth = keyframes`
  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
`

const Content = styled('div')`
  padding-bottom: 50px;
  font-size: 16px;
  line-height: 1.6;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  color: var(--color-default);
`

const Header = styled('header')`
  position: relative;
  padding-top: 30px;
  padding-bottom: 30px;
  color: var(--color-white);
  background: var(--color-primary-2) linear-gradient(90deg, var(--color-primary-3) 0%, var(--color-primary-2) 100%);

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: ${fadeBoth} 6s infinite;
    background: var(--color-primary-2) linear-gradient(270deg, var(--color-primary-3) 0%, var(--color-primary-2) 100%);
  }

  > * {
    position: relative;
    z-index: 1;
  }

  h1 {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 40px;
    font-weight: 400;
    line-height: 1.4;
    text-align: center;
  }

  @media (min-width: 800px) {
    padding-top: 50px;
    padding-bottom: 50px;

    h1 {
      font-size: 60px;
    }
  }
`

const Body = styled('main')`
  display: grid;
  grid-template-areas: "Search" "Days" "SearchHistory";
  grid-gap: 30px;
  padding: 30px;

  @media (min-width: 800px) {
    grid-template-areas: "Search Search Search Search Search" "Days Days Days Days SearchHistory";
    grid-template-columns: [Search] 1fr [Days] auto [SearchHistory] 300px;
    grid-gap: 30px;
  }
`

const DaysWrap = styled('div')`
  grid-area: Days;
`

const H3 = styled('h3')`
  margin-top: 0;
  font-size: 24px;
  font-weight: 400;
  text-transform: capitalize;
  color: var(--color-danger);
`

class Page extends Component {
  componentDidMount () {
    const {data, loadCityNow} = this.props
    if (!data.loading && !data.loaded) loadCityNow('Kiev')
  }

  getBody () {
    const {data} = this.props
    if (data.loading) return <Loader />
    if (data.fail.isFail) return <DaysWrap><H3>{data.fail.textFail}</H3></DaysWrap>

    return (
      <Days data={data.entities} />
    )
  }

  render () {
    const {loadCityNow, searchText, searchHistory} = this.props

    return (
      <Content>
        <Header>
          <h1>
            Weather
          </h1>
        </Header>
        <Body>
          <Search loadCityNow={loadCityNow} searchText={searchText} />
          <DaysWrap>
            {this.getBody()}
          </DaysWrap>
          <SearchHistory searchHistory={searchHistory} />
        </Body>
      </Content>
    )
  }
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
  searchHistory: PropTypes.array.isRequired,
  loadCityNow: PropTypes.func.isRequired,
  searchText: PropTypes.func.isRequired
}

export default connect(state => ({
  data: state.data,
  searchHistory: state.searchHistory
}), {loadCityNow, searchText})(Page)
