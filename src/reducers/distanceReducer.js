import * as types from '../constants/types';
import RequestStates from '../util/request-states';

const initialState = {
  distance: {},
  requestState: RequestStates.init,
  distanceError: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.SET_COVER_PRINT_AREA_DISTANCE:
			return {
				...state,
				distance: {
					...state.distance,
					distanceX: action.payload.distanceX,
					distanceY: action.payload.distanceY,
				}
			}
		case types.GET_DISTANCE_SUCCESS:
			return {
				...state,
				distance: action.payload.distance,
				requestState: RequestStates.success,
				distanceError: null,
			}
		case types.GET_DISTANCE_LOADING:
			return {
				...state,
				requestState: RequestStates.loading,
				distanceError: null,
			}
		case types.GET_DISTANCE_FAILURE:
			return {
				...state,
				requestState: RequestStates.failure,
				distanceError: `${action.payload.statusCode}: ${action.payload.error ? action.payload.error : 'Unknown server error'}`,
			}
    case types.UPDATE_DISTANCE_SUCCESS:
			return {
				...state,
				distance: action.payload.distance,
				requestState: RequestStates.success,
				distanceError: null,
			}
		case types.UPDATE_DISTANCE_LOADING:
			return {
				...state,
				requestState: RequestStates.loading,
				distanceError: null,
			}
		case types.UPDATE_DISTANCE_FAILURE:
			return {
				...state,
				requestState: RequestStates.failure,
				distanceError: `${action.payload.statusCode}: ${action.payload.error ? action.payload.error : 'Unknown server error'}`,
			}
		default:
			return state;
	}
}
