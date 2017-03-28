import React from 'react'
import AbstractPlacement from './AbstractPlacement'

import StaticBannerPlacementType from 'types/static_banner/StaticBannerPlacementType'
import HtmlBannerPlacementType from 'types/html_banner/HtmlBannerPlacementType'

import './placement.scss'

/**
 * Cart placement.
 */
export default class CartPlacement extends AbstractPlacement {

    static propTypes = {
        customer_id: React.PropTypes.number,
        pricing_id: React.PropTypes.number,
        cart: React.PropTypes.object
    };

    static defaultProps = {
        cart: {}
    };

    state = {
        type: null,
        config: null
    };

    constructor() {
        super();
    }

    /**
     * Once the component is mounted, determine how it should be configured.
     */
    componentDidMount() {
        //You cant access props before the component is mounted, so we can t call this from within the constructor.
        this.getPlacementConfiguration();
    }

    /**
     * Make a request to the rumble api with the details of the placement we want to deal with. Then update the component
     * state so that it will trigger a rerender.
     */
    getPlacementConfiguration(){
        let {customer_id, pricing_id, cart} = this.props;

        /*
            In a real application we would make an API call to Rumble with te placement information
            something like this

            `api.getPlacementConfiguration('cart', customer_id, pricing_id, cart); `

            The params would have been passed in as component props, see `let {customer_id, pricing_id, cart} = this.props;`
         */

        //We will use a timeout to simulate an API request being made.
        setTimeout(() => {

            //Fake API response.

            let type_config = {};
            let rand = Math.floor(Math.random() * 2);
            console.log(rand)
            switch(rand)
            {
                case 0:
                     type_config = {
                        type: StaticBannerPlacementType.getName(),
                        data : {
                            image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=Sample%20Placement%20Image&w=800&h=150',
                            link: 'https://www.google.com.au/'
                        }
                    };
                    break;
                case 1:
                     type_config = {
                        type: HtmlBannerPlacementType.getName(),
                        data : {}
                    };
                    break;
            }



            //Update the component state with the config information returned from the api. This will update the
            // virtual dom and tiger the component to re-render.
            this.setState({
                type: type_config.type,
                config: type_config.data
            })

        }, 4000);

    }

    /**
     * Process the configuration returned by the API, and decide what campaign type to render. or null if we don't
     * know how to handle that campaign type on this component.
     */
    getPlacementCampaign(){

        let {type, config} = this.state;

        switch(type) {
            case StaticBannerPlacementType.getName():
                return <StaticBannerPlacementType image={config.image} link={config.link}/>
                break;
            case HtmlBannerPlacementType.getName():
                return <HtmlBannerPlacementType />
                break;
            default:
                return null;
        }

    }

    /**
     * Reprehend a loading state for this component. This can return null for an empty loading element, or  render a
     * common loading component if needed.
     * @returns {XML}
     */
    getLoadingState(){
        return (
            <div className="cart-placement__loading">
                <span>This placement is loading...</span>
            </div>
        )
    }

    /**
     * This is the guts of the component, this method is called whenever props or state changes for this component.
     *
     * This method with result ina complete re-render of the components html.
     *
     * @returns {*}
     */
    render() {

        let {type, config} = this.state;

        if(!type && !config){
            return this.getLoadingState();
        }

        return this.getPlacementCampaign();
    }
}