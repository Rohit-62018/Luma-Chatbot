import React, { useEffect, useRef } from "react";
import './header.css';
import { logout, login } from "../../Nhost/nhost";
import logo from '../../assets/luma.png';
import { useUserData, useAuthenticationStatus } from "@nhost/react";
import { useNavigate } from 'react-router-dom';

export default function Navbar({load}) {
    const user = useUserData()
    const isGuest = user?.defaultRole === 'user';
    const navRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        const handleScroll = () => {
            if (!navRef.current) return;
            if (window.scrollY >= 80) {
                navRef.current.classList.add('nav-dark');
            } else {
                navRef.current.classList.remove('nav-dark');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // cleanup
    }, []);

    return (
        <div className={`navbar ${load ? "rgb-border" : ""} `} ref={navRef} >
            <div className="left-div"><img id="lumalogo" src={logo} alt="" /></div>
            <div className="right-div">
                { isGuest ? <div className="profile" >
                    <p id="profile-icon">Rohit</p>
                    <div className="dropdown">
                        <p onClick={()=>{logout().then(()=> window.location.reload())}}>Sign out of luma <i className="fa-solid fa-arrow-right-from-bracket"></i></p>
                    </div>
                </div>:<div className="signup-login" id="profile" >
                            <div className="sign-in" onClick={() =>{logout(); navigate('/login?mode=Sign In')}}>Log in</div>
                            <div className="sign-Up" onClick={() =>{logout(); navigate('/login?mode=Sign Up')}}>Sign up</div>
                        </div>}
            </div>
        </div>
    );
}