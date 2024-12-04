import { I18NEnvironment, i18nInit } from "@aidc-toolkit/core";
import aidcToolkitIcon from "@aidc-toolkit/core/resource/icon-288.png";
import type { ReactElement } from "react";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import "./App.css";
import packageConfig from "../package.json";
import { AppComponent, appContext } from "./app-context.ts";
import { GS1IDKeyMenu } from "./GS1IDKey.tsx";
import i18next, { demoNS } from "./locale/i18n.ts";
import { StringMenu } from "./String.tsx";
import "bootstrap/dist/css/bootstrap.css";

/**
 * Application state.
 */
interface AppState {
    /**
     * True if internationalization has been initialized.
     */
    i18nInitialized: boolean;

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
 */
export default class App extends AppComponent<object, AppState> {
    /**
     * Application state.
     */
    override state: AppState = {
        i18nInitialized: false,
        navbarExpanded: false
    };

    /**
     * Set the navigation bar expanded state.
     *
     * @param navbarExpanded
     * True if navigation bar is expanded.
     */
    setNavbarExpanded(navbarExpanded: boolean): void {
        this.setState(state => ({
            ...state,
            navbarExpanded
        }));
    }

    /**
     * Reset the application by clearing all cached input values and the demo element.
     */
    reset(): void {
        this.context.inputValues.clear();
        this.setState(state => ({
            ...state,
            demoElement: undefined
        }));
    }

    /**
     * Initialize internationalization and force refresh once initialized.
     */
    override componentDidMount(): void {
        i18nInit(I18NEnvironment.Browser, true).then((initialized) => {
            if (initialized) {
                // Force refresh.
                this.setState(state => ({
                    ...state,
                    i18nInitialized: initialized
                }));

                document.title = i18next.t("App.title", {
                    ns: demoNS
                });
            }
        }).catch((e: unknown) => {
            console.error(e);
            alert(e);
        });
    }

    /**
     * Render the application.
     *
     * @returns
     * Application.
     */
    override render(): ReactElement {
        const title = i18next.t("App.titleVersion", {
            ns: demoNS,
            version: packageConfig.version
        });

        const appState = this.state;
        const appSetState = this.setState.bind(this);

        return this.state.i18nInitialized ?
            <appContext.Provider value={{
                ...this.context,
                get demoElement(): ReactElement | undefined {
                    return appState.demoElement;
                },
                set demoElement(demoElement: ReactElement | undefined) {
                    appSetState(state => ({
                        ...state,
                        // Force complete collapse of navigation bar.
                        navbarExpanded: false,
                        demoElement
                    }));
                }
            }}>
                <title>{title}</title>
                <Navbar
                    className="d-flex"
                    expand="md"
                    expanded={this.state.navbarExpanded}
                    onToggle={(expanded) => {
                        this.setNavbarExpanded(expanded);
                    }}
                >
                    <Container>
                        <Navbar.Brand href="https://github.com/aidc-toolkit">
                            <Image
                                src={aidcToolkitIcon}
                                className="logo d-inline-block align-center"
                                alt={i18next.t("App.logoAlt", {
                                    ns: demoNS
                                })}
                            />
                            {title}
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
                                    this.reset();
                                }}>
                                    {i18next.t("App.reset", {
                                        ns: demoNS
                                    })}
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                {this.state.demoElement}
            </appContext.Provider> :
            <></>;
    }
}
