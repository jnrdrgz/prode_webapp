import React from 'react'
import LayoutWithSidebar from '../components/LayoutWithSidebar'
import TextInput from '../components/forms/TextInput'
import Button from '../components/Button';
import { Form, Field } from 'react-final-form'

import axios from 'axios'
import { useMutation, } from 'react-query'
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../assets/images/logo.png';
import config from '../config';

export const Success = (props) => {
	const navigate = useNavigate()
	const {state} = useLocation();
	return (
		 <div className="flex-1 overflow-y-auto px-0">
		 	<img src={logo} className="m-auto"></img>
		 	<h2 className="text-center">{state?.successMessage ? state?.successMessage : "OK"}</h2>
  	   		<Button className="btn-secondary btn-block my-2" title={"Volver"} onClick={() => {navigate(state?.whereToGoBack ? state.whereToGoBack : config.ROUTES.HOME)}}/>
		 </div>
		
	)
}