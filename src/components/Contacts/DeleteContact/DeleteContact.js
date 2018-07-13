import React from 'react';

const DeleteContact = props => (
  <span>
    <span className="delete-dialog-body">Are you sure?</span> <br />
    <span>Delete {props.currentContact.name}?</span>
  </span>
);

export default DeleteContact;
