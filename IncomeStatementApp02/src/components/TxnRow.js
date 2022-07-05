import {connect} from 'react-redux';
import {createMarkEditTxnAction,createDelTxnAction} from '../reducer/ActionFactory';

const TxnRow = ({t,delTxn,markEditable}) => (
    <tr>
        <td className='text-end'>{t.id}</td>
        <td className='text-center'>{t.dot.toLocaleDateString()}</td>
        <td>{t.desp}</td>
        <td className='text-end'>{t.type === 'CREDIT' ? t.amount : ''}</td>
        <td className='text-end'>{t.type === 'DEBIT' ? t.amount : ''}</td>
        <td>
            <button
                type="button"
                className='btn btn-sm btn-secondary'
                onClick={event => markEditable(t.id)}>
                EDIT
            </button>
            <button
                type="button"
                className='btn btn-sm btn-danger'
                onClick={event => delTxn(t.id)}>
                DELETE
            </button>
        </td>
    </tr>
);

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
    delTxn : txnId => dispatch(createDelTxnAction(txnId)),
    markEditable : txnId => dispatch(createMarkEditTxnAction(txnId))
});

export default connect(mapStateToProps,mapDispatchToProps)(TxnRow);