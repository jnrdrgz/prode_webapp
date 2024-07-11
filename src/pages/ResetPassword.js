import React from 'react'
import LayoutWithSidebar from '../components/LayoutWithSidebar'
import TextInput from '../components/forms/TextInput'
import TextareaInput from '../components/forms/TextareaInput'

import Button from '../components/Button';
import { Form, Field } from 'react-final-form'

import axios from 'axios'
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider, } from 'react-query';

import { useNavigate, useParams } from "react-router-dom";
import api from '../api';
import Swal from 'sweetalert2';

export const ResetPassword = (props) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  let { hash_id } = useParams();
  const [submitDisabled, setSubmitDisabled] = React.useState(false);

  const mutation = useMutation((values) => api.resetPassword(values), {
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`data login`, error, variables, context)
      setSubmitDisabled(false)
      Swal.fire({
        icon: 'error',
        title: 'Error al cambiar contraseña',
        text: error,
      })  
    },
    onSuccess: (data, variables, context) => {
      console.log(`data login`, data, variables, context)
      if(data?.error){
        setSubmitDisabled(false)
        console.log("ERROR", data?.error)
        Swal.fire({
          icon: 'error',
          title: 'Error al cambiar contraseña',
          text: data.error,
        }) 
      } else {
        setSubmitDisabled(false)

        navigate("/success")
      }
    },
  })

  const onSubmit = async (values) => {
    console.log('hash_id', hash_id)
    if(values.password !== values.password2){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Las contraseñas no considen",
      })
      return  
    }

    let payload = {
      new_password: values.password,
      user_hash: hash_id
    }
    
    await mutation.mutate(payload)
    //navigate(config.ROUTES.SUCCESS)
  }


	return (
		<LayoutWithSidebar>
		 <div className="flex-1 overflow-y-auto px-0" >
		 	 <Form initialValues={{}} onSubmit={onSubmit}>
          {({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto px-4">
              <div className="w-full mb-3 md:mb-0 py-4">
                <Field name="password" component={TextInput} placeholder={"Contraseña"} />{/*validate={composeValidators(required, email)}*/}
                <Field name="password2" component={TextInput} placeholder={"Repetir Contraseña"} />{/*validate={composeValidators(required, email)}*/}

              </div>
	              <div className="flex flex-wrap mb-3">
	                <Button
	                  className="btn-secondary btn-block "
	                  title={"Resetear"}
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