import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowRight as KeyboardArrowRightIcon
} from "@mui/icons-material";
import { Divider, MenuItem, Typography } from "@mui/material";
import { type ReactNode, useContext } from "react";
import { App } from "./App.jsx";
import { i18nextDemo } from "./locale/i18n.js";
import type { MenuItemProperties } from "./menu-item.js";

/**
 * Menu items properties.
 */
interface MenuItemsProperties<T extends object> {
    /**
     * Array of menu item properties or null. If null, a divider line is rendered.
     */
    readonly menuItems: ReadonlyArray<MenuItemProperties<T> | null>;

    /**
     * Open menu path.
     */
    readonly openMenuPath: string;

    /**
     * Callback to set the open menu path.
     */
    readonly setOpenMenuPath: (value: string) => void;

    /**
     * Current menu path.
     */
    readonly menuPath?: string;

    /**
     * True if menu that contains these menu items is open.
     */
    readonly menuOpen?: boolean;

    /**
     * Margin for proper indentation.
     */
    readonly margin?: number;
}

/**
 * Package menu.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React node.
 */
export function MenuItems<T extends object>(properties: MenuItemsProperties<T>): ReactNode {
    const appContext = useContext(App.Context);

    const openMenuPath = properties.openMenuPath;
    const setOpenMenuPath = properties.setOpenMenuPath;
    const menuPath = properties.menuPath ?? "";
    const menuOpen = properties.menuOpen !== false;
    const margin = properties.margin ?? 0;

    const sx = {
        ml: margin
    };

    let dividerIndex = 0;

    return properties.menuItems.map((menuItemProperties) => {
        let menuItem: ReactNode;

        if (menuItemProperties !== null) {
            const icon = menuItemProperties.icon;
            const titleResourceName = menuItemProperties.titleResourceName;
            const title = menuItemProperties.title ?? i18nextDemo.t(titleResourceName ?? "App.title");

            const menuItemKey = `${menuPath}${titleResourceName ?? title}`;
            const subMenuPath = `${menuItemKey}/`;
            const subMenuOpen = openMenuPath.startsWith(subMenuPath);

            const iconAndTitle = <Typography
                component="div"
                sx={{
                    flexGrow: 1
                }}
            >
                {icon}
                {icon !== undefined ? <>&nbsp;</> : ""}
                {title}
            </Typography>;

            if ("f" in menuItemProperties) {
                menuItem = <MenuItem
                    key={menuItemKey}
                    hidden={!menuOpen}
                    selected={menuItemKey === appContext.demoElement?.key}
                    sx={sx}
                    onClick={menuItemProperties.f}
                >
                    {iconAndTitle}
                </MenuItem>;
            } else {
                menuItem = [
                    <MenuItem
                        key={menuItemKey}
                        hidden={!menuOpen}
                        sx={sx}
                        onClick={() => {
                            setOpenMenuPath(!subMenuOpen ? subMenuPath : menuPath);
                        }}
                    >
                        {iconAndTitle}
                        {subMenuOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                    </MenuItem>,
                    <MenuItems
                        key={subMenuPath}
                        menuItems={
                            // Check for pre-constructed sub-menu.
                            "subMenuItems" in menuItemProperties ?
                                menuItemProperties.subMenuItems :
                                menuItemProperties.formGroupDescriptor.FormDescriptors.map(FormDescriptor =>
                                    FormDescriptor !== null ?
                                        {
                                            titleResourceName: FormDescriptor.resourceName,
                                            f: () => {
                                                appContext.demoElement = <FormDescriptor
                                                    key={`${subMenuPath}${FormDescriptor.resourceName}`}
                                                    {...menuItemProperties.formGroupDescriptor.formProperties}
                                                />;
                                            }
                                        } :
                                        null
                                )
                        }
                        openMenuPath={openMenuPath}
                        setOpenMenuPath={setOpenMenuPath}
                        menuPath={subMenuPath}
                        menuOpen={subMenuOpen}
                        margin={margin + (icon !== undefined ? 6 : 3)}
                    />
                ];
            }
        } else {
            menuItem = <Divider
                key={`Divider${dividerIndex++}`}
                hidden={!menuOpen}
                sx={sx}
            />;
        }

        return menuItem;
    });
}
