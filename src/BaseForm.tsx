import {
    Alert,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow
} from "@mui/material";
import type { ParseKeys } from "i18next";
import { createContext, type FormEvent, type ReactElement, type ReactNode, useContext, useMemo, useState } from "react";
import { App } from "./App.jsx";
import { FormManager, type ProcessResult } from "./form-manager.js";
import { i18nextDemo } from "./locale/i18n.js";

/**
 * Form properties. All forms require at least these properties to be set.
 */
export interface FormProperties<TFormData extends object> {
    /**
     * Form subtitle resource name.
     */
    readonly subtitleResourceName: ParseKeys;

    /**
     * Callback to process the form.
     *
     * @param formData
     * Form data.
     *
     * @returns
     * String or strings if valid or undefined if not.
     */
    readonly onProcess: (formData: TFormData) => ProcessResult;

    /**
     * Result count (optional). If defined, result count for display in table.
     */
    readonly resultCount?: number;

    /**
     * Result name (optional). If defined, result is stored as input for another form.
     */
    readonly resultName?: string;

    /**
     * Children.
     */
    readonly children?: ReactNode;
}

/**
 * Base form properties.
 */
interface BaseFormProperties<TFormData extends object> extends FormProperties<TFormData> {
    /**
     * Title.
     */
    readonly title: string;
}

/**
 * Buffer if result is multiple strings.
 */
interface ResultsBuffer {
    /**
     * Iterator over results.
     */
    iterator: Iterator<string>;

    /**
     * Cached results.
     */
    cachedResults: string[];
}

/**
 * Base form.
 *
 * @param properties
 * Properties.
 *
 * @returns
 * React element.
 */
export function BaseForm<TFormData extends object>(properties: BaseFormProperties<TFormData>): ReactElement {
    const appContext = useContext(App.Context);

    const [formManager] = useState(
        () => new FormManager(appContext.inputValuesMap, properties.resultName, properties.onProcess)
    );

    const [result, setResult] = useState<undefined | string | ResultsBuffer>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const pageResults = useMemo(
        () => {
            let pageResults: string[];

            if (result === undefined) {
                pageResults = [];
            } else if (typeof result === "string") {
                pageResults = [result];
            } else {
                const start = page * rowsPerPage;
                const end = start + rowsPerPage;

                let length = result.cachedResults.length;
                let done = length >= end;

                while (!done) {
                    const next = result.iterator.next();

                    if (next.done !== true) {
                        result.cachedResults.push(next.value);

                        if (++length === end) {
                            done = true;
                        }
                    } else {
                        done = true;
                    }
                }

                pageResults = result.cachedResults.slice(start, end);
            }

            return pageResults;
        },
        [result, page, rowsPerPage]
    );

    /**
     * Handle submit event.
     *
     * @param event
     * Event.
     */
    function onSubmit(event: FormEvent<HTMLFormElement>): void {
        // Default behaviour clears the form.
        event.preventDefault();

        try {
            const processResult = formManager.process();

            if (typeof processResult !== "object") {
                setResult(processResult);

                // String result is added back as an input value if result name is defined.
                if (processResult !== undefined && properties.resultName !== undefined) {
                    appContext.inputValuesMap.set(properties.resultName, processResult);
                }
            } else {
                setResult({
                    iterator: processResult[Symbol.iterator](),
                    cachedResults: []
                });
            }

            setError(undefined);
        } catch (e) {
            let error: string;
            
            if (e instanceof Error) {
                error = e.message;

                if (e.name !== "RangeError") {
                    console.error(e);
                }
            } else {
                // Can't localize this as source of error may be localization itself.
                error = `Unknown error: ${String(e)}`;
                console.error(e);
            }

            setResult(undefined);
            setError(error);
        } finally {
            setPage(0);
        }
    }

    /**
     * Handle reset event.
     *
     * @param event
     * Event.
     */
    function onReset(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        formManager.reset();

        setResult(undefined);
        setError(undefined);
        
        setPage(0);
    }

    const subtitle = i18nextDemo.t(properties.subtitleResourceName);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Type must match.
    return <BaseForm.Context.Provider value={formManager as unknown as FormManager<never>}>
        <Card>
            <CardHeader
                title={properties.title}
                subheader={subtitle}
                slotProps={{
                    title: {
                        textAlign: "center"
                    },
                    subheader: {
                        textAlign: "center"
                    }
                }}
            />
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                }}
            >
                <Box
                    component="form"
                    noValidate
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}
                    onSubmit={onSubmit}
                    onReset={onReset}
                >
                    {properties.children}
                    <ButtonGroup
                        sx={{
                            alignSelf: "end"
                        }}
                    >
                        <Button type="reset" color="secondary">
                            {i18nextDemo.t("App.reset")}
                        </Button>
                        <Button type="submit" color="primary">
                            {subtitle}
                        </Button>
                    </ButtonGroup>
                    <Alert severity="error" hidden={error === undefined}>
                        {error}
                    </Alert>
                </Box>
                <Box>
                    <TableContainer component={Paper} hidden={result === undefined}>
                        <Table size="small">
                            <TableBody>
                                {pageResults.map((rowResult, index) => <TableRow
                                    key={`result-${index}`}
                                    sx={{
                                        "&:last-child td":
                                            {
                                                border: 0
                                            }
                                    }}
                                >
                                    <TableCell>{rowResult}</TableCell>
                                </TableRow>)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        hidden={result === undefined || typeof result === "string"}
                        rowsPerPageOptions={[10, 100, 1000]}
                        component="div"
                        count={properties.resultCount ?? -1}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        showFirstButton
                        showLastButton
                        onPageChange={(_event, page) => {
                            setPage(page);
                        }}
                        onRowsPerPageChange={(event) => {
                            setPage(0);
                            setRowsPerPage(parseInt(event.target.value, 10));
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    </BaseForm.Context.Provider>;
}

/**
 * Context.
 */
BaseForm.Context = createContext(new FormManager<never>(new Map(), undefined, () => undefined));
