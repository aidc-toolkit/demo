import { I18NEnvironment, i18nInit } from "@aidc-toolkit/core";
import aidcToolkitIcon from "@aidc-toolkit/core/resource/icon-288.png";
import type { ReactElement } from "react";
import { Image, Nav, Navbar } from "react-bootstrap";
import "./App.css";
import packageConfig from "../package.json";
import { AppComponent, appContext } from "./app_context.ts";
import { GS1IDKeyMenu } from "./GS1IDKey.tsx";
import { StringMenu } from "./String.tsx";
import "bootstrap/dist/css/bootstrap.css";

interface AppState {
    i18nInitialized: boolean;
    demoElement?: ReactElement | undefined;
}

export default class App extends AppComponent<object, AppState> {
    override state: AppState = {
        i18nInitialized: false
    };

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

    override componentDidMount(): void {
        i18nInit(I18NEnvironment.Browser, true).then((initialized) => {
            if (initialized) {
                // Force refresh.
                this.setState(state => ({
                    ...state,
                    i18nInitialized: initialized
                }));
            }
        }).catch((e: unknown) => {
            console.error(e);
            alert(e);
        });
    }

    override render(): ReactElement {
        return this.state.i18nInitialized ?
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
                        {`AIDC Toolkit v${packageConfig.version}`}
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
            </appContext.Provider> :
            <></>;
    }
}
