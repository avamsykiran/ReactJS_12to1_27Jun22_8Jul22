import { ADD_TXN, DEL_TXN, MARK_EDIT_TXN, SAVE_TXN, UNMARK_EDIT_TXN } from "./actionTypes";

export const createAddTxnAction = txn => ({ type: ADD_TXN,txn });
export const createDelTxnAction = txnId => ({ type: DEL_TXN,txnId });
export const createSaveTxnAction = txn => ({ type: SAVE_TXN,txn });
export const createMarkEditTxnAction = txnId => ({ type: MARK_EDIT_TXN,txnId });
export const createUnMarkEditTxnAction = txnId => ({ type: UNMARK_EDIT_TXN,txnId });
