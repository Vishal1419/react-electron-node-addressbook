import * as types from '../constants/types';

const initialState = {
	dialog: '',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.OPEN_DIALOG:
			return {
				...state,
				dialog: action.payload,
			}
		case types.CLOSE_DIALOG:
			return {
				...state,
				dialog: '',
			}
		default:
			return state;
	}
}
