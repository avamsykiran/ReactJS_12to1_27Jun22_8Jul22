import {Component} from 'react';
import TxnForm from './Txnform';

class IncomeStatement extends Component {
    constructor(props){
        super(props);
        this.state={
            txns:[
                {id:1,desp:'Salary',type:'CREDIT',amount:67000,dot:new Date('2020-06-01')},
                {id:2,desp:'Rent',type:'DEBIT',amount:7000,dot:new Date('2020-06-01')},
                {id:3,desp:'Fuel',type:'DEBIT',amount:3000,dot:new Date('2020-06-02')},
                {id:4,desp:'Bonus',type:'CREDIT',amount:27000,dot:new Date('2020-06-03')},
                {id:5,desp:'Bithday Party',type:'DEBIT',amount:6700,dot:new Date('2020-06-03')},
                {id:6,desp:'Mutual Funds Divident',type:'CREDIT',amount:7800,dot:new Date('2020-06-04')},
                {id:7,desp:'Mobile Recharge',type:'DEBIT',amount:999,dot:new Date('2020-06-04')},
                {id:8,desp:'Grocerries',type:'DEBIT',amount:21000,dot:new Date('2020-06-05')}
            ]
        };
    }

    delTxn = txnId => {
        this.setState({txns: this.state.txns.filter(t => t.id!==txnId)});
    };

    addTxn = txn => {
        this.setState({txns:[...this.state.txns,txn]});
    }

    render(){
        let txns = this.state.txns;

        return (
            <section className='container-fluid p-4'>
                <h4>Income Statement</h4>

                {(!txns || txns.length===0) && 
                    <div className='alert alert-info p-3'>
                        <strong>No Transactiosn recorded!</strong>
                    </div>
                }
                
                {(txns && txns.length>0) && 
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
                            <TxnForm doAddTxn={this.addTxn} />
                            {txns.map(t => (
                                <tr key={t.id}>
                                    <td className='text-end'>{t.id}</td>
                                    <td className='text-center'>{t.dot.toLocaleDateString()}</td>
                                    <td>{t.desp}</td>
                                    <td className='text-end'>{t.type==='CREDIT'?t.amount:''}</td>
                                    <td className='text-end'>{t.type==='DEBIT'?t.amount:''}</td>
                                    <td>
                                        <button 
                                            type="button" 
                                            className='btn btn-sm btn-danger'
                                            onClick={event => this.delTxn(t.id)}>
                                            DELETE
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </section>
        );
    }
}

export default IncomeStatement;