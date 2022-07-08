import {LOAD_TXN,WAIT,ERROR,MARK_EDIT_TXN,UNMARK_EDIT_TXN} from './ActionTypes';

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
    txns: null,
    errMsg: null,
    shallWait:false
});

const TxnsReducer = (oldState=initState(),action) => {

    let txns = oldState.txns!==null ? [...oldState.txns]:null;
    let errMsg= oldState.errMsg;
    let shallWait=oldState.shallWait;

    switch(action.type){
        case LOAD_TXN:
            txns = [...action.txns];
            shallWait=false;
        case ERROR:
            errMsg=action.errMsg;
            shallWait=false;
            break;
        case WAIT:
            shallWait=true;
            break;
        case MARK_EDIT_TXN:
            txns = oldState.txns.map(t => t.id!=action.txnId?t:{...t,editable:true});
            break;
        case UNMARK_EDIT_TXN:
            txns = oldState.txns.map(t => t.id!=action.txnId?t:{...t,editable:undefined});
            break;
    }

    let totalCredit = cumulate(txns,"CREDIT");
    let totalDebit = cumulate(txns,"DEBIT");
    let balance = totalCredit - totalDebit;

    return {txns,totalCredit,totalDebit,balance,errMsg,shallWait};

};

export default TxnsReducer;