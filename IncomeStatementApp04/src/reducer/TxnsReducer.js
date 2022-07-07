import {ADD_TXN,SAVE_TXN,DEL_TXN,MARK_EDIT_TXN,UNMARK_EDIT_TXN} from './ActionTypes';

const cumulate = (txns,txnType) => {
    let sum =0;

    if(txns && txns.length>0){
        let filteredTxns = txns.filter(t => t.type===txnType);
        if(filteredTxns && filteredTxns.length>0) {
            sum = filteredTxns.map(t => t.amount).reduce((a1,a2) => a1+a2);
        }
    }

    return sum;
}; 

const initState = () => ({
    txns: [
        { id: 1, desp: 'Salary', type: 'CREDIT', amount: 67000, dot: new Date('2020-06-01') },
        { id: 2, desp: 'Rent', type: 'DEBIT', amount: 7000, dot: new Date('2020-06-01') },
        { id: 3, desp: 'Fuel', type: 'DEBIT', amount: 3000, dot: new Date('2020-06-02') },
        { id: 4, desp: 'Bonus', type: 'CREDIT', amount: 27000, dot: new Date('2020-06-03') },
        { id: 5, desp: 'Bithday Party', type: 'DEBIT', amount: 6700, dot: new Date('2020-06-03') },
        { id: 6, desp: 'Mutual Funds Divident', type: 'CREDIT', amount: 7800, dot: new Date('2020-06-04') },
        { id: 7, desp: 'Mobile Recharge', type: 'DEBIT', amount: 999, dot: new Date('2020-06-04') },
        { id: 8, desp: 'Grocerries', type: 'DEBIT', amount: 21000, dot: new Date('2020-06-05') }
    ]
});

const TxnsReducer = (oldState=initState(),action) => {

    let txns = null;

    switch(action.type){
        case ADD_TXN:
            txns = [...oldState.txns,action.txn];
            break;
        case SAVE_TXN:
            txns = oldState.txns.map(t => t.id!=action.txn.id?t:{...action.txn,editable:undefined});
            break;
        case DEL_TXN:
            txns = oldState.txns.filter(t => t.id!=action.txnId);
            break;
        case MARK_EDIT_TXN:
            txns = oldState.txns.map(t => t.id!=action.txnId?t:{...t,editable:true});
            break;
        case UNMARK_EDIT_TXN:
            txns = oldState.txns.map(t => t.id!=action.txnId?t:{...t,editable:undefined});
            break;
        default:
            txns = [...oldState.txns];
            break;
    }

    let totalCredit = cumulate(txns,"CREDIT");
    let totalDebit = cumulate(txns,"DEBIT");
    let balance = totalCredit - totalDebit;

    return {txns,totalCredit,totalDebit,balance};

};

export default TxnsReducer;