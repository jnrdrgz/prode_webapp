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
import { required, getColorScore } from '../libraries/utils';

const MatchForm = ({match_id, local, visitante, show_input = true}) => {
  //const required = value => (expression => expression && (expression.length > 0 || expression > 0) ? undefined : this.t("This field is required"))
  return (
    <div className="flex" key={"matchform"+match_id}>
      <div className="w-1/3 text-center" >{local}</div>
      <div className="w-1/3">
      {!show_input && <p className="text-center">x-x</p>}
        {show_input && <div className="flex text-center">
          <Field name={`local_partido${match_id}`} component={NumberInput} validate={required}/>
          -
          <Field name={`visitante_partido${match_id}`} component={NumberInput} validate={required}/>
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

export const UpdateCurrentGameWeek = (props) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  let { id } = useParams();
  const fechasQuery = useQuery('game_weeks_names',  () => api.getTournamentGameWeeks(id))

  const fechas = fechasQuery?.data
  let [gameWeekId, setGameWeekId] = React.useState(0)
  const {isLoading, isError, data, refetch } = useQuery(
    { 
      queryKey: ['game_week_for_update', fechas], 
      queryFn: () => api.getSpecificGameWeek(id, gameWeekId ? gameWeekId : fechas[0].id),
      enabled: !!fechas
    })

  React.useEffect(() => {
     refetch()
  }, [gameWeekId]);

  const mutation = useMutation((values) => api.updateCurrenGameWeekMatches(values), {
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
        navigate("/success")
      }
    },
  })

  const mutationGameWeek = useMutation((values) => api.updateGameWeekStatus(values), {
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
        navigate("/success")
      }
    },
  })



  //const gotoTournament = (tid) => {
  //  navigate("/tournaments/:id".replace(":id", tid))
  //}

  const onSubmit = (values) => {
    console.log("values", values)

    let ids = data.matches.map(m => m.id)

    let scores = ids.map(id => { 
      if(!values["local_partido"+id] || !values["visitante_partido"+id]) return null
      if(values["local_partido"+id]==="x" || values["visitante_partido"+id]==="x") return null
      return {
        match_id: id,
        score: `${values["local_partido"+id]}-${values["visitante_partido"+id]}`
      }
    }).filter(p => p !== null)


    console.log("payload", {scores})
    mutation.mutate({scores})
    //navigate(config.ROUTES.SUCCESS)
  }

  const onEndGameWeek = () => {
    mutationGameWeek.mutate({
      game_week_id: gameWeekId ? gameWeekId : data.game_week.id,
      status: "finished",
      current: false,
    })
  }

  const onCloseGameWeek = () => {
    mutationGameWeek.mutate({
      game_week_id: gameWeekId ? gameWeekId : data.game_week.id,
      status: "waiting",
      current: true,
    })
  }

  const onOpenGameWeek = () => {
    mutationGameWeek.mutate({
      game_week_id: gameWeekId ? gameWeekId : data.game_week.id,
      status: "available",
      current: true,
    })
  }

  const getInitialValues = (matches) => {
    let invalues = {}
    matches.forEach(match => {
      if(!match.score){
        invalues[`local_partido${match.id}`] = "x"
        invalues[`visitante_partido${match.id}`] = "x"
        return 
      }
      let sc = match.score.split("-")

      invalues[`local_partido${match.id}`] = sc[0]
      invalues[`visitante_partido${match.id}`] = sc[1]
    })

    return invalues
  }

  //console.log("data.game_week && data.matches && !!data.matches.length && !data.predictions?.length")
  //console.log(data?.game_week, data?.matches, !!data?.matches?.length, data?.predictions)
	return (
		<LayoutWithSidebar>
		 <div className="flex-1 overflow-y-auto px-0" >
     <div className="w-full max-w-lg mx-auto px-4">
		 	<h2 className="text-center p-5">Fecha Actual</h2>
      {!fechasQuery.isLoading && fechas && fechas?.length && <><select name="fecha" className="select w-full max-w-xs" value={gameWeekId} onChange={(e) => {setGameWeekId(e.target.value);}}>
          {fechas.map((f, i) => <option key={"op"+i} value={f.id}>{f.name}</option>)} 
      </select></>}
      {isLoading && <h2>Cargando...</h2>}
      {!isLoading && !data?.matches && <h2 className="text-center p-10">No hay fecha actual</h2>}
      {!isLoading && data?.game_week && !data?.matches.length && <h2 className="text-center p-5">No hay partidos</h2>}
      {!isLoading && data?.matches &&
        <>
          <Form initialValues= { getInitialValues(data.matches) } onSubmit={onSubmit}>
            {({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit} className="w-full mx-auto">
                  {data.matches.map((m, index) => {
                    let local = m.description.split("-")[0]
                    let visitante = m.description.split("-")[1]
                    //console.log("data.predictions", data.predictions)

                    //m.score
                    return(<div key={"partido"+index} className="mb-2"> <MatchForm match_id={m.id} local={local} visitante={visitante} match={m}/></div>)
                  })
                }

                {data.game_week && data.matches && !!data.matches.length && <Button className="btn-secondary btn-block " title={"Guardar"} onClick={handleSubmit} />}
                
              </form>
            )}
          </Form>
        </>
		 	}

      <Button className="btn-secondary btn-block mt-4" title={"Abrir"} onClick={onOpenGameWeek} disabled={!data?.game_week || data?.game_week?.status === "available"}/>
      <Button className="btn-secondary btn-block mt-2" title={"Cerrar"} onClick={onCloseGameWeek} disabled={!data?.game_week || data?.game_week?.status === "waiting"}/>
      <Button className="btn-secondary btn-block my-2" title={"Finalizar"} onClick={onEndGameWeek} disabled={!data?.game_week || data?.game_week?.status === "finished"}/>
     </div>
     </div>
		</LayoutWithSidebar>
	)
}
