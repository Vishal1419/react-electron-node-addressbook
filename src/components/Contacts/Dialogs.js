import React, { Fragment } from 'react';

import ContactDetailsDialog from './ContactDetails/ContactDetailsDialog';
import AddEditContactDialog from './ContactForm/AddEditContactDialog';
import DeleteContactDialog from './DeleteContact/DeleteContactDialog';
import CoverPrintAreaDialog from './CoverPrintArea/CoverPrintAreaDialog';

const Dialogs = () => (
  <Fragment>
    <ContactDetailsDialog />
    <AddEditContactDialog />
    <DeleteContactDialog />
    <CoverPrintAreaDialog />
  </Fragment>
);

export default Dialogs;