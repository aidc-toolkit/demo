import { Component, type ContextType, createContext, type ReactElement } from "react";

/**
 * Application context.
 */
export interface AppContext {
    /**
     * Callback to set the demo element.
     *
     * @param demoElement
     * Demo element.
     */
    setDemoElement: (demoElement: ReactElement | undefined) => void;

    /**
     * Cached input values, carried from form to simplify input.
     */
    inputValues: Map<string, string>;
}

/**
 * Application context.
 */
export const appContext = createContext<AppContext>({
    setDemoElement: () => {
    },
    inputValues: new Map()
});

/**
 * Abstract application component. Anything that needs access to the context, including the application itself, extends
 * this class.
 */
export abstract class AppComponent<P = object, S = object> extends Component<P, S> {
    /**
     * Context type (overridden).
     */
    static override contextType = appContext;

    /**
     * Context redeclaration with overridden type.
     */
    declare context: ContextType<typeof AppComponent.contextType>;

    /**
     * Set the demo element.
     *
     * @param demoElement
     * Demo element.
     */
    setDemoElement(demoElement: ReactElement): void {
        this.context.setDemoElement(demoElement);
    }
}
