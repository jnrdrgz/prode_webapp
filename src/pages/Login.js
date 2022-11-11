import React from 'react'
import LayoutWithSidebar from '../components/LayoutWithSidebar'
import TextInput from '../components/forms/TextInput'
import Button from '../components/Button';
import { Form, Field } from 'react-final-form'

import axios from 'axios'
import { useMutation, } from 'react-query'
import { useNavigate } from "react-router-dom";
import api from '../api';
import Swal from 'sweetalert2';
import config from '../config';
import {required} from '../libraries/utils';

let doLogin = (values) => {
	var formData = new FormData();

	formData.append('username', values.username);
	formData.append('password', values.password);

	return axios({
	  method: "post",
	  url: `${config.API_URL}/login/access-token`,
	  data: formData,
	  headers: { "Content-Type": "multipart/form-data" },
	})
}

export const Login = (props) => {
	let navigate = useNavigate();
	const mutation = useMutation((values) => doLogin(values), {
	  onError: (error, variables, context) => {
	    // An error happened!
	    console.log(`data login`, error, variables, context)
			Swal.fire({
				icon: 'error',
				title: 'Error al entrar',
				text: error,
			})
	  },
	  onSuccess: (data, variables, context) => {
	    console.log(`data login`, data, variables, context)
	    if(data.data.error){
	    	console.log("ERROR", data.data.error)
  			Swal.fire({
					icon: 'error',
					title: 'Error al entrar',
					text: data.data.error,
				})
	    } else {
	    	console.log("success", data.data)
	    	localStorage.setItem("prode_token", data.data.access_token)
		    localStorage.setItem("prode_user", JSON.stringify(data.data.user))
	    	navigate("/")
	    }
	  },
	})

	let onSubmit = (values) => {
		console.log("values", values)
		mutation.mutate(values)
	}


	return (
		<LayoutWithSidebar>
		 <div className="flex-1 overflow-y-auto px-0 mt-4" >
		 	 <Form initialValues={{}} onSubmit={onSubmit}>
	          {({ handleSubmit, form, submitting, pristine, values }) => (
	            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto px-4">
	              <div className="w-full mb-3 md:mb-0">
	              <label>Usuario</label>
	                <Field name="username" component={TextInput} placeholder={"Nombre de usuario"} type="text"  validate={required}/>{/*validate={composeValidators(required, email)}*/}
	              </div>
	              <div className="w-full mb-3 md:mb-0">
	              <label>Contraseña</label>
	                <Field name="password" component={TextInput} placeholder={"Contraseña"} type="password"  validate={required}
	                  //showPassword={this.state.showPassword}
	                  //clickPassword={this.onPasswordClick}
	                  //validate={required}
	                />
	              </div>
	              <div className="flex flex-wrap mb-3">
	                <Button
	                  className="btn-link ml-auto mb-10 text-primary-content text-sm"
	                  title={"Registrarse"}
	                  onClick={()=>{navigate("/register")}}
	                  //onClick={this.onForgotPassword}
	                />
	                <Button
	                  className="btn-secondary btn-block "
	                  title={"Entrar"}
	                  onClick={handleSubmit}
	                  //disabled={this.state.submitting}
	                />
	              </div>
	            </form>
	          )}
	        </Form>
		 </div>
		</LayoutWithSidebar>
	)
}


