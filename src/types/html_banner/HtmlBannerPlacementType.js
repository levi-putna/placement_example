import React from 'react'
import AbstractPlacementType from 'types/AbstractPlacementType'
import Button from 'component/button/Button'

import './html-banner-placement-type.scss'
import icon from './calc.png'

/**
 * Simple static banner campaign type.
 */
export default class HtmlBannerPlacementType extends AbstractPlacementType {

    static propTypes = {};

    state = {
        clicks: 0
    };

    constructor() {
        super();

        //You need to bind to this class, to insure that the correct method is called on this object.
        this.handleAdd = this.handleAdd.bind(this);
        this.handleMin = this.handleMin.bind(this);
    }

    static getName() {
        return 'HTML_BANNER';
    }

    handleAdd() {
        let {clicks} = this.state;
        this.setState({
            clicks: clicks + 1
        });
    }

    handleMin() {
        let {clicks} = this.state;
        this.setState({
            clicks: clicks - 1
        });
    }

    render() {

        let {clicks} = this.state;

        return (
            <div className="html-banner">
                <img className="html-banner__icon" src={icon} />
                <div className="html-banner__actions">
                    <Button block={true} onClick={this.handleAdd}>+</Button>
                    <Button block={true} onClick={this.handleMin} className="button--primary">-</Button>
                </div>
                <div className="html-banner__count">
                    <div className="html-banner__total">{clicks}</div>
                    <small className="html-banner__title">Click Value</small>
                </div>
            </div>
        );
    }
}