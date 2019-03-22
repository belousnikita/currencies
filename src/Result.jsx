import React from 'react';
export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.fullName = props.fullName;
    }
    render() {
        const { result } = this.props;
        return <div className="currency result">
            <div className="currency_name">{this.name}</div>
            <div className="currency_value">
                {result > 0 && <div className="currency_result">{`${result} ${this.name}`}</div>}
            </div>
        </div>
    }
}