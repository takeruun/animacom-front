import { Action } from 'redux';

export type PostType = {
  title: string,
  subTitle: string,
  body: string,
  categoryId: string,
}

export type PostsState = {
  list: PostType[]
}

export interface CREATE_POST extends Action {
  type: 'CREATE_POST',
  payload: PostType,
}

export type ActionsType = CREATE_POST
