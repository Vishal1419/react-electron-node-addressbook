import { doRequest, mockRequest } from '../util/request.js';
import contacts from '../dummy-data/contacts.json';
import RequestTypes from '../util/request-types';
  
const apiUrl = 'http://localhost:5000';
const USE_MOCK_CALLS_FOR_ALL_API = false;

export const getAllContacts = () => {
    const USE_MOCK = false;
    if (USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
        return mockRequest({
            payload: { statusCode: 1000, contacts: contacts },
            isMock: true
        });
    }
    return doRequest(`${apiUrl}/contact`, 'GET');
};
  
export const createContact = (contact) => {
    const USE_MOCK = false;
    if (USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
        console.log(contact);
        const newContact = contact;
        newContact._id = Math.random() * 1000;
        return mockRequest({
            payload: { statusCode: 1000, contact: newContact },
            isMock: true
        });
    }
    return doRequest(`${apiUrl}/contact`, 'POST', null, contact, RequestTypes.json);
}

export const updateContact = (contact) => {
    const USE_MOCK = false;
    if (USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
        return mockRequest({
            payload: { statusCode: 1000, contact: contact },
            isMock: true
        });
    }
    return doRequest(`${apiUrl}/contact/${contact._id}`, 'PUT', null, contact, RequestTypes.json);
}

export const deleteContact = (contact) => {
    const USE_MOCK = false;
    if (USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
        return mockRequest({
            payload: { statusCode: 1000, contact: contact },
            isMock: true
        });
    }
    return doRequest(`${apiUrl}/contact/${contact._id}`, 'DELETE');
}
