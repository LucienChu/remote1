import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
// replace with root reducer if there are more than one reducers
import loginReducer from "./store/reducers/loginReducer";
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  loginState: loginReducer,
});
debugger;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
