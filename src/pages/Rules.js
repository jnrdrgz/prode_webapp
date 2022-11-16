import React from 'react'
import LayoutWithSidebar from '../components/LayoutWithSidebar'
import TextInput from '../components/forms/TextInput'
import Button from '../components/Button';
import { Form, Field } from 'react-final-form'

import axios from 'axios'
import { useMutation, } from 'react-query'
import { useNavigate,  } from "react-router-dom";

import config from '../config';

import logo from '../assets/images/logo.png';
import useAuth from '../hooks/useAuth'

//<h2 className="text-center">HOME</h2>
export const Rules = (props) => {
	let navigate = useNavigate();
	const { user, isLogged } = useAuth();

	return (
		<LayoutWithSidebar>
		 <div className="flex-1 overflow-y-auto px-0">
		 	<img src={logo} className="m-auto h-24"></img>
  	   		<h2 className="text-center">
  	   			Reglamento
  	   		</h2>
  	   		<h2 className="px-4 text-center text-justify">
  	   			- EL SISTEMA del Prode del Mundial de Qatar 2022 (PMQ22) determina las reglas a seguir durante el desarrollo de la competencia.<br/><br/>
- EL SISTEMA cuenta con tres subcategorías, dentro de la categoría “Torneo”: ‘Fecha Actual’, ‘Tabla de Posiciones’ y ‘Tabla por Fecha’.<br/><br/>
- En ‘Fecha Actual’, los participantes deben cargar sus pronósticos teniendo en cuenta lo siguiente: SE CIERRA A LA HORA PREFIJADA DEL INICIO DEL PARTIDO (si Qatar – Ecuador está programado para las 13:00 horas, pero arranca a las 13:05, EL SISTEMA toma como plazo límite para enviar los pronósticos las 13:00 horas).<br/><br/>
- Luego del comienzo del primer partido de la fecha (en su hora prefijada) EL SISTEMA no permite cargar el pronóstico de ningún partido.<br/><br/>
- EL SISTEMA no permite tener más de siete (7) resultados iguales durante la fase de grupos. (1-0 y 0-1) no se considera lo mismo.<br/><br/>
- EL SISTEMA no permite números de dos cifras, letras, ni ningún símbolo.<br/><br/>
- Dentro de la subcategoría ‘Tabla de Posiciones’, el lugar en la tabla se determina, en primera instancia, por puntos, en segundo lugar, por plenos y en tercer lugar por goles en plenos.<br/><br/>
- El pleno/resultado exacto tiene un valor de tres (3) puntos y acertar ganador/empate un (1) punto.<br/><br/>
- PMQ 22 cuenta con siete instancias para enviar los pronósticos: fase de grupos (1), (2) y (3), octavos de final (4), cuartos de final (5), semifinales (6) y partido por el tercer y cuarto puesto + FINAL (7).<br/><br/>
  	   		</h2>
		 </div>
		 <Button className="btn-secondary btn-block my-8" title={"Volver"} onClick={() => navigate("/")}/>
		</LayoutWithSidebar>
	)
}