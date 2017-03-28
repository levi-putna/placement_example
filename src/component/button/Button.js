import React from "react"
import classNames from 'classnames'

import './button.scss'

export default class Button extends React.Component {

    static propTypes = {
        loading: React.PropTypes.bool,
        block: React.PropTypes.bool,
    };

    constructor(props) {
        super(props);
    }

    render() {
        let {children, className, loading, onClick, disabled, block} = this.props;

        const classes = classNames('button', {
            'button--block': block,
            'button--loading': loading,
        }, className)

        if (loading) {
            children = 'please wait...'
        }

        return (
            <button disabled={ (disabled || loading) } className={ classes } onClick={onClick}
                    type="submit">
                { children }
            </button>
        );
    }
}
