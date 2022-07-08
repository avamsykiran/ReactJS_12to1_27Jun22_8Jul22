import TxnForm from './TxnForm';
import TxnRow from './TxnRow';
import { connect } from 'react-redux';
import TxnSummary from './TxnSummary';
import { useEffect } from 'react';
import { createLoadTxnsAction } from '../reducer/ActionFactory'

const IncomeStatement = ({ txns, errMsg, shallWait, loadTxns }) => {

    useEffect(loadTxns, []);

    return (
        <section className='container-fluid p-4'>
            <h4>Income Statement</h4>

            {shallWait &&
                <div className='alert alert-info p-3'>
                    <strong>Please wait while excuting an operation....!</strong>
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
                    <TxnForm />
                    {txns && txns.length > 0 && txns.map(txn => (
                        txn.editable ?
                            <TxnForm key={txn.id} t={txn} isEditing={true} /> :
                            <TxnRow key={txn.id} t={txn} />
                    ))}
                </tbody>
                <tfoot>
                    <TxnSummary />
                </tfoot>
            </table>
        </section>
    )
};

const mapStateToProps = state => ({ txns: state.txns,shallWait: state.shallWait,errMsg:state.errMsg });
const mapDispatchToProps = dispatch => ({ loadTxns : () => dispatch(createLoadTxnsAction())});;

export default connect(mapStateToProps, mapDispatchToProps)(IncomeStatement);