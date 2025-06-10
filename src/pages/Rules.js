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
  	   			- El REGLAMENTO del PRODE INTERCONTINENTAL determina las normas a seguir durante el desarrollo de la competencia.

- EL SISTEMA cuenta con tres subcategorías dentro de la categoría “Torneo”: ‘Fecha Actual’, ‘Tabla de Posiciones’ y ‘Tabla por Fecha’.<br/><br/>


- El SISTEMA cuenta con tres subcategorías dentro de la categoría “Torneo”: ‘Fecha Actual’, ‘Tabla de Posiciones’ y ‘Tabla por Fecha’.<br/><br/>


- En ‘Fecha Actual’, los participantes deben cargar sus pronósticos teniendo en cuenta lo siguiente: SE CIERRA A LA HORA PREFIJADA DEL INICIO DE LA FECHA (si Alemania - Escocia está programado para las 16:00, pero arranca a las 16:05, EL SISTEMA toma como plazo límite para enviar los pronósticos las 16:00 horas).
<br/><br/>


- Luego del comienzo del primer partido de la fecha (en su hora prefijada) el SISTEMA no permite cargar el pronóstico de ningún partido.<br/><br/>

- El SISTEMA no permite números de dos cifras, letras, ni ningún símbolo.<br/><br/>


- El SISTEMA no establece ningún límite para pronosticar resultados iguales. (EJ: se puede pronosticar 1-0 en todos los partidos).<br/><br/>


- Dentro de la subcategoría ‘Tabla de Posiciones’, el lugar en la tabla se determina, en primera instancia, por puntos, en segundo lugar, por plenos y en tercer lugar por goles en plenos.<br/><br/>

- El pleno/resultado exacto tiene un valor de tres (3) puntos y acertar ganador/empate un (1) punto. <br/><br/>



- El PRODE INTERCONTINENTAL cuenta con siete (7) instancias para enviar los pronósticos: <br/><br/>

* 1) FECHA 1 EUROCOPA | FECHA 1 COPA AMÉRICA<br/>
* 2) FECHA 2 EUROCOPA<br/>
* 3) FECHA 3 EUROCOPA | FECHA 2 COPA AMÉRICA<br/>
* 4) OCTAVOS EUROCOPA | FECHA 3 COPA AMÉRICA<br/>
* 5) CUARTOS EUROCOPA | CUARTOS COPA AMÉRICA<br/>
* 6) SEMIS EUROCOPA | SEMIS COPA AMÉRICA<br/>
* 7) FINAL EUROCOPA | TERCER Y CUARTO PUESTO + FINAL COPA AMÉRICA<br/>

<br/>
- En el Prode Intercontinental se incluye el alargue en todas sus instancias.

<br/><br/>
  	   		</h2>
		 </div>
		 <Button className="btn-secondary btn-block my-8" title={"Volver"} onClick={() => navigate("/")}/>
		</LayoutWithSidebar>
	)
}
