import React from 'react'

/**
 * The base placement type component, as we start to add more and more functionality to placement types, we can start
 * to store common functionality here.
 */
export default class AbstractPlacementType extends React.Component  {

    constructor() {
        super();
    }

    /**
     * Extending components should override this method and return the unique naming identity of this placement type.
     *
     * example `return 'sample-component'`
     *
     * @returns {string}
     */
    static getName() {}

    /**
     * Extending Components should override this method and return the placement content.
     * @returns {null}
     */
    render() {
        return null;
    }
}