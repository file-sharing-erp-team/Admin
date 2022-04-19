import React from 'react';

const Navbar:React.FC = () => {
    return (
        <nav>
            <div className="nav-wrapper indigo accent-1 px1">
                <a href={"/about"} className="brand-logo">Ecosystem</a>
                <ul className="right hide-on-med-and-down">
                    <li><a href="/">Пользователи</a></li>
                    <li><a href="/">Группы</a></li>
                    <li><a href="/">Курсы</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar
