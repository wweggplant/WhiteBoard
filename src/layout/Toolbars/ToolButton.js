import React  from 'react';
import {useStore} from "../../store";

function useBtnClass (sts) {
  const { status } = useStore('event')
  return `btn ${status === sts ? 'active': ''}`
}
function ToolButton(props) {
  return (
    <div className={useBtnClass(props.status)} onClick={props.onClick} title={props.title}>
      <span className="btn-img">
        {props.children}
      </span>
    </div>
  )
}

export default ToolButton