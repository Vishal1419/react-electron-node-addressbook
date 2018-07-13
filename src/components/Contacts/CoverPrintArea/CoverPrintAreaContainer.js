import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlockUI from 'react-block-ui';

import CoverPrintArea from './CoverPrintArea';
import * as actions from '../../../actions/DistanceActions';
import RequestStates from '../../../util/request-states';

class CoverPrintAreaContainer extends Component {
  constructor(props) {
    super(props);
    this.onDragCard = this.onDragCard.bind(this);
  }

  onDragCard(distance) {
    this.props.setCoverPrintAreaDistance({
      distanceX: distance.x,
      distanceY: distance.y,
    });
  }

  render() {
    return (
      <BlockUI tag="div" blocking={this.props.loading}>
        <div id="set-print-area-dialog-description" className="cover-print-area-settings-container">
          <CoverPrintArea
            distanceX={this.props.distance.distanceX}
            distanceY={this.props.distance.distanceY}
            onDragCard={this.onDragCard}
          />
        </div>
      </BlockUI>
    );
  }
}

const mapStateToProps = state => ({
  distance: state.distance.distance,
  loading: state.distance.requestState === RequestStates.loading,
});

const mapDispatchToProps = dispatch => ({
  setCoverPrintAreaDistance: distance => (dispatch(actions.setCoverPrintAreaDistance(distance))),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoverPrintAreaContainer);