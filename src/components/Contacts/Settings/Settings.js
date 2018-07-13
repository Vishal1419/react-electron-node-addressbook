import React, { Fragment } from 'react';
import SettingsIcon from 'material-ui-icons/Settings';

import PopoverContainer from '../../Shared/Popover/PopoverContianer';
import BackupIcon from '../../../assets/icons/backup';
import RestoreIcon from '../../../assets/icons/restore';
import CoverPrintSettingsIcon from '../../../assets/icons/cover_print_settings';
import { COVER_PRINT_AREA_DIALOG } from '../../../constants/dialogNames';

const Settings = props => (
  <PopoverContainer
    popoverIcon={
      <SettingsIcon 
        className="helper-button-icon click-through"
        fill="#fff"
      />
    }
    anchorOrigin={{
      horizontal: 'right',
      vertical: 'bottom',
    }}
    transformOrigin={{
      horizontal: 'right',
      vertical: 'top',
    }}
    popoverText="Settings"
    themeColor="excel"
    popoverOptions={[
      {
        themeColor: 'lightGreen',
        onClick: () => { 
          props.showCoverPrintAreaSettings(COVER_PRINT_AREA_DIALOG);
        },
        content: (
          <Fragment>
            <CoverPrintSettingsIcon className="helper-button-icon" fill="#333" />
            <div className="content-info">
              Set Print Area
              <span className="secondary-content">only for cover printing</span>
            </div>
          </Fragment>
        ),
        secondaryContent: 'only for cover print'
      },
      {
        themeColor: 'lime',
        onClick: () => { 
          props.backup();
        },
        content: (
          <Fragment>
            <BackupIcon className="helper-button-icon" fill="#333" />
            Backup
          </Fragment>
        )
      },
      {
        themeColor: 'lime',
        onClick: () => { 
          props.restore();
        },
        content: (
          <Fragment>
            <RestoreIcon className="helper-button-icon" fill="#333" />
            Restore
          </Fragment>
        )
      }
    ]}
  />
);

export default Settings;
