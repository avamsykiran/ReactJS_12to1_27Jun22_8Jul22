import { useEffect, useState } from 'react';
import TxnForm from './TxnForm';
import TxnRow from './TxnRow';

import * as txnService from '../service/TxnsService';

const IncomeStatement = (props) => {
    let [txns, setTxns] = useState(null);
    let [errMsg, setErrMsg] = useState(null);

    const loadData = () => {
        txnService.getAllTxns().then(
            resp => setTxns(resp.data.map(t => ({...t,dot:new Date(t.dot)}))),
            err => { console.error(err); setErrMsg("Unable to load data as of now..."); }
        );
    };

    const delTxn = txnId => {
        txnService.delTxn(txnId).then(
            resp => loadData(),
            err => { console.error(err); setErrMsg("Unable to delete data as of now..."); }
        );
    };

    const addTxn = txn => {
        txnService.addTxn(txn).then(
            resp => loadData(),
            err => { console.error(err); setErrMsg("Unable to add data as of now..."); }
        );
    }

    const saveTxn = txn => {
        txnService.saveTxn({ ...txn, editable: undefined }).then(
            resp => loadData(),
            err => { console.error(err); setErrMsg("Unable to modify data as of now..."); }
        );
    }

    const markEditable = txnId => {
        setTxns(txns.map(t => t.id !== txnId ? t : { ...t, editable: true }));
    }

    const unmarkEditable = txnId => {
        setTxns(txns.map(t => t.id !== txnId ? t : { ...t, editable: undefined }));
    }

    useEffect(loadData, []);

    return (
        <section className='container-fluid p-4'>
            <h4>Income Statement</h4>

            {(!txns && !errMsg) &&
                <div className='alert alert-info p-3'>
                    <strong>Please wait while laoding data...</strong>
                </div>
            }

            {errMsg &&
                <div className='alert alert-danger p-3'>
                    <strong>{errMsg}</strong>
                </div>
            }

            {(txns && txns.length === 0) &&
                <div className='alert alert-info p-3'>
                    <strong>No Transactiosn recorded!</strong>
                </div>
            }

            <table className='table table-bordered table-hover table striped'>
                <thead>
                    <tr>
                        <th>Txn#</th>
                        <th>TxnDate</th>
                        <th>Description</th>
                        <th>Credit</th>
                        <th>Debit</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <TxnForm doAddTxn={addTxn} />
                    {(txns && txns.length > 0) && txns.map(txn => (
                        txn.editable ?
                            <TxnForm key={txn.id} t={txn} isEditing={true} doSaveTxn={saveTxn} unmarkEditable={unmarkEditable} /> :
                            <TxnRow key={txn.id} t={txn} delTxn={delTxn} markEditable={markEditable} />
                    ))}
                </tbody>
            </table>

        </section>
    );
};

export default IncomeStatement;