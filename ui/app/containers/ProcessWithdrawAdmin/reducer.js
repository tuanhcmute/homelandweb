/*
 *
 * ProcessWithdrawAdmin reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_STORE_DATA,
  GET_PENDING_ACCEPT_BANKING_CASH_LIST_SUCCESS,
  GET_PENDING_ACCEPT_BANKING_CASH_LIST_FAIL,
  APPROVE_WITHDRAW_REQUEST_SUCCESS,
  APPROVE_WITHDRAW_REQUEST_FAIL,
} from './constants';

export const initialState = {
  error: {},
  pendingAcceptBankCashList: [],
  showWarningapprove: false,
  showWarningreject: false,
  showSuccessapprove: false,
  showErrorsapprove: false,
  action: false,
};

/* eslint-disable default-case, no-param-reassign */
const pendingAcceptBankCashListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PENDING_ACCEPT_BANKING_CASH_LIST_SUCCESS:
        draft.pendingAcceptBankCashList = action.response;
        break;
      case GET_PENDING_ACCEPT_BANKING_CASH_LIST_FAIL:
        draft.error = action.error;
        break;
      case APPROVE_WITHDRAW_REQUEST_SUCCESS:
        console.log({approveeee: draft.action})
        draft.action = !draft.action;
        draft.showSuccessapprove = true;
        break;
      case APPROVE_WITHDRAW_REQUEST_FAIL:
        draft.action = !draft.action;
        draft.error = action.error;
        draft.showErrorsapprove = true;
        break;
      case CHANGE_STORE_DATA:
        draft[action.key] = action.value;
        break;
    }
  });

export default pendingAcceptBankCashListReducer;
