import React  from 'react';
import Loader from './Loader';
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth'


export default function LayoutWithSidebar({ main, header, container, loading, children }) {
  let navigate = useNavigate();
  const { user, isLogged } = useAuth();

  //console.log("LayoutWithSidebar", user, isLogged)

  let loggedSideBarRoutes = [
  ]

  let notLoggedSideBarRoutes = [
    {route: "/login", text: "Login", access: null},
    {route: "/register", text: "Armar Equipo", access: "user"},
  ]

  let logout = () => {
     localStorage.removeItem("prode_user");
     localStorage.removeItem("prode_token");
     navigate("/login")
  }

  let closeDrawer = () => {
    document.getElementById('my-drawer-3').checked = false;
  }

  return (
   <div className="drawer">
    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
    <div className="drawer-content flex flex-col">
      <div className="w-full navbar bg-base-300">
        <div className="flex-none lg:hidden">
          <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div> 
        <div className="flex-1 px-2 mx-2 cursor-pointer select-none" onClick={() => {navigate("/")}}>PRODE</div>
        <div className="flex-none hidden lg:block">
          <ul className="menu menu-horizontal">
            {/*<li><div onClick={() => {navigate("/login")}}>Login</div></li>*/}
            {isLogged && <li className="text-center"><div>{`Usuario: ${user?.username}`}</div></li>}
            {!isLogged && <li><div onClick={() => {navigate("/")}}>Inicio</div></li>}
            {!isLogged && <li><div onClick={() => {navigate("/login")}}>Login</div></li>}
            {!isLogged && <li><div onClick={() => {navigate("/register")}}>Register</div></li>}
            {isLogged && <li><div onClick={() => {navigate("/tournaments")}}>Torneos</div></li>}
            {isLogged && <li><div onClick={() => {navigate("/rules")}}>Reglamento</div></li>}
            {isLogged && <li><div onClick={logout}>Logout</div></li>}
          </ul>
        </div>
      </div>
      {children}
    </div> 
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
      <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
        <div className="flex">
        <button onClick={closeDrawer} className="btn btn-ghost w-1/6">X</button>
        </div>
        {isLogged && <li className="text-center mt-4 border-b border-solid border-white border-opacity-20 pb-3 mb-3">{`Usuario: ${user?.username}`} </li>}
        {<li className="flex items-center mt-1 py-1 px-2 rounded-md text-primary-200 opacity-50 opacity-100"><div onClick={() => {navigate("/")}}>Inicio</div></li>}
        {!isLogged && <li className="flex items-center mt-1 py-1 px-2 rounded-md text-primary-200 opacity-50 opacity-100"><div onClick={() => {navigate("/login")}}>Login</div></li>}
        {!isLogged && <li className="flex items-center mt-1 py-1 px-2 rounded-md text-primary-200 opacity-50 opacity-100"><div onClick={() => {navigate("/register")}}>Register</div></li>}
        {isLogged && <li className="flex items-center mt-1 py-1 px-2 rounded-md text-primary-200 opacity-50 opacity-100"><div onClick={() => {navigate("/tournaments")}}>Torneos</div></li>}
        {isLogged && <li className="flex items-center mt-1 py-1 px-2 rounded-md text-primary-200 opacity-50 opacity-100"><div onClick={() => {navigate("/rules")}}>Reglamento</div></li>}
        {isLogged && <li className="flex items-center text-center mt-4 border-t border-solid border-white border-opacity-20 pb-3 mb-3 absolute inset-x-0 bottom-0 "><div onClick={logout}>Logout</div></li>}

      </ul>
      
    </div>
  </div>
  )

 }
