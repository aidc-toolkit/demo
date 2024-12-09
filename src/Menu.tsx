import { type ReactElement, useContext } from "react";
import { NavDropdown } from "react-bootstrap";
import { App } from "./App.tsx";
import i18next, { demoNS } from "./locale/i18n.ts";

/**
 * Form descriptor.
 */
export interface FormDescriptor<T> {
    /**
     * Form resource name.
     */
    readonly resourceName: string;

    /**
     * Form.
     *
     * @param properties
     * Properties.
     *
     * @returns
     * React element.
     */
    (properties: T): ReactElement;
}

/**
 * Sub-menu properties.
 */
export interface SubMenuProperties<T> {
    /**
     * Title.
     */
    readonly title: string;

    /**
     * Form properties.
     */
    readonly formProperties: T;

    /**
     * Array of form descriptor or null. If null, a separator line is rendered.
     */
    readonly FormDescriptors: ReadonlyArray<FormDescriptor<T> | null>;
}

/**
 * Menu properties.
 */
export interface MenuProperties<T> {
    /**
     * Title.
     */
    readonly title: string;

    /**
     * Sub-menus.
     */
    // Conditional type forces expansion of union types for mixed arrays.
    readonly subMenus: ReadonlyArray<T extends T ? SubMenuProperties<T> : never>;
}

/**
 * Menu.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function Menu<T>(properties: MenuProperties<T>): ReactElement {
    const appContext = useContext(App.Context);

    let dividerCount = 0;

    return <NavDropdown
        title={properties.title}
    >
        {properties.subMenus.map(subMenu => <NavDropdown
            key={subMenu.title}
            title={subMenu.title}>
            {
                subMenu.FormDescriptors.map((FormDescriptor) => {
                    let result: ReactElement;

                    if (FormDescriptor !== null) {
                        const formName = i18next.t(FormDescriptor.resourceName, {
                            ns: demoNS
                        });

                        result = <NavDropdown.Item
                            key={formName}
                            onClick={() => {
                                appContext.demoElement = <FormDescriptor
                                    key={`${subMenu.title}/${formName}`}
                                    {...subMenu.formProperties}
                                />;
                            }}>
                            {formName}
                        </NavDropdown.Item>;
                    } else {
                        result = <NavDropdown.Divider
                            key={`_divider${++dividerCount}`}
                        />;
                    }

                    return result;
                })
            }
        </NavDropdown>)}
    </NavDropdown>;
}
