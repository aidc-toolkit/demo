import { Component, type ContextType, createContext, type ReactElement } from "react";

/**
 * Application context.
 */
export interface AppContext {
    /**
     * Demo element.
     */
    demoElement: ReactElement | undefined;

    /**
     * Cached input values, carried between forms simplify input.
     */
    inputValues: Map<string, string>;
}

/**
 * Application context.
 */
export const appContext = createContext<AppContext>({
    demoElement: undefined,
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
}
