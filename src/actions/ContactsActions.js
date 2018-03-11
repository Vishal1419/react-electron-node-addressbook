import * as types from '../constants/types';
import createAsyncRequest from '../util/async-redux.js';
import { 
    getAllContacts, 
    createContact, 
    updateContact, 
    deleteContact 
} from '../clients/node';

export const getAllContactsFunction = () => createAsyncRequest({
    asyncRequest: getAllContacts.bind(null),
    types: {
        success: types.GET_ALL_CONTACTS_SUCCESS,
        error: types.GET_ALL_CONTACTS_FAILURE,
        request: types.GET_ALL_CONTACTS_LOADING
    }
});

export const createContactFunction = (contact) => createAsyncRequest({
    asyncRequest: createContact.bind(null, contact),
    types: {
        success: types.CREATE_CONTACT_SUCCESS,
        error: types.CREATE_CONTACT_FAILURE,
        request: types.CREATE_CONTACT_LOADING
    }
});

export const updateContactFunction = (contact) => createAsyncRequest({
    asyncRequest: updateContact.bind(null, contact),
    types: {
        success: types.UPDATE_CONTACT_SUCCESS,
        error: types.UPDATE_CONTACT_FAILURE,
        request: types.UPDATE_CONTACT_LOADING
    }
});

export const deleteContactFunction = (id) => createAsyncRequest({
    asyncRequest: deleteContact.bind(null, id),
    types: {
        success: types.DELETE_CONTACT_SUCCESS,
        error: types.DELETE_CONTACT_FAILURE,
        request: types.DELETE_CONTACT_LOADING
    }
});

export const setSelectedContactsFunction = (contacts) => ({
    type: types.SET_SELECTED_CONTACTS,
    payload: contacts,
});

export const addContactToSelectedContactsFunction = (contact) => ({
    type: types.ADD_CONTACT_TO_SELECTED_CONTACTS,
    payload: contact,
});

export const removeContactFromSelectedContactsFunction = (contact) => ({
    type: types.REMOVE_CONTACT_FROM_SELECTED_CONTACTS,
    payload: contact,
});