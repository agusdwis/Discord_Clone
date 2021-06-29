import axios from "axios";

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const url = "http://0.0.0.0:5000";
export const doRegister = () => {
  return async (dispatch, getState) => {
    const bodyRequest = {
      username: getState().user.username,
      password: getState().user.password,
      email: getState().user.email,
      name: getState().user.name,
    };

    if (
      !getState().user.username ||
      !getState().user.password ||
      !getState().user.email ||
      !getState().user.name
    ) {
      dispatch({
        type: "ERROR_REGISTER",
      });
    }

    const myJSON = JSON.stringify(bodyRequest);

    await axios
      .post(url + "/users/register", myJSON, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
        },
      })
      .then(async (response) => {
        if (response.status === 200) {
          dispatch({
            type: "SUCCESS_REGISTER",
            payload: response.data,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: "ERROR_REGISTER",
        });
      });
  };
};

export const doLogin = () => {
  return async (dispatch, getState) => {
    await dispatch({ type: "ACTIVATE_LAUNCH" });
    await timeout(1000);

    await axios({
      method: "post",
      url: url + "/users/login",
      params: {
        username: getState().user.username,
        password: getState().user.password,
      },
    })
      .then(async (response) => {
        if (response.data.hasOwnProperty("token")) {
          dispatch({
            type: "SUCCESS_LOGIN",
            payload: response.data,
          });

          localStorage.setItem("is_login", true);
          localStorage.setItem("token", response.data.token);
        }
      })
      .catch(function (error) {
        console.log(
          "%c Error! ",
          "background: #ff0033; color: ##0f0f0f; font-weight: 600",
          error
        );
      });
  };
};

export const getProfile = () => {
  return async (dispatch, getState) => {
    let token;
    if (getState().user.token) {
      token = getState().user.token;
    } else {
      token = localStorage.getItem("token");
    }

    await dispatch({ type: "LOADING_SCREEN" });
    await timeout(500);

    await axios({
      method: "get",
      url: url + "/users/info",
      headers: { Authorization: "Bearer " + token },
    })
      .then(async (response) => {
        dispatch({
          type: "SUCCESS_GET_PROFILE",
          payload: response.data,
        });

        localStorage.setItem("avatar", response.data.avatar);
      })
      .catch(function (error) {
        console.log(
          "%c Error! ",
          "background: #ff0033; color: ##0f0f0f; font-weight: 600",
          error
        );
      });
  };
};

export const changeInputUser = (e) => {
  return {
    type: "CHANGE_INPUT_USER",
    payload: e,
  };
};

export const doSignOut = () => {
  return async (dispatch) => {
    dispatch({ type: "SUCCESS_LOGOUT" });
    localStorage.removeItem("is_login");
    localStorage.removeItem("avatar");
    localStorage.removeItem("token");
  };
};
