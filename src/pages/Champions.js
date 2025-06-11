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
import useAuth from '../hooks/useAuth'

export const Champions = (props) => {
	const navigate = useNavigate()
	const champions = [
		{
			"tournament": "Prode Mundial Qatar",
			"year": "2022",
			"champion": "G. Filgueira",
		},
		{
			"tournament": "Prode Intercontinental",
			"year": "2024",
			"champion": "B. Correa",
		},
		{
			"tournament": "Prode Champions League",
			"year": "2025",
			"champion": "P. Arana",
		},
	]
	return (
		<LayoutWithSidebar>
		 <div className="flex-1 overflow-y-auto px-0" >
		 	<h1 className="text-center">TABLA</h1>
 	      
    		<>
				<div className="overflow-x-auto">
				  <table className="table table-compact w-full">
				    <thead>
				      <tr>
				        <th></th> 
				        <th>Torneo</th> 
				        <th>Año</th> 
				        <th>Campeón</th> 
				      </tr>
				    </thead> 
				    <tbody>
				      	{champions.map((ch, index) => {
				      		let c = index === 0 ? "" : ""
				      		return (
				      			<tr key={"part"+index} >
					      			<th className={c}></th>
				      				<th className={c}>{ch.tournament}</th>
				      				<th className={c}>{ch.year}</th>
				      				<th className={c}>{ch.champion}</th>
				      			</tr>
				      		)	
				      	})}
				    </tbody> 
				  </table>
				</div>
    		</>

    		
		 </div>
		 <Button className="btn-secondary btn-block mt-16" title={"Volver"} onClick={() => navigate("/")}/>
		</LayoutWithSidebar>
	)
}

