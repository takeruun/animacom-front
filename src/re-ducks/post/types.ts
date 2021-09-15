import { Action } from 'redux';

export type PostType = {
  id: string,
  title: string,
  subTitle: string,
  body: string,
  categoryId: string,
  images: Array<{ id: string, file: File | null, imagePath: string }>
  cuteCount: number,
  favCount: number,
  goodCount: number,
  coolCount: number,
  alreadyCuted?: boolean,
  alreadyFaved?: boolean,
  alreadyGooded?: boolean,
  alreadyCooled?: boolean,
  reactions?: Array<{ id: string, kind: number }>,
}

export interface GET_POST extends Action {
  type: 'GET_POST',
  payload: PostType,
}

export interface CREATE_POST extends Action {
  type: 'CREATE_POST',
  payload: PostType,
}

export interface EDIT_POST extends Action {
  type: 'EDIT_POST',
  payload: PostType,
}

export interface START_FETCH extends Action {
  type: 'START_FETCH',
}

export interface END_FETCH extends Action {
  type: 'END_FETCH',
}

export interface DESTROY_POST extends Action {
  type: 'DESTROY_POST',
}

export type ActionsType = CREATE_POST | GET_POST | START_FETCH | EDIT_POST | END_FETCH | DESTROY_POST
