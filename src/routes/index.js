import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Error from '../pages/Error';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Home } from '../pages/Home';
import { AddParticipant } from '../pages/AddParticipant';
import { AddGameWeek } from '../pages/AddGameWeek';
import { Tournaments } from '../pages/Tournaments';
import { Tournament } from '../pages/Tournament';
import { CurrentGameWeek } from '../pages/CurrentGameWeek';
import { Standings } from '../pages/Standings';
import { StandingsGameWeek } from '../pages/StandingsGameWeek';
import { UpdateCurrentGameWeek } from '../pages/UpdateCurrentGameWeek';
import { AddTournament } from '../pages/AddTournament';
import { Rules } from '../pages/Rules';
import { Friends } from '../pages/Friends';
import { ResetPassword } from '../pages/ResetPassword';

import { Success } from '../pages/Success';
import config from '../config';

export const history = createBrowserHistory();

export const AppRoutes = () => {
  const location = useLocation();
 
  return (
    <Routes>
      <Route path={"/login"} element={<Login/>} />
      <Route path={"/register"} element={<Register/>} />
      <Route path={"/tournaments"} element={<Tournaments/>} />
      <Route path={"/tournaments/:id"} element={<Tournament/>} />
      <Route path={config.ROUTES.CURRENT_GAME_WEEK} element={<CurrentGameWeek/>} />
      <Route path={config.ROUTES.STANDINGS} element={<Standings/>} />
      <Route path={config.ROUTES.STANDINGS_GAME_WEEK} element={<StandingsGameWeek/>} />
      <Route path={config.ROUTES.ADD_GAME_WEEK} element={<AddGameWeek/>} />
      <Route path={config.ROUTES.SUCCESS} element={<Success/>} />
      <Route path={config.ROUTES.ADD_USER_TO_TOURNAMENT} element={<AddParticipant/>} />
      <Route path={config.ROUTES.UPDATE_CURRENT_GAME_WEEK} element={<UpdateCurrentGameWeek/>} />
      <Route path={config.ROUTES.ADD_TOURNAMENT} element={<AddTournament/>} />
      <Route path={config.ROUTES.RULES} element={<Rules/>} />
      <Route path={config.ROUTES.FRIENDS} element={<Friends/>} />
      <Route path={config.ROUTES.RESET_PASS} element={<ResetPassword/>} />

      <Route path={"/"} element={<Home/>} />

      <Route path="*" element={<Error title={'404'} headline={'Page not found!'} button={'Go back'}/>} />
      {/*<Route>
        <Error title={'404'} headline={'Page not found!'} button={'Go back'}/>
      </Route>*/}        
    </Routes>
  );
}