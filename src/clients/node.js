import { doRequest, mockRequest } from '../util/request.js';
import contacts from '../dummy-data/contacts.json';
import RequestTypes from '../util/request-types';
  
const apiUrl = 'http://localhost:5000/';
const USE_MOCK_CALLS_FOR_ALL_API = true;

export const getAllContacts = () => {
    const USE_MOCK = true;
    if (USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
        return mockRequest({
            payload: contacts,
            isMock: true
        });
    }
    return doRequest(`${apiUrl}/contacts`, 'GET');
};
  
export const createContact = (contact) => {
    const USE_MOCK = true;
    if (USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
        return mockRequest({
            payload: contact,
            isMock: true
        });
    }
    return doRequest(`${apiUrl}/contact`, 'POST', null, contact, RequestTypes.json);
}

export const updateContact = (contact) => {
    const USE_MOCK = true;
    if (USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
        return mockRequest({
            payload: contact,
            isMock: true
        });
    }
    return doRequest(`${apiUrl}/contact`, 'PUT', null, contact, RequestTypes.json);
}

export const deleteContact = (id) => {
    const USE_MOCK = true;
    if (USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
        return mockRequest({
            payload: id,
            isMock: true
        });
    }
    return doRequest(`${apiUrl}/contact`, 'DELETE', null, id, RequestTypes.json);
}
