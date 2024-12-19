import { React, useEffect, useRef, useState } from 'react'
import '../components/SideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBars, faMessage, faUser, faRightFromBracket, faMagnifyingGlass, faPlus, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils/ToastHandle';
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../utils/store'

function SideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const lightMode = useSelector((state) => state.themeKey);

    const navigate = useNavigate();
    const sidebarRef = useRef(null);

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const menuItem = [
        {
            path: '/home',
            name: "Home",
            icon: <FontAwesomeIcon icon={faHome} />,
        },
        {
            path: '/chats',
            name: "Messages",
            icon: <FontAwesomeIcon icon={faMessage} />,
        },
        {
            path: '/CreateGroup',
            name: "Create Group",
            icon: <FontAwesomeIcon icon={faPlus} />,
        },
        {
            path: '/search',
            name: "Search",
            icon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
        },
        {
            path: '/profile',
            name: "Profile",
            icon: <FontAwesomeIcon icon={faUser} />,
        },
    ]

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

            const result = await response.json();

            const { message, success, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/signin')
                }, 1000)
            }
            else if (error || !success) {
                const details = error.details[0].message;
                handleError(details);
            }
        } catch (err) {
            handleError(err)
        }
    }

    return (
        <div ref={sidebarRef} className={'sideBar' + (lightMode ? '' : ' darkSideBar')} style={{ width: isOpen ? "300px" : "70px" }}>
            <div className="sideBarHeader">
                <div className='bars'>
                    <FontAwesomeIcon icon={faBars} onClick={() => { setIsOpen(!isOpen); }} />
                </div>
                <h1 onClick={() => { navigate('/home'); }}>GupShup</h1>
            </div>
            {
                menuItem.map((item, index) => {
                    return <NavLink to={item.path} key={index} className={({ isActive }) => `${isActive ? (lightMode ? "active" : "darkActive") : "link"}${lightMode ? "" : " darkLink"}`} >
                        <div className="linkIcon">{item.icon}</div>
                        <h2 className="linkName">{item.name}</h2>
                    </NavLink>
                })
            }
            <div onClick={() => { dispatch(toggleTheme()) }} className={"link logoutButton" + (lightMode ? '' : ' darkLink')}>
                <div className="linkIcon"><FontAwesomeIcon icon={(lightMode ? faMoon : faSun)} /></div>
                <h2 className="linkName">Switch Theme</h2>
            </div>
            <button onClick={handleLogout} className={"link logoutButton" + (lightMode ? '' : ' darkLink')}>
                <div className="linkIcon"><FontAwesomeIcon icon={faRightFromBracket} /></div>
                <h2 className="linkName">LogOut</h2>
            </button>
        </div>
    )
}

export default SideBar