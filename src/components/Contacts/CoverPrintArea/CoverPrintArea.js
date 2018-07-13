import React from 'react';
import Draggable from 'react-draggable';
import converter from 'css-unit-converter';
import PhoneIcon from 'material-ui-icons/Phone';
import EmailIcon from 'material-ui-icons/Email';
import LocationIcon from 'material-ui-icons/LocationOn';

const CoverPrintArea = props => (
  <Draggable
    bounds={{
      left: 0,
      top: 0,
    }}
    defaultPosition={{
      x: props.distanceX,
      y: props.distanceY,
    }}
    onDrag={(event, distance) => props.onDragCard(distance)}
  >
    <div id="cover-print-area-draggable-content" className="cover-print-area-settings-content">
      <span className="left-ruler">{`${converter(props.distanceX, 'px', 'cm').toFixed(2)} cm`}</span>
      <span className="top-ruler">{`${converter(props.distanceY, 'px', 'cm').toFixed(2)} cm`}</span>
      <div className="contact-name">Contact Name</div>
      <div className="side-by-side-start-center">
        <PhoneIcon className="contact-detail-icon" />
        <span>Mobile No</span>
      </div>
      <div className="side-by-side-start-center email-wrapper">
        <EmailIcon className="contact-detail-icon" />
        <span>Email</span>
      </div>
      <div className="side-by-side-start-center">
        <LocationIcon className="contact-detail-icon contact-location-icon" />
        <div className="contact-address-wrapper">
          <p className="contact-address"> Address Line 1 </p>
          <span className="contact-address-details"> Address Line 2 </span>
        </div>
      </div>
    </div>
  </Draggable>
);

export default CoverPrintArea;