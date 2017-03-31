import React from "react"
import {render} from "react-dom"

import CartPlacement from "placement/CartPlacement"

/**
 * This is the main entry point when using Rumble placement as a standalone libary. It will manage the full react lifecycle on its own.
 * If you are integrating Rumble with an existing React project, you should use the placement components directly.
 */
function main() {

    //Target the dome elements you want to mount a placement to.
    const CART_MOUNT_NODE = document.getElementById('cart-placement');
    render(<CartPlacement />, CART_MOUNT_NODE);

    //Target the dome elements you want to mount a placement to.
    const HERO_MOUNT_NODE = document.getElementById('hero-placement');
    render(<CartPlacement />, HERO_MOUNT_NODE);
}

/**
 * Listen for the application load event before initialising the placements.
 */
window.addEventListener("load", () => {
    main();
});
