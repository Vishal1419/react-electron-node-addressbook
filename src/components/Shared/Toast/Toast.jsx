import React from 'react';

export default ({ type, icon, msg, title, onClick }) =>
  <div onClick={() => { onClick && onClick()}}>
    <span className={`toastify-content--icon toastify-content--${type}-icon`}>
      <i className="material-icons">{icon}</i>
    </span>
    <div className={`toastify-content--message toastify-content--${type}-message`}>
      <strong>{title}</strong>
      <div className="toast-message">{msg}</div>
    </div>
  </div>;

