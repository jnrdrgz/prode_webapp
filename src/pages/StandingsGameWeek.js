import React from 'react'
import LayoutWithSidebar from '../components/LayoutWithSidebar'
import TextInput from '../components/forms/TextInput'
import Button from '../components/Button';
import { Form, Field } from 'react-final-form'

import axios from 'axios'
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider, } from 'react-query';
import { useNavigate, useParams } from "react-router-dom";
import config from '../config';
import api from '../api';
import {getColorScore} from '../libraries/utils';
import useAuth from '../hooks/useAuth'

export const StandingsGameWeek = (props) => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	let { id } = useParams();

	const { user, isLogged } = useAuth();
	React.useEffect(() => {
		if(!isLogged){
			navigate(config.ROUTES.LOGIN)
			return
		}
	}, [])

	//let fechas = [1,2,3,4]
	const fechasQuery = useQuery('game_weeks_names',  () => api.getTournamentGameWeeks(id))

	const fechas = fechasQuery?.data
	let [gameWeekId, setGameWeekId] = React.useState(0)
	const {isLoading, isError, data, refetch } = useQuery(
		{ 
			queryKey: [`tournament_week_standings${gameWeekId}`, fechas], 
			queryFn: () => api.getMyTournamentStandingsGameWeek(id, gameWeekId ? gameWeekId : fechas[0].id),
			enabled: !!fechas
		})




	React.useEffect(() => {
	   refetch()
	}, [gameWeekId]);

	const show_all_participants = data?.game_weeks?.length ? data?.game_weeks.find(gw => gw.id === (gameWeekId ? gameWeekId : fechas[0].id)).status !== "available" : null

	return (
		<LayoutWithSidebar>
		 <div className="flex-1 overflow-y-auto px-0" >
		 	<h1 className="text-center">Tabla Fecha</h1>
		 	{!fechasQuery.isLoading && fechas && <div className="py-8"><select name="fecha" className="select w-full max-w-s " value={gameWeekId} onChange={(e) => {setGameWeekId(e.target.value);}}>
			    {fechas.map((f, i) => <option key={"op"+i} value={f.id}>{f.name}</option>)} 
			</select></div>}
			{!fechasQuery.isLoading && !fechas.length && <h2 className="text-center">No hay fechas</h2>}
 	      {isLoading && <h2>Cargando...</h2>}
    		{!isLoading && data?.standings && <>
					<div className="overflow-x-auto">
					  <table className="table table-compact w-full">
					    <thead>
					      <tr>
					        <th></th> 
					        <th>Participantes</th> 
					        <th>Puntos</th> 
					        <th>Plenos</th> 
					        <th>Goles</th> 
					      </tr>
					    </thead> 
					    <tbody>
					      	{data.standings.map((s, index) => {
					      		return (
					      			<tr key={"part"+index}>
						      			<th>{index+1}</th>
					      				<th>{s.participante}</th>
					      				<th>{s.puntos}</th>
					      				<th>{s.plenos}</th>
					      				<th>{s.goles}</th>
					      			</tr>
					      		)	
					      	})}
					    </tbody> 
					  </table>
					</div>
    		</>}
    		{!isLoading && data?.matches && <>
	    		<div className="">
				  <table className="table table-compact w-full">
				    <thead>
				      <tr>
				        <th></th> 
				        {data.matches.map((m,index) => <th key={"mtch"+index}>{m.short}</th> )}				        
				      </tr>
				    </thead> 
				    <tbody>
				    	<tr key={"prdcttt"}>
				    	<th>Reales</th>
				    	{data.matches.map((m, index) => <th  key={"realmatch"+index}>{m.score}</th>)}
				    	</tr>
				    </tbody> 
				  </table>
				</div>
			</>}
		 
    		{!isLoading && data?.matches && show_all_participants && <>
	    		<div className="">
				  <table className="table table-compact w-full">
				    <thead className="sticky top-0">
				      <tr >
				        <th></th> 
				        {data.matches.map((m,index) => <th key={"mtch"+index}>{m.short}</th> )}				        
				      </tr>
				    </thead> 
				    <tbody>
				    	{data.predictions.map((prediction, index) => {return(
				    		<tr key={"prdct"+index}>
									<th>{prediction.participante}</th>
									{data.matches.map((m, index) => <th key={"prdctprdct"+index} className={getColorScore(prediction.predictions[m.short], m.score)}>{prediction.predictions[m.short] ? prediction.predictions[m.short] : "x-x"}</th>)}
								</tr>
				    	)})}
				    </tbody> 
				  </table>
				</div>
			</>}
		 </div>

		 <Button className="btn-secondary btn-block" title={"Volver"} onClick={() => navigate(/tournaments/+id)}/>
		</LayoutWithSidebar>
	)
}

