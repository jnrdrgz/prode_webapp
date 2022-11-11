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
export const Rules = (props) => {
	let navigate = useNavigate();
	const { user, isLogged } = useAuth();

	return (
		<LayoutWithSidebar>
		 <div className="flex-1 overflow-y-auto px-0">
		 	<img src={logo} className="m-auto h-24"></img>
  	   		<h2 className="text-center">
  	   			Reglamento
  	   		</h2>
  	   		<h2 className="px-4 text-justify">
  	   			REGLAMENTO

  	   		</h2>
		 </div>
		 <Button className="btn-secondary btn-block my-8" title={"Volver"} onClick={() => navigate("/")}/>
		</LayoutWithSidebar>
	)
}