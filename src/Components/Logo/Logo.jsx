import React, { useEffect, useState } from 'react';

import logoImg from '../../Assets/Images/logo-colored-min.png';
import darkLogoImg from '../../Assets/Images/logo-colored-min-light.png';

export default function Logo({width, height}) {

    // ====== check-dark-mode ====== //
    
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {

        const darkMode = document.documentElement.classList.contains('dark');
        setIsDarkMode(darkMode);

        const observer = new MutationObserver(() => {
            const isDark = document.documentElement.classList.contains('dark');
            setIsDarkMode(isDark);
        });

        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();

    }, []);

    return <React.Fragment>

        <img 
            className={`${width} ${height}`} 
            src={isDarkMode ? darkLogoImg : logoImg} 
            alt="eventra logo" 
        />

    </React.Fragment>

}
