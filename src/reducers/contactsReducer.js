import * as types from '../constants/types';
import RequestStates from '../util/request-states';

const initialState = {
    contacts: [],
    requestState: RequestStates.init,
    contactsError: null,
};
  
export default function contacts(state = initialState, action) {
    switch (action.type) {
        case types.GET_ALL_CONTACTS_SUCCESS:
            return {
                ...state,
                contacts: action.payload.contacts,
                requestState: RequestStates.success,
                contactsError: null,
            };    
        case types.GET_ALL_CONTACTS_LOADING:
            return {
                ...state,
                contacts: [],
                requestState:  RequestStates.loading,
                contactsError: null,
            };
        case types.GET_ALL_CONTACTS_FAILURE:
            return {
                ...state,
                contacts: [],
                requestState: RequestStates.failure,
                contactsError: `${action.payload.statusCode}: ${action.payload.error ? action.payload.error : 'Unknown server error'}`,
            };
        case types.CREATE_CONTACT_SUCCESS:
            return {
                ...state,
                contacts: [...state.contacts, action.payload.contact],
                requestState: RequestStates.success,
                contactsError: null,
            };   
        case types.CREATE_CONTACT_LOADING:
            return {
                ...state,
                requestState: RequestStates.loading,
                contactsError: null,
            };   
        case types.CREATE_CONTACT_FAILURE:
            return {
                ...state,
                requestState: RequestStates.failure,
                contactsError: `${action.payload.statusCode}: ${action.payload.error ? action.payload.error : 'Unknown server error'}`,
            };   
        case types.UPDATE_CONTACT_SUCCESS:
            return {
                ...state,
                contacts: [...state.contacts.map(contact => contact._id === action.payload.contact._id ? action.payload.contact : contact )],
                requestState: RequestStates.success,
                contactsError: null,
            };
        case types.UPDATE_CONTACT_LOADING:
            return {
                ...state,
                requestState: RequestStates.loading,
                contactsError: null,
            };
        case types.UPDATE_CONTACT_FAILURE:
            return {
                ...state,
                requestState: RequestStates.failure,
                contactsError: `${action.payload.statusCode}: ${action.payload.error ? action.payload.error : 'Unknown server error'}`,
            };
        case types.DELETE_CONTACT_SUCCESS:
            return {
                ...state,
                contacts: [...state.contacts.filter(contact => contact._id !== action.payload.contact._id)],
                requestState: RequestStates.success,
                contactsError: null,
            };   
        case types.DELETE_CONTACT_LOADING:
            return {
                ...state,
                requestState: RequestStates.loading,
                contactsError: null,
            };   
        case types.DELETE_CONTACT_FAILURE:
            return {
                ...state,
                requestState: RequestStates.failure,
                contactsError: `${action.payload.statusCode}: ${action.payload.error ? action.payload.error : 'Unknown server error'}`,
            };   
        default:
            return state;
    }
}
  