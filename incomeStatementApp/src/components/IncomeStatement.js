import {Component} from 'react';

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

    render(){
        return (
            <section className='container-fluid p-4'>
                <h4>Income Statement</h4>
            </section>
        );
    }
}

export default IncomeStatement;