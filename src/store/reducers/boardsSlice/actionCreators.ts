import { AppDispatch } from '../../index';
import { boardsSlice } from './index';
import { IShortBoard } from '../../../models';

export const addBoard = (board: IShortBoard) => (dispatch: AppDispatch) => {
  dispatch(boardsSlice.actions.addBoards(board));
};

export const deleteBoard = (id: string) => (dispatch: AppDispatch) => {
  dispatch(boardsSlice.actions.deleteBoards(id));
};
