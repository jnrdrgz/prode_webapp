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
import leologo from '../assets/images/friends/leoind.jpeg';
import useAuth from '../hooks/useAuth'

//<h2 className="text-center">HOME</h2>
export const Friends = (props) => {
	let navigate = useNavigate();
	const { user, isLogged } = useAuth();

	return (
		<LayoutWithSidebar>
		 <div className="flex-1 overflow-y-auto px-0">
		 	<p className="text-center">Acompañan al prode:</p>
		 	<img src={logo} className="m-auto"></img>
		 	<img src={leologo} className="m-auto"></img>

		 </div>
		</LayoutWithSidebar>
	)
}