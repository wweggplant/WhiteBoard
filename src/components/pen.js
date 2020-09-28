import React, { useEffect } from 'react'
import usePenState from './usePenState'
import CONST from '../const'

function Pen({ state }) {
  const [penState] = usePenState({state})
  return ""
}
export default Pen