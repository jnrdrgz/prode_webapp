import React from 'react'
import LayoutWithSidebar from '../components/LayoutWithSidebar'
import TextInput from '../components/forms/TextInput'
import Button from '../components/Button';
import { Form, Field } from 'react-final-form'

import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";

import config from '../config';
import api from '../api';
import useAuth from '../hooks/useAuth'

import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider, } from 'react-query';

export const Tournament = (props) => {
  //const queryClient = useQueryClient()
  //const {isLoading, isError, data} = useQuery('tournaments',  api.getMyTournaments)
  let navigate = useNavigate();
  let { id } = useParams();
	const { user, isLogged } = useAuth();

	React.useEffect(() => {
		if(!isLogged){
			navigate(config.ROUTES.LOGIN)
			return
		}
	}, [])

	return (
		<LayoutWithSidebar>
		 <div className="flex-1 overflow-y-auto px-0" >
		 	<h2 className="text-center">Torneo</h2>
  	   <Button className="btn-secondary btn-block my-2" title={"Fecha actual"} onClick={() => {navigate(config.ROUTES.CURRENT_GAME_WEEK.replace(":id", id))}}/>
  	   <Button className="btn-secondary btn-block my-2" title={"Tabla de posiciones"} onClick={() => {navigate(config.ROUTES.STANDINGS.replace(":id", id))}}/>
  	   <Button className="btn-secondary btn-block my-2" title={"Tabla por fecha"} onClick={() => {navigate(config.ROUTES.STANDINGS_GAME_WEEK.replace(":id", id))}}/>
			 {user?.is_admin && <h2 className="text-center">Admin</h2>}
  	   {user?.is_admin && <Button className="btn-secondary btn-block my-2" title={"Actualizar Fecha"} onClick={() => {navigate(config.ROUTES.UPDATE_CURRENT_GAME_WEEK.replace(":id", id))}}/>}
  	   {user?.is_admin && <Button className="btn-secondary btn-block my-2" title={"Agregar Fecha"} onClick={() => {navigate(config.ROUTES.ADD_GAME_WEEK.replace(":id", id))}}/>}
  	   {user?.is_admin && <Button className="btn-secondary btn-block my-2" title={"Agregar Participante"} onClick={() => {navigate(config.ROUTES.ADD_USER_TO_TOURNAMENT.replace(":id", id))}}/>}
  	   {user?.is_admin && <Button className="btn-secondary btn-block my-2" title={"Finalizar Toreno"} onClick={() => {}}/>}
		 </div>
		</LayoutWithSidebar>
	)
}
