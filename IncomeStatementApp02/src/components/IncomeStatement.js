import { useState } from 'react';
import TxnForm from './TxnForm';
import TxnRow from './TxnRow';

const IncomeStatement = (props) => {
    let [txns, setTxns] = useState(
        [
            { id: 1, desp: 'Salary', type: 'CREDIT', amount: 67000, dot: new Date('2020-06-01') },
            { id: 2, desp: 'Rent', type: 'DEBIT', amount: 7000, dot: new Date('2020-06-01') },
            { id: 3, desp: 'Fuel', type: 'DEBIT', amount: 3000, dot: new Date('2020-06-02') },
            { id: 4, desp: 'Bonus', type: 'CREDIT', amount: 27000, dot: new Date('2020-06-03') },
            { id: 5, desp: 'Bithday Party', type: 'DEBIT', amount: 6700, dot: new Date('2020-06-03') },
            { id: 6, desp: 'Mutual Funds Divident', type: 'CREDIT', amount: 7800, dot: new Date('2020-06-04') },
            { id: 7, desp: 'Mobile Recharge', type: 'DEBIT', amount: 999, dot: new Date('2020-06-04') },
            { id: 8, desp: 'Grocerries', type: 'DEBIT', amount: 21000, dot: new Date('2020-06-05') }
        ]
    );


    const delTxn = txnId => {
        setTxns(txns.filter(t => t.id !== txnId));
    };

    const addTxn = txn => {
        setTxns([...txns, txn]);
    }

    const saveTxn = txn => {
        setTxns(txns.map(t => t.id !== txn.id ? t : { ...txn, editable: undefined }));
    }

    const markEditable = txnId => {
        setTxns(txns.map(t => t.id !== txnId ? t : { ...t, editable: true }));
    }

    const unmarkEditable = txnId => {
        setTxns(txns.map(t => t.id !== txnId ? t : { ...t, editable: undefined }));
    }

    return (
        <section className='container-fluid p-4'>
            <h4>Income Statement</h4>

            {(!txns || txns.length === 0) &&
                <div className='alert alert-info p-3'>
                    <strong>No Transactiosn recorded!</strong>
                </div>
            }

            {(txns && txns.length > 0) &&
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
                        {txns.map(txn => (
                            txn.editable ?
                                <TxnForm key={txn.id} t={txn} isEditing={true} doSaveTxn={saveTxn} unmarkEditable={unmarkEditable} /> :
                                <TxnRow key={txn.id} t={txn} delTxn={delTxn} markEditable={markEditable} />
                        ))}
                    </tbody>
                </table>
            }
        </section>
    );
};

export default IncomeStatement;