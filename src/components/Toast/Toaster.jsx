import React from 'react';
import { toast } from 'react-toastify';
import SuccessIcon from 'material-ui-icons/ThumbUp';
import ErrorIcon from 'material-ui-icons/BugReport';
import WarningIcon from 'material-ui-icons/Warning';
import InformationIcon from 'material-ui-icons/Info';

import './Toast.css';
import Toast from './Toast.jsx';

let toastId = null;
const options = {
  autoClose: 5000,
  hideProgressBar: true,
  pauseOnHover: true,
  className: 'new alert'
};

export const info = (msg, title, onClick) => {
    title = (title) ? title : 'Information for you!';
    if (!toast.isActive(toastId)) {
        toastId = toast.info(<Toast type="info" icon={<InformationIcon />} msg={msg} title={title} onClick={onClick} />, options);
    }
};

export const warning = (msg, title, onClick) => {
    title = (title) ? title : 'Warning!';
    if (!toast.isActive(toastId)) {
          toastId = toast.warning(<Toast type="warning" icon={<WarningIcon />} msg={msg} title={title} onClick={onClick} />, options);
    }
};

export const error = (msg, title, onClick) => {
    title = (title) ? title : 'Oh snap!';
    if (!toast.isActive(toastId)) {
          toastId = toast.error(<Toast type="error" icon={<ErrorIcon />} msg={msg} title={title} onClick={onClick} />, options);
    }
};

export const success = (msg, title, onClick) => {
    title = (title) ? title : 'Well done!';
    if (!toast.isActive(toastId)) {
          toastId = toast.success(<Toast type="success" icon={<SuccessIcon />} msg={msg} title={title} onClick={onClick} />, options);
    }
};
