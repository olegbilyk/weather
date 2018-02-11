import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import moment from 'moment'

const Ul = styled('ul')`
  display: grid;
  grid-gap: 20px 30px;
  margin-top: 0;
  padding-left: 0;
  grid-template-columns: repeat(auto-fill, 240px);
  list-style: none;

  li {
    time {
      display: inline-block;
      margin-right: 15px;
      font-size: 20px;
      font-weight: 400;

      small {
        font-size: 0.6em;
        color: var(--color-primary);
      }
    }

    i {
      display: inline-block;
      margin-right: 15px;
      font-size: 34px;
      color: var(--color-primary-3);
    }

    p {
      display: inline-block;
      margin: 0;
      color: var(--color-primary-2);

      span {
        font-size: 1.2em;
      }
    }
  }
`

class Day extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  getTemp (temp) {
    temp = Math.round(temp)

    if (Math.sign(temp) >= 0) return `+${temp}`
    else return temp
  }

  getIcon (id, weatherTime) {
    const time = parseInt(moment(weatherTime).format('H'))
    const isDay = (time > 6 && time < 21) ? 'day-' : 'night-'

    return <i className={`wi wi-owm-${isDay}${id}`} />
  }

  render () {
    const elements = this.props.data.weatherList.map(item => {
      return (
        <li key={item.id}>
          <time dateTime={item.time}>{moment(item.time).format('HH:mm')}<small> / {moment(item.time).format('D MMM')}</small></time>
          {this.getIcon(item.weatherId, item.time)}
          <p>&#8451; <span>{this.getTemp(item.temp)}</span></p>
        </li>
      )
    })

    return (
      <Ul>
        {elements}
      </Ul>
    )
  }
}

export default Day
