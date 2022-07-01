
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

export default TxnRow;