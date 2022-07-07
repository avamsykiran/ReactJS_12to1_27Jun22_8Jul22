
import axios from 'axios';

const apiUrl = "http://localhost:9999/txns";

export const getAllTxns = () => axios.get(apiUrl);

export const getTxnById = txnId => axios.get(`${apiUrl}/${txnId}`);

export const addTxn = txn => axios.post(apiUrl,txn);

export const saveTxn = txn => axios.put(`${apiUrl}/${txn.id}`,txn);

export const delTxn = txnId => axios.delete(`${apiUrl}/${txnId}`);
