const index = {
    API_URL: "https://juanrodriguez.xyz:8091/api",
    //API_URL: "http://192.168.1.23:8000/api",
    LOCAL_STORAGE_TOKEN: "prode_token",
    ROUTES: {
        LOGIN: "/login",
        REGISTER: "/register",
        TOURNAMENTS: "/tournaments",
        TOURNAMENT: "/tournaments/:id",
        HOME: "/",
        CURRENT_GAME_WEEK: "/tournaments/:id/current_game_week",
        GAME_WEEKS: "/tournaments/:id/game_weeks",
        GAME_WEEK: "/tournaments/:tournament_id/game_week/:game_week_id",
        STANDINGS_GAME_WEEK: "/tournaments/:id/standings/game_week",
        STANDINGS: "/tournaments/:id/standings",
        SUCCESS: "/success",
        ADD_GAME_WEEK: "/tournaments/:id/add_game_week",
        ADD_USER_TO_TOURNAMENT: "/tournaments/:id/add_user",
        UPDATE_CURRENT_GAME_WEEK: "/tournaments/:id/update_current_game_week",
        ADD_TOURNAMENT: "/add_tournament",
        RULES: "/rules",
    }
};
export default index