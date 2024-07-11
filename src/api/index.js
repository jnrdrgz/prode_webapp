import config from '../config';

//async function myFetch(...args) {
//  const res = await fetch(...args);
//  return await res.json();
//}

async function getMyTournaments() {
  let token = localStorage.getItem(config.LOCAL_STORAGE_TOKEN)
  var auth = { headers: { "Authorization" : `Bearer ${token}` }};
  const res = await fetch(`${config.API_URL}/tournaments`, auth);
  return await res.json();
}

async function getCurrentGameWeek(tournament_id) {
  let token = localStorage.getItem(config.LOCAL_STORAGE_TOKEN)
  var auth = { headers: { "Authorization" : `Bearer ${token}` }};
  const res = await fetch(`${config.API_URL}/tournaments/${tournament_id}/current_game_week`, auth);
  return await res.json();
}

async function getSpecificGameWeek(tournament_id, game_week_id) {
  let token = localStorage.getItem(config.LOCAL_STORAGE_TOKEN)
  var auth = { headers: { "Authorization" : `Bearer ${token}` }};
  const res = await fetch(`${config.API_URL}/tournaments/${tournament_id}/game_weeks/${game_week_id}`, auth);
  return await res.json();
}

async function getMyTournamentStandings(tournament_id) {
  let token = localStorage.getItem(config.LOCAL_STORAGE_TOKEN)
  var auth = { headers: { "Authorization" : `Bearer ${token}` }};
  const res = await fetch(`${config.API_URL}/tournaments/${tournament_id}/standings`, auth);
  return await res.json();
}

async function getMyTournamentStandingsGameWeek(tournament_id, game_week_id) {
  let token = localStorage.getItem(config.LOCAL_STORAGE_TOKEN)
  var auth = { headers: { "Authorization" : `Bearer ${token}` }};
  const res = await fetch(`${config.API_URL}/tournaments/${tournament_id}/standings/${game_week_id}`, auth);
  return await res.json();
}

async function uploadProde(values) {
  let token = localStorage.getItem(config.LOCAL_STORAGE_TOKEN)
  const res = await fetch(`${config.API_URL}/predictions/bulk`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    },
    body: JSON.stringify(values) 
  });

  return await res.json();
}


async function getTournamentGameWeeks(tournament_id) {
  let token = localStorage.getItem(config.LOCAL_STORAGE_TOKEN)
  var auth = { headers: { "Authorization" : `Bearer ${token}` }};
  const res = await fetch(`${config.API_URL}/tournaments/${tournament_id}/game_weeks`, auth);
  return await res.json();
//  return {game_weeks: [
//    {id:1, name: "Fecha 1"},
//    {id:2, name: "Fecha 2"},
//    {id:3, name: "Fecha 3"},
//    {id:4, name: "Fecha 4"},
//    {id:5, name: "Fecha 5"},
//  ]}
}

async function getUsers(tournament_id) {
  let token = localStorage.getItem(config.LOCAL_STORAGE_TOKEN)
  var auth = { headers: { "Authorization" : `Bearer ${token}` }};
  const res = await fetch(`${config.API_URL}/${tournament_id}/users`, auth);
  return await res.json();
}

async function uploadMatchesBulk(values) {
  let token = localStorage.getItem(config.LOCAL_STORAGE_TOKEN)
  const res = await fetch(`${config.API_URL}/matches/bulk_str`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    },
    body: JSON.stringify(values) 
  });

  return await res.json();
}


async function getGameWeekMatches(game_week_id) {
  let token = localStorage.getItem(config.LOCAL_STORAGE_TOKEN)
  var auth = { headers: { "Authorization" : `Bearer ${token}` }};
  //const res = await fetch(`${config.API_URL}/tournaments/${tournament_id}/standings/${game_week_id}`, auth);
  //return await res.json();
  return {matches: [
    {"score": "1-2", "description": "Bélgica-Japón",},
    {"score": null, "description": "Bélgica-Japón",},
    {"score": null, "description": "Bélgica-Japón",},
    {"score": null, "description": "Bélgica-Japón",},
    {"score": null, "description": "Bélgica-Japón",},
  ]}
}

async function addParticipantToTournament(tournament_id, user_id) {
  let token = localStorage.getItem(config.LOCAL_STORAGE_TOKEN)
  const res = await fetch(`${config.API_URL}/add_user_to_tournament`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    },
    body: JSON.stringify({user_id, tournament_id}) 
  });

  return await res.json();
}

async function addAdminToTournament(tournament_id, user_id) {
  let token = localStorage.getItem(config.LOCAL_STORAGE_TOKEN)
  const res = await fetch(`${config.API_URL}/add_admin_to_tournament`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    },
    body: JSON.stringify({user_id, tournament_id}) 
  });

  return await res.json();
}



async function updateCurrenGameWeekMatches(values) {
  let token = localStorage.getItem(config.LOCAL_STORAGE_TOKEN)
  const res = await fetch(`${config.API_URL}/matches/scores/bulk`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    },
    body: JSON.stringify(values) 
  });

  return await res.json();
}

async function updateGameWeekStatus(values) {
  let token = localStorage.getItem(config.LOCAL_STORAGE_TOKEN)
  const res = await fetch(`${config.API_URL}/game_week/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    },
    body: JSON.stringify(values) 
  });

  return await res.json();
}

async function addTournament(values) {
  let token = localStorage.getItem(config.LOCAL_STORAGE_TOKEN)
  const res = await fetch(`${config.API_URL}/tournaments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    },
    body: JSON.stringify(values) 
  });

  return await res.json();
}

async function resetPassword(values) {
  //let token = localStorage.getItem(config.LOCAL_STORAGE_TOKEN)
  const res = await fetch(`${config.API_URL}/users/reset_password_hash/${values.user_hash}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      //"Authorization" : `Bearer ${token}`
    },
    body: JSON.stringify(values) 
  });

  return await res.json();
}
const api = {
	getMyTournaments,
	getCurrentGameWeek,
  getMyTournamentStandings,
  uploadProde,
  getMyTournamentStandingsGameWeek,
  getTournamentGameWeeks,
  getUsers,
  uploadMatchesBulk,
  getGameWeekMatches,
  addParticipantToTournament,
  updateCurrenGameWeekMatches,
  updateGameWeekStatus,
  addTournament,
  getSpecificGameWeek,
  resetPassword,
}

export default api