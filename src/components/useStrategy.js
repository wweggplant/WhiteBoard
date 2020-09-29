import { useEffect, useCallback, useState} from 'react'
import { strategyFactory } from "./PenStrategy";
import CONST from '../const'

const PENSTATE = {
  state: CONST.NORMAL,
  motion: CONST.MOTION_NOONE,
  penCanvasData: {
    lineWidth: 5,
    lineColor: 'black',
    fillStyle: 'black',
    strokeStyle: 'black',
    lineCap: 'round',
  }
}
let strategy
let ctx

// 全局的命令,类似redux
const actionList = {
  changeStrategy(pen){
    Object.assign(PENSTATE, pen)
    strategy = strategyFactory(ctx, PENSTATE)
    return strategy
  },
  getStrategy() {
    return strategy
  },
  setCanvasCtx(context) {
    ctx = context
  },
  setCanvasCtxData(data) {
    Object.assign(PENSTATE.penCanvasData, data)
  },
  getCanvasCtxData() {
    return PENSTATE.penCanvasData
  }
}


function useStrategy({state}) {
  const commit = useCallback((actionToken, payload)=>{
    actionList[actionToken](payload)
  },[])

  const getStrategy = function() {
    return commit('getStrategy')
  }
  useEffect(() => {
    if (ctx) {
      commit('changeStrategy', state)
    }
  }, [commit, state])
  return [getStrategy, commit]
}

export default useStrategy