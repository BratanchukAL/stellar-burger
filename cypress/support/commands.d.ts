import { mount } from 'cypress/react'
import {TApplicationActions} from "components/providers/store";


// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
    namespace Cypress {
        interface Chainable {
            mount: typeof mount,
            initApp(): never,
            AppDispatch: (action: TApplicationActions) => void
        }
    }
}
