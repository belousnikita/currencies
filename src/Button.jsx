import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
export default class Button extends React.Component {
    render() {
        const { className, text, onClick, active, children } = this.props;
        const classNameResult = classNames(className || "button", {
            active: active || false,
        })
        return <div className={classNameResult} onClick={onClick}>{children}</div>
    }
}
Button.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
}