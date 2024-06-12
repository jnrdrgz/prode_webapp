import React from 'react'
import LayoutWithSidebar from '../components/LayoutWithSidebar'
import TextInput from '../components/forms/TextInput'
import Button from '../components/Button';
import { Form, Field } from 'react-final-form'

import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";

import config from '../config';
import api from '../api';

import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider, } from 'react-query';
import Swal from 'sweetalert2';

export const AddParticipant = (props) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  let { id } = useParams();
  const usersData = useQuery('users',  () => api.getUsers(id))
  const {users, tournament_users} = usersData?.data ? usersData?.data : {}
  //console.log(api, isLoading, isError, data
  const [update, setUpdate] = React.useState(false)
  //console.log("users", users)
  //const gotoTournament = (tid) => {
  //  navigate("/tournaments/:id".replace(":id", tid))
  //}

  const mutation = useMutation((values) => api.addParticipantToTournament(values.tournament_id, values.user_id), {
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`data login`, error, variables, context)
      Swal.fire({
        icon: 'error',
        title: 'Error al agregar usuario',
        text: error,
      })  
    },
    onSuccess: (data, variables, context) => {
      console.log(`data login`, data, variables, context)
      if(data?.error){
        console.log("ERROR", data?.error)
        Swal.fire({
          icon: 'error',
          title: 'Error al agregar el usuario',
          text: data.error,
        }) 
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Participante agregado',
        }) 
        usersData.refetch()

      } 
    },
  })

  const addParticipantToTournament = (user_id) => {
    mutation.mutate({user_id, tournament_id: id})
    //navigate(config.ROUTES.SUCCESS)
  }

	return (
		<LayoutWithSidebar>
		 <div className="flex-1 overflow-y-auto px-0" >
		 	<h2 className="text-center">Agregar usuarios</h2>
		 	<div className="w-full max-w-lg mx-auto px-4">
		      {usersData.isLoading && <h2>Cargando...</h2>}
		      {!usersData.isLoading && 
		        <>
		          {!usersData.data.length && (users?.length === 0) && <h2>No hay usuarios</h2>}
		          {!!users?.length && users.map((u, i) => {
		          	let tusers = tournament_users.map(t => t.id)
		          	if(tusers.includes(u.id)) {
		          		return(
		          		<div key={"user"+i} className="flex">
			          		<p className="w-3/4 mr-3">{u.created_at} - {u.full_name}</p>
			          		<Button className="btn-secondary btn-block my-2 w-1/4 mr-3" title={"-"} onClick={() => {}}/>
		          		</div>)
		          	}
		          	return(

		          		<div key={"user"+i} className="flex">
		          			<p className="w-3/4 mr-3">{u.created_at} - {u.full_name}</p>
		          			<Button className="btn-secondary btn-block my-2 w-1/4 mr-3" title={"+"} onClick={() => {addParticipantToTournament(u.id)}}/>
		          		</div>)
		          })}
		        </>
		 	}
		 	</div>
		 </div>
		</LayoutWithSidebar>
	)
}
