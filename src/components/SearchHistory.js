import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import moment from 'moment/moment'

const Div = styled('div')`
  grid-area: SearchHistory;
  width: 300px;

  ol {
    margin: 0;
    padding-left: 0;
    counter-reset: li;

    li {
      font-size: 24px;
      word-wrap: break-word;
      list-style: none;

      ::before {
        content: counter(li, decimal-leading-zero)'.';
        counter-increment: li;
        display: inline-block;
        margin-right: 5px;
      }
    }
  }

  h4 {
    margin: 0;
    font-size: 24px;
    font-weight: 400;
  }
`

function SearchHistory (props) {
  let elements = props.searchHistory.sort((a, b) => (parseInt(moment(a.time).format('x')) < moment(b.time).format('x')) ? 1 : -1)
    .map(item => <li key={item.id}>{item.text}</li>)
  elements.splice(10, elements.length)

  if (!elements.length) {
    return (<Div><h4>History is empty</h4></Div>)
  }

  return (
    <Div>
      <ol>
        {elements}
      </ol>
    </Div>
  )
}

SearchHistory.propTypes = {
  searchHistory: PropTypes.array.isRequired
}

export default SearchHistory
