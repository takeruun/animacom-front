/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, Method } from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

type AuthType = {
  accessToken: string
  client: string
  uid: string
};

type RequestType = {
  url: string,
  method: Method,
  reqParams?: {
    params?: any,
    data?: any,
  },
};

export const authHeaders = ({ accessToken, client, uid }: AuthType):{
  'access-token': string;
  client: string;
  uid: string;
} => ({
  'access-token': accessToken,
  client,
  uid,
});

const client = axios.create({
  baseURL,
});

export default async function request({ url, method, reqParams }: RequestType): Promise<any> {
  const reqConfig: AxiosRequestConfig = {
    url,
    method,
    headers: {},
    ...reqParams,
  };

  if (localStorage.getItem('anima')) {
    reqConfig.headers = authHeaders(JSON.parse(localStorage.getItem('anima') || ''));
  } else {
    throw new Error('please login');
  }

  const response = await client(reqConfig)
    .then((res) => {
      if (res.data.error) {
        let emsg: string = res.data.error;
        if (res.data.msg?.length > 0) emsg += `/${res.data.msg}`;
        throw emsg;
      }
      return res.data;
    })
    .catch((e) => {
      throw new Error(e);
    });

  return response;
}

export const noAuthRequest = async ({ url, method, reqParams }: RequestType): Promise<{
  response: any;
  headers: any;
}> => {
  const reqConfig: AxiosRequestConfig = {
    url,
    method,
    headers: {},
    ...reqParams,
  };

  const response = await client(reqConfig)
    .then((res) => {
      if (res.data.error) {
        let emsg: string = res.data.error;
        if (res.data.msg?.length > 0) emsg += `/${res.data.msg}`;
        throw emsg;
      }
      return res;
    })
    .catch((e) => {
      throw new Error(e);
    });

  return { response: response.data, headers: response.headers };
};
