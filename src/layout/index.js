import React  from 'react';
import Board from './board'
import Toolbars from './Toolbars'

function Layout({ state }) {
    return (
        <div className="layout-container">
            <Board state={state}></Board>
            <Toolbars state={state}/>
        </div>
    );
}
export default Layout;