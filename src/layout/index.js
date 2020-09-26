import React  from 'react';
import Board from './board'
import Toolbars from './Toolbars'

function Layout() {
    return (
        <div className="layout-container">
            <Board></Board>
            <Toolbars />
        </div>
    );
}
export default Layout;