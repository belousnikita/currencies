import React from 'react';

export default class Currency extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.buy = props.buy;
        this.sell = props.sell;
    }
    render() {
        return <div className="currency">
            <div className="currency_name">{this.name}</div>
            <div className="currency_value">
                <div className="currency_value_buy">{this.buy}</div>
                /
                <div className="currency_value_sell">{this.sell}</div>
            </div>
        </div>
    }
}
//