import React from 'react'
import LayoutWithSidebar from '../components/LayoutWithSidebar'
import NumberInput from '../components/forms/NumberInput'

import Button from '../components/Button';
import { Form, Field } from 'react-final-form'

import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";

import config from '../config';
import api from '../api';
import Swal from 'sweetalert2';

import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider, } from 'react-query';
import { required, getColorScore, requiredAndOnlyNumber } from '../libraries/utils';

const MatchForm = ({match_id, local, visitante, show_input = true}) => {
  //const required = value => (expression => expression && (expression.length > 0 || expression > 0) ? undefined : this.t("This field is required"))
  return (
    <div className="flex" key={"matchform"+match_id}>
      <div className="w-1/3 text-center" >{local}</div>
      <div className="w-1/3">
      {!show_input && <p className="text-center">x-x</p>}
        {show_input && <div className="flex text-center">
          <Field name={`local_partido${match_id}`} component={NumberInput} validate={requiredAndOnlyNumber}/>
          -
          <Field name={`visitante_partido${match_id}`} component={NumberInput} validate={requiredAndOnlyNumber}/>
        </div>}
      </div>

      <div className="w-1/3 justify-items-end text-center">{visitante}</div>
    </div>
  )
}

const Result = ({match_id, local, visitante, rr, ru}) => {
  //const required = value => (expression => expression && (expression.length > 0 || expression > 0) ? undefined : this.t("This field is required"))
  return (
    <div className="flex" key={"result"+match_id}>
      <div className="w-1/3 text-center" >{local}</div>
      <div className="w-1/3">
      <p className={"text-center " + getColorScore(ru, rr)}> {ru} / {rr}</p>
      </div>
      <div className="w-1/3 justify-items-end text-center">{visitante}</div>
    </div>
  )
}

export const CurrentGameWeek = (props) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  let { id } = useParams();
  
  const {isLoading, isError, data} = useQuery(`current_game_week${id}`,  () => api.getCurrentGameWeek(id))
  //console.log(api, isLoading, isError, data)

  const mutation = useMutation((values) => api.uploadProde(values), {
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
          successMessage: "El prode se cargó correctamente.",
          whereToGoBack: config.ROUTES.TOURNAMENT.replace(":id", id),
        }})
      }
    },
  })

  //const gotoTournament = (tid) => {
  //  navigate("/tournaments/:id".replace(":id", tid))
  //}

  const onSubmit = (values) => {
    console.log("values", values)

    let ids = data.matches.map(m => m.id)

    let predictions = ids.map(id => { 
      if(!values["local_partido"+id] || !values["visitante_partido"+id]) return null
      return {
        match_id: id,
        score: `${values["local_partido"+id]}-${values["visitante_partido"+id]}`
      }
    }).filter(p => p !== null)


    console.log("payload", {predictions})
    mutation.mutate({predictions})
    //navigate(config.ROUTES.SUCCESS)
  }

  //console.log("data.game_week && data.matches && !!data.matches.length && !data.predictions?.length")
  //console.log(data?.game_week, data?.matches, !!data?.matches?.length, data?.predictions)
	return (
		<LayoutWithSidebar>
		 <div className="flex-1 overflow-y-auto px-0" >
     <div className="w-full max-w-lg mx-auto px-4">
		 	<h2 className="text-center p-5">Fecha Actual</h2>
      {isLoading && <h2>Cargando...</h2>}
      {!isLoading && !data.matches && <h2 className="text-center p-10">No hay fecha actual</h2>}
      {!isLoading && data.game_week && !data.matches.length && <h2 className="text-center p-5">No hay partidos</h2>}
      {!isLoading && data.game_week && data.game_week.init_time && <h2 className="text-center p-5">Fecha disponible hasta: {data.game_week.init_time.replace("T", " ")}</h2>}
      {!isLoading && data.matches &&
        <>
          <Form initialValues={{}} onSubmit={onSubmit}>
            {({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit} className="w-full mx-auto">
                  {data.matches.map((m, index) => {
                    let local = m.description.split("-")[0]
                    let visitante = m.description.split("-")[1]
                    //console.log("data.predictions", data.predictions)
                    if(data.predictions){
                      let result = data.predictions.find(p => p?.match_id === m?.id)
                      if(result && m.score){
                        return (<Result match_id={m.id} local={local} visitante={visitante} rr={m.score} ru={result.score} />)
                        //return (<div key={"partido"+index} className={getColorScore(result.score, m.score)}>{local} {result.score} / {m.score} {visitante}</div>)
                      }
                      if(result){
                        return (<div key={"partido"+index} className="text-center">{local} {result.score} / {"?-?"} {visitante}</div>)
                      }
                    }
                    if(m.score || !m.is_active || data.game_week.status !== "available"){
                      return(<div key={"partido"+index} className="mb-2"> <MatchForm match_id={m.id} local={local} visitante={visitante} show_input={false}/></div>)                      
                    }

                    return(<div key={"partido"+index} className="mb-2"> <MatchForm match_id={m.id} local={local} visitante={visitante} /></div>)
                  })
                }

                {data.game_week && data.matches && !!data.matches.length && !data.predictions?.length && !!data.matches.filter(m => m.score == null).length && <Button className="btn-secondary btn-block " title={"Guardar"} onClick={handleSubmit} disabled={data.game_week?.status !== "available"}/>}
                
              </form>
            )}
          </Form>
        </>
		 	}
     </div>


     </div>
		<Button className="btn-secondary btn-block my-8" title={"Volver"} onClick={() => navigate(/tournaments/+id)}/>
    </LayoutWithSidebar>
	)
}
