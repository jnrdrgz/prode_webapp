import React from 'react'
import LayoutWithSidebar from '../components/LayoutWithSidebar'
import TextInput from '../components/forms/TextInput'
import Button from '../components/Button';
import { Form, Field } from 'react-final-form'

import axios from 'axios'
import { useMutation, } from 'react-query'
import { useNavigate,  } from "react-router-dom";

import config from '../config';

import logo from '../assets/images/logo.png';
import useAuth from '../hooks/useAuth'

//<h2 className="text-center">HOME</h2>
export const Home = (props) => {
	let navigate = useNavigate();
	const { user, isLogged } = useAuth();

	return (
		<LayoutWithSidebar>
		 <div className="flex-1 overflow-y-auto px-0">
		 	<img src={logo} className="m-auto"></img>
  	   		{isLogged && <Button className="btn-secondary btn-block my-2" title={"Torneos"} onClick={() => {navigate(config.ROUTES.TOURNAMENTS)}}/>}
  	   		{isLogged && <Button className="btn-secondary btn-block my-2" title={"Reglamento"} onClick={() => {navigate(config.ROUTES.RULES)}}/>}
  	   		{!isLogged && <Button className="btn-secondary btn-block my-2" title={"Login"} onClick={() => {navigate(config.ROUTES.LOGIN)}}/>}
  	   		{!isLogged && <Button className="btn-secondary btn-block my-2" title={"Registrarse"} onClick={() => {navigate(config.ROUTES.REGISTER)}}/>}
		 </div>
		</LayoutWithSidebar>
	)
}