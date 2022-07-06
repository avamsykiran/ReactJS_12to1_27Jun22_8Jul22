import { Fragment } from 'react';
import { connect} from 'react-redux';

const TxnSummary = ({ totalCredit, totalDebit, balance }) => (
    <Fragment>
        <tr>
            <td className='text-end' colSpan={3}><strong>Total</strong></td>
            <td className='text-end'>{totalCredit}</td>
            <td className='text-end'>{totalDebit}</td>
            <td></td>
        </tr>
        <tr>
            <td className='text-end' colSpan={4}><strong>Balance</strong></td>
            <td className='text-end'>{balance}</td>
            <td></td>
        </tr>
    </Fragment>
);

const mapStateToProps = state => ({
    totalCredit:state.totalCredit,
    totalDebit:state.totalDebit,
    balance:state.balance
});
const mapDispatchToProps = null;

export default connect(mapStateToProps,mapDispatchToProps)(TxnSummary);