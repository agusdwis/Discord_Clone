const initialState = {
    listGuilds: [],
    oneGuild: [],
    listMember: [],
    isLoading: false,
    search:"",
};

export default function guildReducer(guildState = initialState, action) {
    switch (action.type) {
        case "SUCCESS_GET_MEMBER_LIST":
            return {
                ...guildState,
                listMember: action.payload,
            };
        case "SUCCESS_GET_ALL_GUILDS":
            return {
                ...guildState,
                listGuilds: action.payload,
                isLoading: false,
            };

        case "SUCCESS_GET_ONE_GUILD":
            return {
                ...guildState,
                oneGuild: action.payload,
            };
        case "SUCCESS_GET_CATEGORY":
            return {
                ...guildState,
                listGuilds: action.payload,
                isLoading: false,
            };
        case "SUCCESS_GET_SEARCH":
            return {
                ...guildState,
                listGuilds: action.payload,
                isLoading: false,
            };
        case "CHANGE_INPUT_SEARCH":
            return {
                ...guildState,
                [action.payload.target.name]: action.payload.target.value,
            };
        case "LOADING_SCREEN":
            return {
                ...guildState,
                isLoading: true
            };
        default:
            return guildState;
    }
}

