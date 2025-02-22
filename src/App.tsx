import { I18NEnvironment } from "@aidc-toolkit/core";
import aidcToolkitIcon from "@aidc-toolkit/core/resource/icon-256.png";
import { createContext, type ReactElement, useContext, useEffect, useState } from "react";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import "./App.css";
import packageConfig from "../package.json";
import { Menu as GS1IDKeyMenu } from "./gs1idkey/Menu.tsx";
import { i18nDemoInit, i18nextDemo } from "./locale/i18n.ts";
import "bootstrap/dist/css/bootstrap.css";
import { Menu as StringMenu } from "./string/Menu.tsx";

/**
 * Application context.
 */
interface Context {
    /**
     * Cached input values, carried between forms to simplify input.
     */
    readonly inputValuesMap: Map<string, string>;

    /**
     * Demo element.
     */
    demoElement?: ReactElement | undefined;
}

/**
 * Application state.
 */
interface State {
    /**
     * True if internationalization has been initialized.
     */
    isI18nInitialized: boolean;

    /**
     * True if navigation bar is expanded.
     */
    navbarExpanded: boolean;

    /**
     * Demo element, set by menu item selection.
     */
    demoElement?: ReactElement | undefined;
}

/**
 * Application.
 *
 * @returns
 * React element.
 */
export function App(): ReactElement {
    const appContext = useContext(App.Context);

    const [state, setState] = useState<State>({
        isI18nInitialized: i18nextDemo.isInitialized,
        navbarExpanded: false
    });

    /**
     * Set the navigation bar expanded state.
     *
     * @param navbarExpanded
     * True if navigation bar is expanded.
     */
    function setNavbarExpanded(navbarExpanded: boolean): void {
        setState(state => ({
            ...state,
            navbarExpanded
        }));
    }

    /**
     * Reset the application by clearing all cached input values and the demo element.
     */
    function reset(): void {
        appContext.inputValuesMap.clear();

        setState(state => ({
            ...state,
            demoElement: undefined
        }));
    }

    useEffect(() => {
        if (!state.isI18nInitialized) {
            i18nDemoInit(I18NEnvironment.Browser).then(() => {
                // Force refresh.
                setState(state => ({
                    ...state,
                    isI18nInitialized: true
                }));

                document.title = i18nextDemo.t("App.title");
            }).catch((e: unknown) => {
                console.error(e);
                alert(e);
            });
        }
    });

    return state.isI18nInitialized ?
        <App.Context.Provider value={{
            ...appContext,
            get demoElement(): ReactElement | undefined {
                return state.demoElement;
            },
            set demoElement(demoElement: ReactElement | undefined) {
                setState(state => ({
                    ...state,
                    // Force complete collapse of navigation bar.
                    navbarExpanded: false,
                    demoElement
                }));
            }
        }}>
            <Navbar
                className="d-flex"
                expand="md"
                expanded={state.navbarExpanded}
                onToggle={(expanded) => {
                    setNavbarExpanded(expanded);
                }}
            >
                <Container>
                    <Navbar.Brand href="https://github.com/aidc-toolkit">
                        <Image
                            src={aidcToolkitIcon}
                            className="logo d-inline-block align-center"
                            alt={i18nextDemo.t("App.logoAlt")}
                        />
                        {i18nextDemo.t("App.titleVersion", {
                            version: packageConfig.version
                        })}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <StringMenu />
                        </Nav>
                        <Nav className="me-auto">
                            <GS1IDKeyMenu />
                        </Nav>
                        <Nav className="ms-auto">
                            <Nav.Link onClick={() => {
                                reset();
                            }}>
                                {i18nextDemo.t("App.reset")}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {state.demoElement}
        </App.Context.Provider> :
        <></>;
}

/**
 * Context.
 */
App.Context = createContext<Context>({
    inputValuesMap: new Map()
});
