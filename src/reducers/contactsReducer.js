import * as types from '../constants/types';
import RequestStates from '../util/request-states';
import { orderBy } from '../util';

const invertDirection = {
	asc: 'desc',
	desc: 'asc',
};

const sortAndFilterContactsHelper = (contacts, searchTerm, sortKey, sortDirection) => {
	return orderBy(
		contacts.filter(contact => {
			const sTerm = searchTerm.toLocaleLowerCase();
			return contact.name.toLocaleLowerCase().includes(sTerm)
			|| contact.mobileNo.toLocaleLowerCase().includes(sTerm)
			|| (contact.email ? contact.email.toLocaleLowerCase().includes(sTerm) : false)
			|| (contact.village ? contact.village.toLocaleLowerCase().includes(sTerm) : false)
			|| (contact.taluka ? contact.taluka.toLocaleLowerCase().includes(sTerm) : false)
			|| (contact.district ? contact.district.toLocaleLowerCase().includes(sTerm) : false)
		}),
		sortKey,
		sortDirection
	);
}

const initialState = {
	internalContacts: [],
	internalSelectedContacts: [],
	contacts: [],
	selectedContacts: [],
	currentContact: {},
	sortKey: '',
	sortDirection: 'desc',
	searchTerm: '',
	currentView: 'table',
	requestState: RequestStates.init,
	contactsError: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.GET_ALL_CONTACTS_SUCCESS:
			return {
				...state,
				internalContacts: action.payload.contacts,
				contacts: sortAndFilterContactsHelper(action.payload.contacts, state.searchTerm, state.sortKey, state.sortDirection),
				requestState: RequestStates.success,
				contactsError: null,
			};    
		case types.GET_ALL_CONTACTS_LOADING:
			return {
				...state,
				internalContacts: [],
				requestState:  RequestStates.loading,
				contactsError: null,
			};
		case types.GET_ALL_CONTACTS_FAILURE:
			return {
				...state,
				internalContacts: [],
				requestState: RequestStates.failure,
				contactsError: `${action.payload.statusCode}: ${action.payload.error ? action.payload.error : 'Unknown server error'}`,
			};
		case types.CREATE_CONTACT_SUCCESS:
			return {
				...state,
				internalContacts: [...state.internalContacts, action.payload.contact],
				contacts: sortAndFilterContactsHelper([...state.internalContacts, action.payload.contact], state.searchTerm, state.sortKey, state.sortDirection),
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
				internalContacts: [...state.internalContacts.map(contact => contact._id === action.payload.contact._id ? action.payload.contact : contact )],
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
				internalContacts: [...state.internalContacts.filter(contact => contact._id !== action.payload.contact._id)],
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
		case types.SELECT_ALL_CONTACTS:
			return {
				...state,
				internalSelectedContacts: state.contacts,
				selectedContacts: state.contacts,
			}
		case types.DESELECT_ALL_CONTACTS:
			return {
				...state,
				internalSelectedContacts: [],
				selectedContacts: [],
			}
		case types.SELECT_CONTACT:
		return {
			...state,
			internalSelectedContacts: [
				...state.internalSelectedContacts,
				action.payload,
			],
			selectedContacts: [
				...state.selectedContacts,
				action.payload,
			],
		}
		case types.DESELECT_CONTACT:
			return {
				...state,
				internalSelectedContacts: [
					...state.internalSelectedContacts.filter(contact => contact._id !== action.payload),
				],
				selectedContacts: [
					...state.selectedContacts.filter(contact => contact._id !== action.payload),
				],
			}
		case types.SET_CURRENT_CONTACT:
			return {
				...state,
				currentContact: action.payload,
			}
		case types.CHANGE_CURRENT_CONTACT_PROFILE_PIC:
			return {
				...state,
				currentContact: {
					...state.currentContact,
					profilePic: action.payload,
				},
			}
		case types.SORT_CONTACTS: {
			const sortDirection = state.sortKey === action.payload 
				? invertDirection[state.sortDirection]
				: 'asc'
			return {
				...state,
				sortKey: action.payload,
				sortDirection: sortDirection,
				contacts: sortAndFilterContactsHelper(state.contacts, state.searchTerm, action.payload, sortDirection),
			}
		}
		case types.FILTER_CONTACTS:
			return {
				...state,
				searchTerm: action.payload,
				contacts: sortAndFilterContactsHelper(state.internalContacts, action.payload, state.sortKey, state.sortDirection),
				selectedContacts: sortAndFilterContactsHelper(state.internalSelectedContacts, action.payload, state.sortKey, state.sortDirection),
			};
		case types.TOGGLE_CONTACTS_VIEW:
			return {
				...state,
				currentView: state.currentView === 'table' ? 'profile' : 'table',
			}
		default:
			return state;
	}
}
