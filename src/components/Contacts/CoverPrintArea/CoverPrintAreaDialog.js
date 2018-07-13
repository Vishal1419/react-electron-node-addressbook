import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlockUI from 'react-block-ui';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';

import CoverPrintAreaContainer from './CoverPrintAreaContainer';
import { COVER_PRINT_AREA_DIALOG } from '../../../constants/dialogNames';
import DialogTransition from '../../Shared/DialogTransition';
import * as actions from '../../../actions/DialogActions';
import * as distanceActions from '../../../actions/DistanceActions';
import RequestStates from '../../../util/request-states';

class ContactDetailsDialog extends Component {
  constructor(props) {
    super(props);
    this.closeDialog = this.closeDialog.bind(this);
    this.onSavePrintArea = this.onSavePrintArea.bind(this);
  }

  closeDialog() {
    this.props.closeDialog();
  }

  onSavePrintArea() {
    this.props.updateDistanceFunction(this.props.distance).then(() => {
      this.props.closeDialog();
    });
  }

  render() {
    return (
      <Dialog
        open={this.props.dialog === COVER_PRINT_AREA_DIALOG }
        onClose={this.closeDialog}
        transition={DialogTransition}
        aria-labelledby="cover-print-area-dialog-title"
        aria-describedby="cover-print-area-dialog-description"
      >
        <DialogContent>
          <div id="cover-print-area-dialog-description" className="set-print-area-dialog-body">
            <CoverPrintAreaContainer />
          </div>
        </DialogContent>
        <DialogActions>
          <BlockUI tag="div" blocking={this.props.loading} loader={<div />}>
            <Button onClick={this.closeDialog} color="primary">
              Close
            </Button>
            <Button 
              onClick={this.onSavePrintArea}
              color="primary"
              variant="raised"
            >
              Save
            </Button>
          </BlockUI>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  dialog: state.dialogs.dialog,
  distance: state.distance.distance,
  loading: state.distance.requestState === RequestStates.loading,
});

const mapDispatchToProps = dispatch => ({
  closeDialog: () => dispatch(actions.closeDialog()),
  updateDistanceFunction: distance => dispatch(distanceActions.updateDistanceFunction(distance)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsDialog);
