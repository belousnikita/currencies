import React from 'react';
import Button from './Button';
import axios from 'axios';
import Currency from './Currency';
import Block from './Block';
import Rainbow from 'rainbowvis.js';
import './styles/styles.scss';
import Result from './Result';

const header = (handler, state) => {
    const { isCurrencies, isConverter } = state;
    return <div className="head">
        <div className="Currencies">
            <Button type="currnecies" text="Курс" onClick={() => handler("currencies")} active={isCurrencies}>
                Курс
            <i className="fas fa-money-bill-alt" ></i>
            </Button>
        </div>
        <div className="Converter">
            <Button type="converter" text="Конвертер" onClick={() => handler("converter")} active={isConverter}>
                Конвертер
            <i className="fas fa-balance-scale" ></i>
            </Button>
        </div>
    </div>
};
const input = (value, onChange) => {
    return <form>
        <label className="input_label">
            UAH:
      <input className="input" value={value} type="text" name="UAH" onChange={(e) => onChange(e)} />
        </label>
    </form>
}
const getProperNumbers = (rate, base = 1) => {
    return base * rate >= base ? { rate, base } : getProperNumbers(rate * 10, base * 10);
}
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.colorPalette = new Rainbow();
        this.colorPalette.setSpectrum("#24346D", "#ea6970", "#93032E", "#AD7A99", "#034C3C", "#7FB7BE");
        this.colorPalette.setNumberRange(0, 14);
        this.state = {
            loaded: false,
            isCurrencies: true,
            isConverter: false,
            currencies: ["EUR", "USD", "RUB", "GBP", "DKK", "CHF", "PLN", "CAD", "SEK", "KZT", "BGN", "CNY", "HKD", "JPY"],
            value: ""
        }
    }
    inputHandler(event) {
        function isNumber(val) {
            return (val >= 0 || val < 0);
        }
        const { value } = event.target;
        if (isNumber(value) || value === '.')
            this.setState({ value });
    }
    selectCurrency(i) {
        const { currencies } = this.state;
        if (currencies[i]) {
            currencies[i].isSelected = !currencies[i].isSelected;
            this.setState({ currencies });
        }
    }
    componentWillMount() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const todayStr = `${yyyy}${mm}${dd}`;
        const currencies = this.state.currencies.map(async (c, i) =>
            axios.get(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${c}&date=${todayStr}&json`)
                .then(response => {
                    const data = response.data[0]
                    return { ...data, color: `#${this.colorPalette.colorAt(i)}`, isSelected: false }
                })
                .catch(error => console.log(error)));
        Promise.all(currencies).then((completed) => this.setState({ currencies: completed, loaded: true }));
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
        const { isCurrencies, isConverter, currencies, loaded, value } = this.state;
        return <div className="grid-container">
            {header(this.selectorHandler.bind(this), this.state)}
            <Block first left={isCurrencies} right={isConverter} color="#4A4DA5" zIndex={currencies.length + 1}>
                {isCurrencies && <div className="currency">Обрані валюти з'являться у конверторі</div>}
                {isConverter && input(value, this.inputHandler.bind(this))}
            </Block>
            {loaded && isCurrencies && currencies.map((c, i) => {
                if (c) {
                    const { rate, base } = getProperNumbers(c.rate);
                    return <Block key={i} left={isCurrencies} right={isConverter} color={c.color} zIndex={currencies.length - i}>
                        <Currency
                            name={c.cc}
                            fullName={c.txt}
                            buy={base}
                            sell={rate.toFixed(5)}
                            active={c.isSelected}
                            onClick={() => this.selectCurrency(i)}></Currency>
                    </Block>
                }
                else return null;
            })}
            {loaded && isConverter && currencies.map((c, i) => {
                if (c && c.isSelected)
                    return <Block key={i} left={isCurrencies} right={isConverter} color={c.color} zIndex={currencies.length - i}>
                        <Result
                            name={c.cc}
                            fullName={c.txt}
                            result={(parseFloat(value) / c.rate).toFixed(5)}
                        ></Result>
                    </Block>
                else return null;
            })}
        </div >
    }
}