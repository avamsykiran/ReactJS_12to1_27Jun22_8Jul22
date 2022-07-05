import {  useState } from "react";
import {connect} from 'react-redux';
import {createAddTxnAction,createSaveTxnAction,createUnMarkEditTxnAction} from '../reducer/ActionFactory';

const TxnForm = ({ isEditing, t, doAddTxn, doSaveTxn, unmarkEditable }) => {

    let [txn, setTxn] = useState(
        isEditing ? { ...t } :
            {
                id: 0,
                desp: '',
                type: '',
                amount: 0,
                dot: new Date()
            }
    );

    const addBtnClicked = () => {
        doAddTxn({ ...txn });
        setTxn({
            id: 0,
            desp: '',
            type: '',
            amount: 0,
            dot: new Date()
        });
    }

    const saveBtnClicked = () => doSaveTxn({ ...txn });

    const cancelBtnClicked = () => unmarkEditable(txn.id);

    return (
        <tr>
            <td><input type="number" value={txn.id} readOnly={isEditing}
                onChange={e => setTxn({...txn, id: parseInt(e.target.value) })} />
            </td>
            <td>
                <input type="date"
                    value={txn.dot.toISOString().substring(0, 10)}
                    onChange={e => setTxn({...txn, dot: new Date(e.target.value) })}
                />
            </td>
            <td><input type="text" value={txn.desp}
                onChange={e => setTxn({...txn, desp: e.target.value })}
            />
            </td>
            <td onClick={e => setTxn({...txn, type: 'CREDIT' })}>
                {
                    txn.type === 'CREDIT' &&
                    <input type="number" value={txn.amount}
                        onChange={e => setTxn({...txn, amount: parseInt(e.target.value) })}
                    />
                }
            </td>
            <td onClick={e => setTxn({...txn, type: 'DEBIT' })}>
                {
                    txn.type === 'DEBIT' &&
                    <input type="number" value={txn.amount}
                        onChange={e => setTxn({...txn, amount: parseInt(e.target.value) })}
                    />
                }
            </td>

            {isEditing ?
                (
                    <td>
                        <button className="btn btn-sm btn-primary" onClick={e =>saveBtnClicked()}>SAVE</button>
                        <button className="btn btn-sm btn-danger" onClick={e => cancelBtnClicked()}>CANCEL</button>
                    </td>
                ) :
                (
                    <td>
                        <button className="btn btn-sm btn-primary" onClick={e => addBtnClicked()}>ADD</button>
                    </td>
                )
            }
        </tr>

    );
};


const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
    doAddTxn: txn => dispatch(createAddTxnAction(txn)), 
    doSaveTxn: txn => dispatch(createSaveTxnAction(txn)),
    unmarkEditable: txnId => dispatch(createUnMarkEditTxnAction(txnId))
});

export default connect(mapStateToProps,mapDispatchToProps)(TxnForm);