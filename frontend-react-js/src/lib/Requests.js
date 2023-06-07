import {getAccessToken} from 'lib/CheckAuth';

async function request(method,url,payload,options){
    if (options.hasOwnProperty('setErrors')){
      options.setErrors('');
    }
    let res;
    try {
      const attrs = {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        }
      }
  
      if (options.hasOwnProperty('auth') && options.auth === true){
        await getAccessToken();
        const access_token = localStorage.getItem("access_token");
        attrs.headers['Authorization'] = `Bearer ${access_token}`;
      }
  
      if (method !== 'GET') {
        attrs.body = JSON.stringify(payload)
      }
  
      res = await fetch(url,attrs)
      let data = await res.json();
      if (res.status === 200) {
        options.success(data);
      } else {
        if (options.setErrors !== null){
          options.setErrors(data);
        }
        console.log(res, data);
      }
    } catch (err) {
      console.log('request catch',err)
      if (err instanceof Response) {
          console.log('HTTP error detected:', err.status);
          if (options.hasOwnProperty('setErrors')){
            options.setErrors([`generic_${err.status}`]);
          }
      } else {
        if (options.hasOwnProperty('setErrors')){
          options.setErrors([`generic_500`]);
        }
      }
    }
  }

  export function post(url, payload, options){
    request('POST', url, payload, options)
  }
  
  export function put(url, payload, options){
    request('PUT', url, payload, options)
  }
  
  export function get(url, options){
    request('GET', url, null, options)
  }