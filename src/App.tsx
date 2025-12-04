import AIDCToolkitIcon from "@aidc-toolkit/core/resource/icon.svg?react";
import { Home as HomeIcon, RestartAlt as RestartAltIcon } from "@mui/icons-material";
import { AppBar, Box, Icon, IconButton, Menu, Toolbar, Typography } from "@mui/material";
import { createContext, type ReactElement, useContext, useRef, useState } from "react";
import packageConfig from "../package.json";
import { GS1_IDENTIFIER_MENU_ITEM, type GS1IdentifierFormProperties } from "./gs1identifier/menu-item";
import { i18nextDemo } from "./locale/i18n";
import type { MenuItemPropertiesArray } from "./menu-item";
import { MenuItems } from "./MenuItems";
import { STRING_MENU_ITEM, type StringFormProperties } from "./string/menu-item";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

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
    demoElement: ReactElement | undefined;
}

/**
 * Application.
 *
 * @returns
 * React element.
 */
export function App(): ReactElement {
    const appContext = useContext(App.Context);

    // Cached input values must be preserved across calls.
    const inputValuesMap = appContext.inputValuesMap;

    // Demo element is maintained in state and shared in context.
    const [demoElement, setDemoElement] = useState(appContext.demoElement);

    const [menuOpen, setMenuOpen] = useState(true);

    const [openMenuPath, setOpenMenuPath] = useState("");

    /**
     * Open the menu.
     */
    function openMenu(): void {
        setMenuOpen(true);
    }

    /**
     * Close the menu.
     */
    function closeMenu(): void {
        // Can't close the menu if there is no demo element.
        setMenuOpen(demoElement === undefined);
    }

    /**
     * Go to the home page (root) of the application.
     */
    function home(): void {
        window.location.href = "/";
    }

    /**
     * Reset the application.
     */
    function reset(): void {
        // Clear cached input values.
        inputValuesMap.clear();

        // Clear demo element.
        setDemoElement(undefined);

        // Reset menu.
        openMenu();
        setOpenMenuPath("");
    }

    const menuItems: MenuItemPropertiesArray<StringFormProperties<boolean> | GS1IdentifierFormProperties> = [
        {
            icon: <HomeIcon />,
            titleResourceName: "App.home",
            f: home
        },
        STRING_MENU_ITEM,
        GS1_IDENTIFIER_MENU_ITEM,
        {
            icon: <RestartAltIcon />,
            titleResourceName: "App.reset",
            f: reset
        }
    ];

    const menuButtonRef = useRef(null);

    // Create new context with managed demo element.
    const context = new class implements Context {
        /**
         * @inheritDoc
         */
        get inputValuesMap(): Map<string, string> {
            return inputValuesMap;
        }

        /**
         * @inheritDoc
         */
        get demoElement(): ReactElement | undefined {
            return demoElement;
        }

        /**
         * @inheritDoc
         */
        set demoElement(value: ReactElement | undefined) {
            setDemoElement(value);

            // Hide the menu if demo element is set.
            setMenuOpen(value === undefined);
        }
    }();

    return <App.Context.Provider value={context}>
        <Box sx={{
            flexGrow: 1
        }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        id="aidcToolkitIcon"
                        ref={menuButtonRef}
                        edge="start"
                        color="inherit"
                        sx={{
                            mr: 2
                        }}
                        onClick={openMenu}
                    >
                        <Icon component={AIDCToolkitIcon} />
                    </IconButton>
                    <Typography
                        component="div"
                        sx={{
                            flexGrow: 1
                        }}
                    >
                        {i18nextDemo.t("App.title")}
                    </Typography>
                    <Typography
                        component="div"
                    >
                        {i18nextDemo.t("Demo.demoVersion", {
                            version: packageConfig.version
                        })}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Menu
                anchorEl={() => menuButtonRef.current}
                open={menuOpen}
                onClose={closeMenu}
            >
                <MenuItems
                    menuItems={menuItems}
                    openMenuPath={openMenuPath}
                    setOpenMenuPath={setOpenMenuPath}
                />
            </Menu>
            {demoElement}
        </Box>
    </App.Context.Provider>;
}

/**
 * Context.
 */
App.Context = createContext<Context>({
    inputValuesMap: new Map(),
    demoElement: undefined
});
