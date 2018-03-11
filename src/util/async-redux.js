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

				let statusCode = data.status;
				if (!["2", "3"].includes(String(statusCode).substring(0, 1))) {
					data.json().then(error => {
						dispatch({
							type: types.error,
							payload: error.error
						});
					});
					return;
				}

				if (statusCode === 204) {
					dispatch({
						type: types.success,
						payload: null
					});

					return;
				}

				data.json().then(response => {
						dispatch({
							type: types.success,
							payload: response
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
