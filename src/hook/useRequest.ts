import axios, { AxiosRequestConfig, Method } from 'axios';

const baseURL = 'http://localhost:3001';

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

export const authHeaders = ({ accessToken, client, uid }: AuthType) => ({
  'access-token': accessToken,
  client,
  uid,
});

const client = axios.create({
  baseURL,
});

export default async function request({ url, method, reqParams }: RequestType) {
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

  return { response, headers: response.headers };
}
