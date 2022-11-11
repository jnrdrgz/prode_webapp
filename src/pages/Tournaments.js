import React from 'react'
import LayoutWithSidebar from '../components/LayoutWithSidebar'
import TextInput from '../components/forms/TextInput'
import Button from '../components/Button';
import { Form, Field } from 'react-final-form'

import axios from 'axios'
import { useNavigate } from "react-router-dom";

import config from '../config';
import api from '../api';

import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider, } from 'react-query';
import useAuth from '../hooks/useAuth'

export const Tournaments = (props) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {isLoading, isError, data} = useQuery('tournaments',  api.getMyTournaments)
  //console.log(api, isLoading, isError, data)

  const { user, isLogged } = useAuth();

  const gotoTournament = (tid) => {
    navigate("/tournaments/:id".replace(":id", tid))
  }

	return (
		<LayoutWithSidebar>
		 <div className="flex-1 overflow-y-auto px-0" >
		 	<h2 className="text-center">Torneos</h2>
      {isLoading && <h2>Cargando...</h2>}
      {!isLoading && 
        <>
          {!data.length && (data.length === 0) && <h2 className="text-center mb-2">No estás participando de ningún torneo</h2>}
          {!!data.length && data.map((t, i) => <Button key={"butt"+i} className="btn-secondary btn-block my-2" title={t.name} onClick={() => {gotoTournament(t.id)}}/>)}
         {user.is_admin && <Button className="btn-primary btn-block my-2" title={"+Agregar Toreno"} onClick={() => {navigate("/add_tournament")}}/>}

        </>
		 	}
		 </div>
		</LayoutWithSidebar>
	)
}
