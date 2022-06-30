import { Component } from "react";

class TxnForm extends Component {
    constructor(props) {
        super(props);
        this.state = props.isEditing ? { ...props.t } :
            {
                id: 0,
                desp: '',
                type: '',
                amount: 0,
                dot: new Date()
            };
    }

    addBtnClicked = () => {
        this.props.doAddTxn({ ...this.state });
        this.setState({
            id: 0,
            desp: '',
            type: '',
            amount: 0,
            dot: new Date()
        });
    }

    saveBtnClicked = () => {
        this.props.doSaveTxn({ ...this.state });
    }

    cancelBtnClicked = () => {
        this.props.unmarkEditable(this.state.id);
    }

    render() {
        return (
            <tr>
                <td><input type="number" value={this.state.id} readOnly={this.props.isEditing}
                    onChange={e => this.setState({ id: parseInt(e.target.value) })} />
                </td>
                <td>
                    <input type="date"
                        value={this.state.dot.toISOString().substring(0, 10)}
                        onChange={e => this.setState({ dot: new Date(e.target.value) })}
                    />
                </td>
                <td><input type="text" value={this.state.desp}
                    onChange={e => this.setState({ desp: e.target.value })}
                />
                </td>
                <td onClick={e => this.setState({ type: 'CREDIT' })}>
                    {
                        this.state.type === 'CREDIT' &&
                        <input type="number" value={this.state.amount}
                            onChange={e => this.setState({ amount: parseInt(e.target.value) })}
                        />
                    }
                </td>
                <td onClick={e => this.setState({ type: 'DEBIT' })}>
                    {
                        this.state.type === 'DEBIT' &&
                        <input type="number" value={this.state.amount}
                            onChange={e => this.setState({ amount: parseInt(e.target.value) })}
                        />
                    }
                </td>

                {this.props.isEditing ?
                    (
                        <td>
                            <button className="btn btn-sm btn-primary" onClick={e => this.saveBtnClicked()}>SAVE</button>
                            <button className="btn btn-sm btn-danger" onClick={e => this.cancelBtnClicked()}>CANCEL</button>
                        </td>
                    ) :
                    (
                        <td>
                            <button className="btn btn-sm btn-primary" onClick={e => this.addBtnClicked()}>ADD</button>
                        </td>
                    )
                }
            </tr>

        );
    }
}

export default TxnForm;