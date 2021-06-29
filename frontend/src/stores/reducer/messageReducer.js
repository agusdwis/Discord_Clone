const initialState = {
    myGuilds: [],
    messages: [],
    post_message:"",
    updateMessages: false,
    updateMyGuild: false,
};

export default function memberReducer(messageState = initialState, action) {
    switch (action.type) {
        case "SUCCESS_GET_MY_GUILDS":
            return {
                ...messageState,
                myGuilds: action.payload,
                updateMyGuild: false
            };
        case "SUCCESS_POST_MEMBER":
            return {
                ...messageState,
                updateMyGuild: true
            };
        case "SUCCESS_GET_MESSAGES":
            return {
                ...messageState,
                messages: action.payload,
                updateMessages: false,
            };
        case "SUCCESS_POST_MESSAGE":
            return {
                ...messageState,
                updateMessages: true,
            };
        case "CHANGE_INPUT_MESSAGE":
            return {
                ...messageState,
                [action.payload.target.name]: action.payload.target.value,
            };
        default:
            return messageState;
    }
}

