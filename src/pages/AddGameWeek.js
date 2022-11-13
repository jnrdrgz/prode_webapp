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
import config from '../config';

export const AddGameWeek = (props) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  let { id } = useParams();

  const mutation = useMutation((values) => api.uploadMatchesBulk(values), {
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`data login`, error, variables, context)
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar  prode',
        text: error,
      })  
    },
    onSuccess: (data, variables, context) => {
      console.log(`data login`, data, variables, context)
      if(data?.error){
        console.log("ERROR", data?.error)
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar  prode',
          text: data.error,
        }) 
      } else {
        navigate("/success", { state: {
          successMessage: "La fecha se cargó correctamente.",
          whereToGoBack: config.ROUTES.TOURNAMENT.replace(":id", id),
        }})
      }
    },
  })

  const onSubmit = (values) => {
    console.log("values", values)
    console.log("values.deadline", values.deadline)

    let payload = {
    	game_week_name: values.game_week_name,
    	matches: values.partidos,
    	tournament_id: id,
    	is_current: true,
      game_week_deadline: values.deadline ? values.deadline : null,
    }
   
    mutation.mutate(payload)
    //navigate(config.ROUTES.SUCCESS)
  }

	return (
		<LayoutWithSidebar>
		 <div className="flex-1 overflow-y-auto px-0" >
		 	 <Form initialValues={{}} onSubmit={onSubmit}>
          {({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto px-4">
              <div className="w-full mb-3 md:mb-0">
                <Field name="game_week_name" component={TextInput} placeholder={"Nombre fecha"} />{/*validate={composeValidators(required, email)}*/}
                <Field name="partidos" component={TextareaInput} placeholder={"Partidos"} />{/*validate={composeValidators(required, email)}*/}
                <Field name="deadline" component={TextInput} placeholder={"Deadline"} type="datetime-local"/>{/*validate={composeValidators(required, email)}*/}

              </div>
	              <div className="flex flex-wrap mb-3">
	                <Button
	                  className="btn-secondary btn-block "
	                  title={"Agregar"}
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