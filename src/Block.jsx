import React from 'react';
import classnames from 'classnames';
export default class Block extends React.Component {
    render() {
        const { children, color, zIndex, left, right, first } = this.props;
        const blockClassName = classnames('block', {
            first,
            left,
            right
        });
        const blockCornerClassName = classnames('corner', {
            first,
            left,
            right
        });
        return <div className={blockClassName} style={{ zIndex, backgroundColor: color }}>
            <div className={blockCornerClassName} style={{ zIndex, border: color }}></div>
            {children}
        </div>
    }
}