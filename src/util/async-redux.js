export default function createAsyncAction({ asyncRequest, payload, types }) {
	return (dispatch) => {
		dispatch({
			type: types.request,
			payload: payload
		});

		return asyncRequest()
			.then(data => {
				if (data.isMock) {
					dispatch({
						type: types.success,
						payload: data.payload
					});
					return;
				}

				data.json().then(response => {
					if (response.statusCode === 1000) {
						dispatch({
							type: types.success,
							payload: response
						});
					} else {
						dispatch({
							type: types.error,
							payload: response
						});
					}
				}).catch(error => {
					dispatch({
						type: types.error,
						payload: error.error
					});
				});
			
			}).catch(error => {
				dispatch({
					type: types.error,
					payload: 'Connection issue. Make sure you are connected to the internet, and that your API is working.',
				});
			});
	}
}
