import { Component, type ContextType, createContext, type ReactElement } from "react";

/**
 * Application context.
 */
interface Context {
    /**
     * Demo element.
     */
    demoElement: ReactElement | undefined;

    /**
     * Cached input values, carried between forms to simplify input.
     */
    inputValuesMap: Map<string, string>;
}

/**
 * Application context.
 */
export const AppContext = createContext<Context>({
    demoElement: undefined,
    inputValuesMap: new Map()
});

/**
 * Abstract application component. Anything that needs access to the context, including the application itself, extends
 * this class.
 */
export abstract class AppComponent<P = object, S = object> extends Component<P, S> {
    /**
     * Context type (overridden).
     */
    static override contextType = AppContext;

    /**
     * Context redeclaration with overridden type.
     */
    declare context: ContextType<typeof AppComponent.contextType>;
}
