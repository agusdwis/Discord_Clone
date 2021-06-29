import axios from "axios";

const url = "http://0.0.0.0:5000";
export const postMember = (guildID) => {
  return async (dispatch, getState) => {
    let token;
    if (getState().user.token) {
      token = getState().user.token;
    } else {
      token = localStorage.getItem("token");
    }

    const bodyRequest = {
      guild_id: guildID,
    };

    const myJSON = JSON.stringify(bodyRequest);

    await axios
      .post(url + "/members", myJSON, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
        },
      })
      .then(async (response) => {
        if (response.status === 200) {
          dispatch({
            type: "SUCCESS_POST_MEMBER",
            payload: response.data,
          });
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

export const memberGuild = () => {
  return async (dispatch, getState) => {
    let token;
    if (getState().user.token) {
      token = getState().user.token;
    } else {
      token = localStorage.getItem("token");
    }

    await axios({
      method: "get",
      url: url + "/members",
      headers: { Authorization: "Bearer " + token },
    })
      .then(async (response) => {
        if (response.status === 200) {
          dispatch({
            type: "SUCCESS_GET_MY_GUILDS",
            payload: response.data,
          });
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

export const messageGuild = (guildID) => {
  return async (dispatch, getState) => {
    let token;
    if (getState().user.token) {
      token = getState().user.token;
    } else {
      token = localStorage.getItem("token");
    }

    await axios({
      method: "get",
      url: url + "/messages",
      headers: { Authorization: "Bearer " + token },
      params: {
        guild_id: guildID,
      },
    })
      .then(async (response) => {
        if (response.status === 200) {
          dispatch({
            type: "SUCCESS_GET_MESSAGES",
            payload: response.data,
          });
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

export const postMessage = (channelID) => {
  return async (dispatch, getState) => {
    let token;
    if (getState().user.token) {
      token = getState().user.token;
    } else {
      token = localStorage.getItem("token");
    }

    const bodyRequest = {
      guild_id: channelID,
      content: getState().members.post_message,
    };

    const myJSON = JSON.stringify(bodyRequest);

    await axios
      .post(url + "/messages", myJSON, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
        },
      })
      .then(async (response) => {
        if (response.status === 200) {
          dispatch({
            type: "SUCCESS_POST_MESSAGE",
            payload: response.data,
          });
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

export const changeInputMessage = (e) => {
  return {
    type: "CHANGE_INPUT_MESSAGE",
    payload: e,
  };
};
