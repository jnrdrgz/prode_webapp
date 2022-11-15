import React from 'react'
import LayoutWithSidebar from '../components/LayoutWithSidebar'
import TextInput from '../components/forms/TextInput'
import Button from '../components/Button';
import { Form, Field } from 'react-final-form'

import axios from 'axios'
import { useMutation, } from 'react-query'
import { useNavigate } from "react-router-dom";
import {required, capitalizePhrase} from '../libraries/utils';
import Swal from 'sweetalert2';
import config from '../config';

let doRegister = (values) => {
	let data = {
	    username: values.username,
    	password: values.password,
    	full_name: values.full_name,
    	first_name: values.first_name,
    	last_name: values.last_name,
	}

	return axios({
	  method: "post",
	  url: `${config.API_URL}/register`,
	  data: data,
	  //headers: { "Content-Type": "multipart/form-data" },
	})
}

export const Register = (props) => {
	let navigate = useNavigate();
	const mutation = useMutation((values) => doRegister(values), {
	  onError: (error, variables, context) => {
		console.log(`data login`, error, variables, context)
		Swal.fire({
			icon: 'error',
			title: 'Error al registrar usuario',
			text: error,
		})

	  },
	  onSuccess: (data, variables, context) => {
	    console.log(`data login`, data, variables, context)
	    if(data.data.error){
			console.log("ERROR", data.data.error)
			Swal.fire({
				icon: 'error',
				title: 'Error al registrar usuario',
				text: data.data.error,
			})
	    } else {
	    	console.log("success", data.data)
	    	//localStorage.setItem("gdt_token", data.data.access_token)
	        navigate("/success", { state: {
	          successMessage: "El usuario se creó correctamente.",
	          whereToGoBack: config.ROUTES.LOGIN,
	        }})
	    }
	  },
	})

	let onSubmit = (values) => {
		//console.log("values", values)
		if(values.password !== values.password2){
			Swal.fire({
				icon: 'error',
				title: 'Error al registrar usuario',
				text: "Las contraseñas no coinciden",
			})
		} else {
			delete values.password2

			values.first_name = capitalizePhrase(values.first_name)
			values.last_name = capitalizePhrase(values.last_name)

			values.full_name = `${values.first_name[0]}. ${values.last_name}`

			mutation.mutate(values)
		}

	}


	return (
		<LayoutWithSidebar>
		 <div className="flex-1 overflow-y-auto px-0 mt-4" >
		 	 <Form initialValues={{}} onSubmit={onSubmit}>
	          {({ handleSubmit, form, submitting, pristine, values }) => (
	            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto px-4 mt-4">
	              <div className="w-full mb-3 md:mb-0">
	              	<label>Nombre para logearse (el usuario se guarda en minúscula y solo acepta letras, números y _)</label>
	                <Field name="username" component={TextInput} placeholder={"Usuario"} validate={required}/>{/*validate={composeValidators(required, email)}*/}
	              </div>
	              <div className="w-full mb-3 md:mb-0">
	              	<label>Nombre</label>
	                <Field name="first_name" component={TextInput} placeholder={"Nombre"} validate={required}/>{/*validate={composeValidators(required, email)}*/}
	              </div>
	              <div className="w-full mb-3 md:mb-0">
	              	<label>Apellido</label>
	                <Field name="last_name" component={TextInput} placeholder={"Apellido"} validate={required}/>{/*validate={composeValidators(required, email)}*/}
	              </div>
	              <div className="w-full mb-3 md:mb-0">
	              <label>Contraseña</label>
	                <Field name="password" component={TextInput} placeholder={"Password"} type="password" validate={required}/>
	              </div>
	              <div className="w-full mb-3 md:mb-0">
	              <label>Repetir Contraseña</label>
	                <Field name="password2" component={TextInput} placeholder={"Password"} type="password" validate={required}/>
	              </div>
	              <div className="flex flex-wrap mb-3">
	                
	                <Button
	                  className="btn-secondary btn-block "
	                  title={"Registrarse"}
	                  onClick={handleSubmit}
	                  disabled={mutation.isLoading}
	                />
	              </div>
	            </form>
	          )}
	        </Form>
		 </div>
		</LayoutWithSidebar>
	)
}