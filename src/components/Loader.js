import React from 'react'
import styled, { keyframes } from 'react-emotion'

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

const Spinner = styled('div')`
  margin: 10px auto;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  box-sizing: border-box;
  border: 4px solid var(--color-primary-3);
  border-top-color: var(--color-primary-2);
  animation: ${spin} 1s infinite linear;
`

function Loader () {
  return (
    <Spinner />
  )
}

export default Loader
