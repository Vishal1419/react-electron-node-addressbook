import React, { Component } from 'react';
import Popover from './Popover';

class PopoverContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopoverOpen: false,
    }
    this.togglePopover = this.togglePopover.bind(this);
  }

  togglePopover() {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  }

  /*
    popoverOptions example
    ======================
    popoverOptions = [
      {
        themeColor: 'pdf',
        onClick: (event) => {  },
        content: (
          <Fragment>
            <PDFIcon className="helper-button popover-option" fill="#fff" />
            Export to PDF
          </Fragment>
        )
      }
    ]
  */

  render() {
    return (
      <Popover
        popoverOptions={this.props.popoverOptions}
        themeColor={this.props.themeColor}
        isDisabled={this.props.isDisabled}
        arrowFill={this.props.arrowFill}
        anchorOrigin={this.props.anchorOrigin}
        transformOrigin={this.props.transformOrigin}
        popoverIcon={this.props.popoverIcon}
        popoverText={this.props.popoverText}
        isPopoverOpen={this.state.isPopoverOpen}
        togglePopover={this.togglePopover}
      />
    );
  }
}

export default PopoverContainer;
