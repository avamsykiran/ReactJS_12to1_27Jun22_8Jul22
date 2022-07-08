import { LOAD_TXN,ERROR,WAIT , MARK_EDIT_TXN, UNMARK_EDIT_TXN } from "./ActionTypes";
import * as txnService from '../service/TxnsService';

export const createLoadTxnsAction = () => (dispatch => {
    txnService.getAllTxns().then(
        resp => dispatch({type:LOAD_TXN,txns:resp.data.map(t => ({...t,dot:new Date(t.dot)}))}),
        err => {console.error(err); dispatch({type:ERROR,errMsg:'Unable to load data'})}
    );
});

export const createAddTxnAction = txn => (dispatch => {
    txnService.addTxn(txn).then(
        resp => createLoadTxnsAction()(dispatch),
        err => {console.error(err); dispatch({type:ERROR,errMsg:'Unable to add record'})}
    );
});

export const createDelTxnAction = txnId => (dispatch => {
    txnService.delTxn(txnId).then(
        resp => createLoadTxnsAction()(dispatch),
        err => {console.error(err); dispatch({type:ERROR,errMsg:'Unable to remove record'})}
    );
});

export const createSaveTxnAction = txn => (dispatch => {
    txnService.saveTxn({...txn,editable:undefined}).then(
        resp => createLoadTxnsAction()(dispatch),
        err => {console.error(err); dispatch({type:ERROR,errMsg:'Unable to save record'})}
    );
});

export const createMarkEditTxnAction = txnId => ({ type: MARK_EDIT_TXN,txnId });
export const createUnMarkEditTxnAction = txnId => ({ type: UNMARK_EDIT_TXN,txnId });
