import React from 'react';
import headerCss from './header.module.css';

const Header = () => {
    return ( 
        <div className={headerCss.headerWrapper}>
            <h3>WeatherMapApp</h3>
        </div> 
    );
}
 
export default Header;