import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Contacts from './Contacts';
import Dialogs from './Dialogs';
import * as actions from '../../actions/ContactsActions';
import * as distanceActions from '../../actions/DistanceActions';

class ContactsContainer extends Component {
	componentDidMount() {
		this.props.getAllContacts();
		this.props.getDistanceFunction();
	}

	render() {
		return (
			<Fragment>
				<Contacts
					currentView={this.props.currentView}
				/>
				<Dialogs />
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	currentView: state.contacts.currentView
})

const mapDispatchToProps = dispatch => ({
	getAllContacts: () => dispatch(actions.getAllContactsFunction()),
	getDistanceFunction: () => dispatch(distanceActions.getDistanceFunction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactsContainer);