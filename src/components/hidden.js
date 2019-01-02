import React from 'react';
import HiddenCss from './hidden.module.css';

const Hidden = (props) => {
    return ( 
        <div className={HiddenCss.hiddenWrapper}>
            <h2 onClick={props.handleClick}>+ {props.text}</h2>
        </div>
     )
}
 
export default Hidden;