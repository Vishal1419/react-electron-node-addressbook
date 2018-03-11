import * as types from '../constants/types';
import RequestStates from '../util/request-states';

const initialState = {
    contacts: [],
    selectedContacts: [],
    requestState: RequestStates.init,
    contactsError: null,
};
  
export default function contacts(state = initialState, action) {
    switch (action.type) {
        case types.GET_ALL_CONTACTS_SUCCESS:
            return {
                ...state,
                contacts: action.payload,
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
                requestState:  RequestStates.failure,
                contactsError: action.payload,
            };   
        case types.CREATE_CONTACT_SUCCESS:
            return {
                ...state,
                contacts: [...state.contacts, action.payload],
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
                contactsError: action.payload,
            };   
        case types.UPDATE_CONTACT_SUCCESS:
            return {
                ...state,
                contacts: [...state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact )],
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
                contactsError: action.payload,
            };
        case types.DELETE_CONTACT_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                contacts: [...state.contacts.filter(contact => contact.id !== action.payload)],
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
                contactsError: action.payload,
            };   
        case types.SET_SELECTED_CONTACTS:
            return {
                ...state,
                selectedContacts: action.payload,
                contactsError: null,
            };
        case types.ADD_CONTACT_TO_SELECTED_CONTACTS:
            return {
                ...state,
                selectedContacts: [...state.selectedContacts, action.payload],
                contactsError: null,
            };
        case types.REMOVE_CONTACT_FROM_SELECTED_CONTACTS:
            return {
                ...state,
                selectedContacts: [...state.selectedContacts.filter(contact => contact.id !== action.payload.id)],
                contactsError: null,
            };
        default:
            return state;
    }
}
  