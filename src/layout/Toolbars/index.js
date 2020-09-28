import React  from 'react';
import './index.css'
function Toolbars() {
    return (
        <div className="toolbars-wrap">
            <div className="toolbars">
                <button>画笔</button>
                <button>矩形框</button>
                <button>圆形</button>
                <button>橡皮擦</button>
            </div>
        </div>
    );
}
export default Toolbars;