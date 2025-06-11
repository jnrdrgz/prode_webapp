import React from 'react'
import LayoutWithSidebar from '../components/LayoutWithSidebar'
import TextInput from '../components/forms/TextInput'
import Button from '../components/Button';
import { Form, Field } from 'react-final-form'

import axios from 'axios'
import { useMutation } from 'react-query'
import { useNavigate, useParams } from "react-router-dom";
import { required } from '../libraries/utils';
import Swal from 'sweetalert2';
import config from '../config';

let doForgot = (values) => {
	let data = {
	    password: values.password,
	    hash: values.hash,
	}

	return axios({
	  method: "post",
	  url: `${config.API_URL}/forgot`,
	  data: data,
	})
}

export const Forgot = (props) => {
	let navigate = useNavigate();
	let { hash } = useParams();
	const mutation = useMutation((values) => doForgot(values), {
	  onError: (error, variables, context) => {
		console.log(`data forgot`, error, variables, context)
		Swal.fire({
			icon: 'error',
			title: 'Error al cambiar la contraseña',
			text: error,
		})
	  },
	  onSuccess: (data, variables, context) => {
	    console.log(`data forgot`, data, variables, context)
	    if(data.data.error){
			console.log("ERROR", data.data.error)
			Swal.fire({
				icon: 'error',
				title: 'Error al cambiar la contraseña',
				text: data.data.error,
			})
	    } else {
	    	console.log("success", data.data)
	        navigate("/success", { state: {
	          successMessage: "La contraseña fue cambiada correctamente.",
	          whereToGoBack: config.ROUTES.LOGIN,
	        }})
	    }
	  },
	})

	let onSubmit = (values) => {
		if(values.password !== values.password2){
			Swal.fire({
				icon: 'error',
				title: 'Error al cambiar la contraseña',
				text: "Las contraseñas no coinciden",
			})
		} else {
			delete values.password2
			mutation.mutate({...values, hash})
		}
	}

	return (
		<LayoutWithSidebar>
		 <div className="flex-1 overflow-y-auto px-0 mt-4" >
		 	 <Form initialValues={{}} onSubmit={onSubmit}>
	          {({ handleSubmit, form, submitting, pristine, values }) => (
	            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto px-4 mt-4">
	              <div className="w-full mb-3 md:mb-0">
	              	<label>Nueva Contraseña</label>
	                <Field name="password" component={TextInput} placeholder={"Password"} type="password" validate={required}/>
	              </div>
	              <div className="w-full mb-3 md:mb-0">
	              	<label>Repetir Contraseña</label>
	                <Field name="password2" component={TextInput} placeholder={"Password"} type="password" validate={required}/>
	              </div>
	              <div className="flex flex-wrap mb-3">
	                <Button
	                  className="btn-secondary btn-block"
	                  title={"Cambiar Contraseña"}
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
