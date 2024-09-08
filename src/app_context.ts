import { Component, type ContextType, createContext, type ReactElement } from "react";

export interface AppContext {
    setDemoElement: (demoElement: ReactElement | undefined) => void;
    inputValues: Map<string, string>;
}

export const appContext = createContext<AppContext>({
    setDemoElement: () => {
    },
    inputValues: new Map()
});

export abstract class AppComponent<P = object, S = object> extends Component<P, S> {
    static override contextType = appContext;

    declare context: ContextType<typeof appContext>;
}
