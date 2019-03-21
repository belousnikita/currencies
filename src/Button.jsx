import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
export default class Button extends React.Component {
    render() {
        const { className, onClick, active, children } = this.props;
        const classNameResult = classNames(className || "button", {
            active: active || false,
        })
        return <button className={classNameResult} onClick={onClick}>{children}</button>
    }
}
Button.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
}