import { I18nEnvironment } from "@aidc-toolkit/core";
import { type ReactElement, type ReactNode, useEffect, useState } from "react";
import { i18nDemoInit, i18nextDemo } from "./locale/i18n.ts";

/**
 * I18n wrapper properties.
 */
export interface I18nProperties {
    /**
     * Post-initialization callback.
     */
    readonly postInitialization?: () => void;

    /**
     * Children.
     */
    readonly children?: ReactNode;
}

/**
 * I18n wrapper. Ensures initialization of internationalization regardless of entry point.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function I18n(properties: I18nProperties): ReactElement {
    const [isI18nInitialized, setIsI18nInitialized] = useState<boolean>(i18nextDemo.isInitialized);

    useEffect(() => {
        if (!isI18nInitialized) {
            i18nDemoInit(I18nEnvironment.Browser).then(() => {
                // Force refresh.
                setIsI18nInitialized(true);

                if (properties.postInitialization !== undefined) {
                    properties.postInitialization();
                }
            }).catch((e: unknown) => {
                console.error(e);
                alert(e);
            });
        }
    }, [properties, isI18nInitialized]);

    return <>{isI18nInitialized ? properties.children : undefined}</>;
}
