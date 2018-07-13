import React, { Component, Fragment } from 'react';
import Button from 'material-ui/Button';
import MaterialPopover from 'material-ui/Popover';
import KeyBoardArrowDownIcon from 'material-ui-icons/ExpandMore';

import Color from '../../Shared/Color';

class Popover extends Component {
  render() {
    return (
      <Fragment>
        <Color color={this.props.themeColor}>
          <Button
            buttonRef={(ref) => { this.popoverControlButton = ref; }}
            color="primary" 
            variant="raised" 
            className="helper-button"
            disabled={this.props.isDisabled}					
            onClick={this.props.togglePopover}
          >
            {this.props.popoverIcon}
            <span className="click-through">{this.props.popoverText}</span>
            <KeyBoardArrowDownIcon
              className="helper-button-icon-right click-through"
              fill={this.props.arrowFill || this.props.iconFill}
            />
          </Button>
        </Color>
        <MaterialPopover
          className="popover"
          open={this.props.isPopoverOpen}
          anchorEl={this.popoverControlButton}
          onClose={this.props.togglePopover}
          anchorOrigin={{
            vertical: this.props.anchorOrigin ? (this.props.anchorOrigin.vertical || 'bottom') : 'bottom',
            horizontal: this.props.anchorOrigin ? (this.props.anchorOrigin.horizontal || 'left') : 'left',
          }}
          transformOrigin={{
            vertical: this.props.transformOrigin ? (this.props.transformOrigin.vertical || 'top') : 'top',
            horizontal: this.props.transformOrigin ? (this.props.transformOrigin.horizontal || 'left') : 'left',
          }}
        >
          <div className="popover-content">
            {
              this.props.popoverOptions.map((option, index) => (
                <Color key={index} color={option.themeColor}>
                  <Button 
                    color="primary" 
                    variant="raised" 
                    className="helper-button popover-option"
                    onClick={(event) => {
                      if (option.onClick) option.onClick(event);
                      this.props.togglePopover(event);
                    }}
                  >
                    <div className="content">
                      {option.content}
                    </div>
                    {/* <span className="secondary-content">{option.secondaryContent}</span> */}
                  </Button>
                </Color>              
              ))
            }
          </div>
        </MaterialPopover>
      </Fragment>
    );
  }
}

export default Popover;
