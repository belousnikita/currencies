import React from 'react';
import Button from './Button';
import classnames from 'classnames';
import './styles.scss';

const header = (handler, state) => {
    const { isCurrencies, isConverter } = state;
    return <div className="Head">
        <div className="Currencies">
            <Button type="currnecies" text="Currencies" onClick={() => handler("currencies")} active={isCurrencies}>
                Currencies
            <i class="fas fa-money-bill-alt" ></i>
            </Button>
        </div>
        <div className="Converter">
            <Button type="converter" text="Converter" onClick={() => handler("converter")} active={isConverter}>
                Converter
            <i class="fas fa-balance-scale" ></i>
            </Button>
        </div>
    </div>
};

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCurrencies: true,
            isConverter: false,
        }
    }
    selectorHandler(type) {
        switch (type) {
            case "currencies": {
                this.setState({ isCurrencies: true, isConverter: false });
                return;
            }
            case "converter": {
                this.setState({ isCurrencies: false, isConverter: true });
                return;
            }
            default: return;
        }
    }
    render() {
        const { isCurrencies, isConverter } = this.state;
        const blockClassName = classnames('block', {
            left: isCurrencies,
            right: isConverter
        });
        const blockCornerClassName = classnames('corner', {
            left: isCurrencies,
            right: isConverter
        });
        return <div className="grid-container">
            {header(this.selectorHandler.bind(this), this.state)}
            <div className={blockClassName}>
                <div className={blockCornerClassName}></div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam tempora, animi consequuntur excepturi atque odit illum odio aspernatur cupiditate autem earum accusantium natus doloremqu
                e adipisci error voluptatum fugit omnis blanditiis.</p>
            </div>
        </div>
    }
}