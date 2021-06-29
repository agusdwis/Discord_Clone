const initialState = {
    username: "",
    name: "",
    password: "",
    email: "",
    avatar:"",
    token: "",
    status: false,
    is_login: false,
    reg_status: false,
    isLaunch: false,
    isLoading: false,

    infos:[],
};

export default function userReducer(userState = initialState, action) {
    switch (action.type) {
        case "CHANGE_INPUT_USER":
            return {
                ...userState,
                [action.payload.target.name]: action.payload.target.value,
            };
        case "SUCCESS_LOGIN":
            return {
                ...userState,
                token: action.payload.token,
                is_login: true,
            };
        case "SUCCESS_GET_PROFILE":
            return {
                ...userState,
                infos: action.payload,
                isLoading: false,
            };
        case "SUCCESS_REGISTER":
            return {
                ...userState,
                infos: action.payload,
                name: action.payload.name,
                username: action.payload.username,
                password: action.payload.password,
                email: action.payload.email,
                status: action.payload.status,
                reg_status: true,
            };
        case "ERROR_REGISTER":
            return {
                ...userState,
                visible: true,
                reg_status: false,
            };
        case "SUCCESS_LOGOUT":
            return {
                ...userState,
                is_login: false,
                isLaunch: false,
            };
        case "ACTIVATE_LAUNCH":
            return {
                ...userState,
                isLaunch: true,
            };
        case "LOADING_SCREEN":
            return {
                ...userState,
                isLoading: true
            };
        default:
            return userState;
    }
}