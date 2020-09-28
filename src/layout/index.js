import React  from 'react';
import Board from './board'
import Toolbars from './Toolbars'
import useStrategy from '../components/useStrategy'

function Layout({ state }) {
    const [strategy, setStrategy, canvasRef] = useStrategy(state)
    return (
        <div className="layout-container">
            <Board state={state} canvasRef={canvasRef} strategy={strategy}></Board>
            <Toolbars state={state} strategy={strategy} setStrategy={setStrategy}/>
        </div>
    );
}
export default Layout;