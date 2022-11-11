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

export const Standings = (props) => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	let { id } = useParams();
	
	const {isLoading, isError, data} = useQuery(`tournament_standings${id}`,  () => api.getMyTournamentStandings(id))
	//console.log("__data", isLoading, isError, data)
	//{data.standings.map(s => s.participante)}
	
	return (
		<LayoutWithSidebar>
		 <div className="flex-1 overflow-y-auto px-0" >
		 	<h1 className="text-center">TABLA</h1>
 	      {isLoading && <h2>Cargando...</h2>}
    		{!isLoading && data.standings && <>
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
					      {/*<tr>
					        <th>1</th> 
					        <td>Cy Ganderton</td> 
					        <td>Quality Control Specialist</td> 
					        <td>Littel, Schaden and Vandervort</td> 
					        <td>Canada</td> 
					      </tr>*/}
					      	{data.standings.map((s, index) => {
					      		let c = index === 0 ? "bg-lime-600" : ""
					      		return (
					      			<tr key={"part"+index} >
						      			<th className={c}>{index+1}</th>
					      				<th className={c}>{s.participante}</th>
					      				<th className={c}>{s.puntos}</th>
					      				<th className={c}>{s.plenos}</th>
					      				<th className={c}>{s.goles}</th>
					      			</tr>
					      		)	
					      	})}
					    </tbody> 
					  </table>
					</div>
    		</>}

    		
		 </div>
		 <Button className="btn-secondary btn-block mt-16" title={"Volver"} onClick={() => navigate(/tournaments/+id)}/>
		</LayoutWithSidebar>
	)
}

