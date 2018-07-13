import createAsyncRequest from '../util/async-redux.js';
import * as types from '../constants/types';
import { 
    getDistance,
    updateDistance
} from '../clients/node';

export const setCoverPrintAreaDistance = distance => ({
    type: types.SET_COVER_PRINT_AREA_DISTANCE,
    payload: distance,
});

export const getDistanceFunction = () => createAsyncRequest({
    asyncRequest: getDistance.bind(null),
    types: {
        success: types.GET_DISTANCE_SUCCESS,
        error: types.GET_DISTANCE_FAILURE,
        request: types.GET_DISTANCE_LOADING
    }
});

export const updateDistanceFunction = distance => createAsyncRequest({
    asyncRequest: updateDistance.bind(null, distance),
    types: {
        success: types.UPDATE_DISTANCE_SUCCESS,
        error: types.UPDATE_DISTANCE_FAILURE,
        request: types.UPDATE_DISTANCE_LOADING
    }
});
