import React, { Component } from 'react';
import { connect } from 'react-redux';

import Settings from './Settings';
import * as dialogActions from '../../../actions/DialogActions';

class ExportContainer extends Component {
  constructor(props) {
		super(props);
		this.showCoverPrintAreaSettings = this.showCoverPrintAreaSettings.bind(this);
		this.backup = this.backup.bind(this);
		this.restore = this.restore.bind(this);
  }

  showCoverPrintAreaSettings(dialogId) {
		this.props.openDialog(dialogId);
  }

  backup(contacts) {
		console.log("backup is under construction");
		console.log("till that constructs please have a look at contacts");
		console.log(contacts);
	}

  restore(contacts) {
		console.log("backup is under construction");
		console.log("till that constructs please have a look at contacts");
		console.log(contacts);
	}

  render() {
    return (
			<Settings
				showCoverPrintAreaSettings={this.showCoverPrintAreaSettings}
				backup={this.backup}
				restore={this.restore}
			/>
    );
  }
}

const mapDispatchToProps = dispatch => ({
	openDialog: dialogId => dispatch(dialogActions.openDialog(dialogId)),
})

export default connect(null, mapDispatchToProps)(ExportContainer);
