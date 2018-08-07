import env from '../../config/env'
import {TOKEN} from "../../utils/global";
import {getData} from "../../utils/storage";

function parseJSON(response) {
    return response.json();
}

function prepareHeader(method) {
    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    const token = getData(TOKEN);
    if(token) {
        headers.append("token", token);
    }

    return {
        method,
        headers: headers
    };
}

/*
* HTTP GET Method
* */
export const get = (url) => {
  return fetch(`${env.API_HOST}:${env.API_PORT}` + url, prepareHeader('GET'))
      .then(parseJSON)
      .then(result => {
          return result
      })
};

/*
* HTTP POST Method
* */
export const post = (url, payload) => {
  const config = {
    ...prepareHeader('POST'),
    body: JSON.stringify(payload)
  };

  return fetch(`${env.API_HOST}:${env.API_PORT}` + url, config)
      .then(parseJSON)
      .then(result => {
        return result
      })
};

/*
* HTTP DELETE Method
* */
export const deleteRequest = (url, token) => {
  return fetch(`${env.API_HOST}:${env.API_PORT}` + url, prepareHeader('DELETE'))
      .then(parseJSON)
      .then(result => {
          return result
      })
};

/*
* HTTP PUT Method
* */

export const put = (url, token) => {
    return fetch(`${env.API_HOST}:${env.API_PORT}` + url, prepareHeader('PUT'))
        .then(parseJSON)
        .then(result => {
            return result
        })
  };
