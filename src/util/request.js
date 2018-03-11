import manipulator from 'object-formdata-convertor';

import types from './request-types';

export const mockRequest = (result) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve.bind(null, result), 1000);
  });
};

export const doRequest = (url, method, token = null, body = {}, type = types.formData) => {
  let options = {
    method: method,
    headers: {}
  };

  if (token !== null) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  switch(type) {
    case types.formData: 
      if (!['GET', 'HEAD'].includes(method)) {
        options.body = manipulator.JsonToFormData(body);
      }
      break;
    case types.json:
      console.log('type is json')
      options.headers.Accept = 'application/json';
      options.headers['Content-Type'] = 'application/json';
      if (!['GET', 'HEAD'].includes(method)) {
        options.body = JSON.stringify(body);
      }
      break;
    case types.multipart:
      options.headers['Content-Type'] = 'multipart/form-data';
      if (!['GET', 'HEAD'].includes(method)) {
        let data = new FormData();
        for (let item in body) {
          data.append(item, body[item]);
        }
        console.log(data);
        options.body = data;
      }
      break;
    default:
      break;
  }

  return fetch(url, options);
}