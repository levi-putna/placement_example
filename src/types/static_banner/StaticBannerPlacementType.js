import React from 'react'
import AbstractPlacementType from 'types/AbstractPlacementType'

import './static-banner-placement-type.scss';

/**
 * Simple static banner campaign type.
 */
export default class StaticBannerPlacementType extends AbstractPlacementType {

    static propTypes = {
        image: React.PropTypes.string.isRequired,
        link: React.PropTypes.string.isRequired
    };

    constructor() {
        super();
    }

    static getName() {
        return 'STATIC_BANNER';
    }

    render() {

        let {image, link } = this.props;

        return (
            <div className="static-banner">
                <a href={link} >
                    <img src={image} />
                </a>
            </div>
        );
    }
}