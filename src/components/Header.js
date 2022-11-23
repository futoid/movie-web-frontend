import { Link } from 'react-router-dom';
import { routes } from '../config/Router';
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";

import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else{
          // toast(`Hi ${data.user}`, {
          //   theme: "dark",
          // });
        }
      }
    };
    verifyUser();
    
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  return (
    <>
      <header>
      <nav>
        <div className='logo'>Movito</div>
        <div className='nav-item'>
          <div className='nav-links'>
            {routes.map((route) => {
              if (route.isHeaderElement) {
                return (
                  <li key={route.title}>
                    <Link to={route.path} className='link'>
                      {route.title}
                    </Link>
                  </li>
                );
              }
              else{
                return (<></>)
              }
            })}
          </div>
        </div>
      </nav>
    </header>
      <div className="private">
        <button onClick={logOut}>Log out</button>
      </div>
      {/* <ToastContainer/> */}
    </>
    
  );
};

export default Header;