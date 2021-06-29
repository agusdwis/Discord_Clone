import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducer/userReducer";
import guildReducer from "./reducer/guildReducer";
import memberReducer from "./reducer/messageReducer";

const rootReducer = combineReducers({
  user: userReducer,
  guild: guildReducer,
  members: memberReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
store.subscribe(() => {
  // console.log('%c Success! ',
  //     'background: #67D868; ' +
  //     'color: #ff0033; ' +
  //     'font-weight: 600',
  //     store.getState());
});
export default store;
