import { I18NEnvironment, i18nInit } from "@aidc-toolkit/core";
import aidcToolkitIcon from "@aidc-toolkit/core/resource/icon-288.png";
import type { ReactElement } from "react";
import { Image, Nav, Navbar } from "react-bootstrap";
import "./App.css";
import { AppComponent, appContext } from "./app_context.ts";
import { GS1IDKeyMenu } from "./GS1IDKey.tsx";
import { StringMenu } from "./String.tsx";
import "bootstrap/dist/css/bootstrap.css";

enum I18NState {
    None,
    Initializing,
    Initialized
}

let i18nState: I18NState = I18NState.None;

interface AppState {
    demoElement?: ReactElement | undefined;
}

export default class App extends AppComponent<object, AppState> {
    override state: AppState = {};

    override componentDidMount(): void {
        if (i18nState === I18NState.None) {
            i18nState = I18NState.Initializing;

            i18nInit(I18NEnvironment.Browser, true).then(() => {
                i18nState = I18NState.Initialized;

                // Force refresh.
                this.setState(state => ({
                    ...state
                }));
            }).catch((e: unknown) => {
                console.error(e);
            });
        }
    }

    setDemoElement(demoElement: ReactElement | undefined): void {
        this.setState(state => ({
            ...state,
            demoElement
        }));
    }

    reset(): void {
        this.context.inputValues.clear();
        this.setDemoElement(undefined);
    }

    override render(): ReactElement {
        return i18nState !== I18NState.Initialized ?
            <></> :
            <appContext.Provider value={{
                ...this.context,
                setDemoElement: this.setDemoElement.bind(this)
            }}>
                <Navbar className="d-flex" expand="lg">
                    <Navbar.Brand href="https://github.com/aidc-toolkit">
                        <Image
                            src={aidcToolkitIcon}
                            className="logo d-inline-block align-center"
                            alt="AIDC Toolkit logo"
                        />
                        AIDC Toolkit
                    </Navbar.Brand>
                    <Nav>
                        <StringMenu />
                    </Nav>
                    <Nav>
                        <GS1IDKeyMenu />
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link onClick={this.reset.bind(this)}>
                            Reset
                        </Nav.Link>
                    </Nav>
                </Navbar>
                { this.state.demoElement }
            </appContext.Provider>;
    }
}
