import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reduxBlockUI from 'react-block-ui/reduxMiddleware';
import { reducer as formReducer } from 'redux-form';

import contactsReducer from '../reducers/contactsReducer';
import distanceReducer from '../reducers/distanceReducer';
import dialogsReducer from '../reducers/dialogsReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
const store = createStore(
    combineReducers({
        form: formReducer,
        contacts: contactsReducer,
        distance: distanceReducer,
        dialogs: dialogsReducer,
    }),
    undefined,
    composeEnhancers(
        applyMiddleware(ReduxThunk, reduxBlockUI)
    )
);
  
export default store;
