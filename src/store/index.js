import {applyMiddleware, compose, createStore} from "redux";
import reducers from "./index-reducer";
import {routerMiddleware} from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./index-saga";

const history = createHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routeMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  const store = createStore(reducers, initialState,
    composeEnhancers(applyMiddleware(...middlewares)));

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./index-reducer', () => {
      const nextRootReducer = require('./index-reducer');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
export {history};
