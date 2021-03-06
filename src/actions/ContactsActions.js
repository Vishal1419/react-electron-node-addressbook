import createAsyncRequest from '../util/async-redux.js';
import * as types from '../constants/types';
import { 
    getAllContacts, 
    createContact, 
    updateContact, 
    deleteContact,
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

export const deleteContactFunction = (contact) => createAsyncRequest({
    asyncRequest: deleteContact.bind(null, contact),
    types: {
        success: types.DELETE_CONTACT_SUCCESS,
        error: types.DELETE_CONTACT_FAILURE,
        request: types.DELETE_CONTACT_LOADING
    }
});

export const selectAllContacts = () => ({
    type: types.SELECT_ALL_CONTACTS,
    payload: null
});

export const deselectAllContacts = () => ({
    type: types.DESELECT_ALL_CONTACTS,
    payload: null,
});

export const selectContact = contact => ({
    type: types.SELECT_CONTACT,
    payload: contact,
});

export const deselectContact = contactId => ({
    type: types.DESELECT_CONTACT,
    payload: contactId,
});

export const setCurrentContact = contact => ({
    type: types.SET_CURRENT_CONTACT,
    payload: contact,
});

export const changeCurrentContactProfilePic = profilePic => ({
    type: types.CHANGE_CURRENT_CONTACT_PROFILE_PIC,
    payload: profilePic,
});

export const sortContacts = key => ({
    type: types.SORT_CONTACTS,
    payload: key,
});

export const filterContacts = searchTerm => ({
    type: types.FILTER_CONTACTS,
    payload: searchTerm,
});

export const toggleContactsView = () => ({
    type: types.TOGGLE_CONTACTS_VIEW,
    payload: null,
});
