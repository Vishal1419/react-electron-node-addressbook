import React, { Fragment } from 'react';

import PopoverContainer from '../../Shared/Popover/PopoverContianer';
import ExportIcon from '../../../assets/icons/export';
import PDFIcon from '../../../assets/icons/pdf';
import ExcelIcon from '../../../assets/icons/excel';
import JSONIcon from '../../../assets/icons/json';

const Export = props => (
  <PopoverContainer
    popoverIcon={
      <ExportIcon 
        className="helper-button-icon click-through"
        fill={props.selectedContacts.length > 0 ? '#fff' : '#a6a6a6'}
      />
    }
    popoverText="Export"
    themeColor="excel"
    isDisabled={props.selectedContacts.length <= 0}
    popoverOptions={[
      {
        themeColor: 'pdf',
        onClick: () => { 
          props.printPDF();
        },
        content: (
          <Fragment>
            <PDFIcon className="helper-button-icon" fill="#fff" />
            Export to PDF
          </Fragment>
        )
      },
      {
        themeColor: 'excel',
        onClick: () => { 
          props.exportToExcel();
        },
        content: (
          <Fragment>
            <ExcelIcon className="helper-button-icon" fill="#fff" />
            Export to Excel
          </Fragment>
        )
      },
      {
        themeColor: 'json',
        onClick: () => { 
          props.exportToJSON();
        },
        content: (
          <Fragment>
            <JSONIcon className="helper-button-icon" fill="#333" />
            Export to JSON
          </Fragment>
        )
      }
    ]}
  />
);

export default Export;
