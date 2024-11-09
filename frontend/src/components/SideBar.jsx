import { React, useEffect, useRef, useState } from 'react'
import '../components/SideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faBars, faMessage, faUser, faRightFromBracket, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils/ToastHandle';

function SideBar() {
    const [isOpen, setIsOpen] = useState(false);
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

    const toggle = () => { setIsOpen(!isOpen) };
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
            const response = await fetch('http://localhost:8080/auth/logout', {
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

    const sendHome = () => {
        navigate('/home')
    }

    return (
        <div ref={sidebarRef} className='sideBar' style={{ width: isOpen ? "300px" : "70px" }}>
            <div className="sideBarHeader">
                <div className='bars'>
                    <FontAwesomeIcon icon={faBars} onClick={toggle} />
                </div>
                <h1 onClick={sendHome}>GupShup</h1>
            </div>
            {
                menuItem.map((item, index) => {
                    return <NavLink to={item.path} key={index} className={({ isActive }) => isActive ? "active" : "link"} >
                        <div className="linkIcon">{item.icon}</div>
                        <h2 className="linkName">{item.name}</h2>
                    </NavLink>
                })
            }
            <button onClick={handleLogout} className="link logoutButton">
                <div className="linkIcon"><FontAwesomeIcon icon={faRightFromBracket} /></div>
                <h2 className="linkName">LogOut</h2>
            </button>
        </div>
    )
}

export default SideBar