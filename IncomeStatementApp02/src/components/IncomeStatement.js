import TxnForm from './TxnForm';
import TxnRow from './TxnRow';
import {connect} from 'react-redux';

const IncomeStatement = ({ txns }) => (
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
                    <TxnForm />
                    {txns.map(txn => (
                        txn.editable ?
                            <TxnForm key={txn.id} t={txn} isEditing={true} /> :
                            <TxnRow key={txn.id} t={txn} />
                    ))}
                </tbody>
            </table>
        }
    </section>
);

const mapStateToProps = state => ({txns:state.txns});
const mapDispatchToProps = null;

export default connect(mapStateToProps,mapDispatchToProps)(IncomeStatement);