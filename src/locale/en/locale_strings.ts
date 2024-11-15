export const localeStrings = {
    App: {
        title: "AIDC Toolkit",
        titleVersion: "AIDC Toolkit v{{version}}",
        logoAlt: "AIDC Toolkit logo",
        reset: "Reset"
    },
    Demo: {
        valueIsRequired: "Value is required.",
        confirmCreateStrings: "This will create {{count}} strings.\nAre you sure?"
    },
    String: {
        stringTitle: "String",
        characterSetTitle: "{{name}} String",
        lengthLabel: "Length",
        lengthText: "Length must be from 0-{{maximumLength}}.",
        exclusionLabel: "Exclusion",
        exclusionNoneLabel: "None",
        exclusionFirstZeroLabel: "First zero",
        exclusionAllNumericLabel: "All numeric",
        exclusionText: "Type of string to be excluded from creation.",
        tweakLabel: "Tweak",
        tweakText: "If provided, the numerical value of the string \"tweaked\" by this value using an encryption transformer.",
        validateSubtitle: "Validate",
        stringToValidate: "{{name}} string to validate.",
        minimumLengthLabel: "Minimum length",
        minimumLengthText: "If provided, the minimum length of the {{name, toLowerCase}} string.",
        maximumLengthLabel: "Maximum length",
        maximumLengthText: "If provided, the maximum length of the {{name, toLowerCase}} string.",
        createSubtitle: "Create",
        valueLabel: "Value",
        valueText: "Numeric value to be converted to {{name, toLowerCase}} string.",
        createSequenceSubtitle: "Create sequence",
        startValueLabel: "Start value",
        startValueText: "Start of numeric values to be converted to {{name, toLowerCase}} strings.",
        countLabel: "Count",
        countText: "Count of numeric values to be converted to {{name, toLowerCase}} strings.",
        valueSubtitle: "Value",
        stringToConvert: "{{name}} string to convert back to numeric value.",
        numericCharacterSet: "Numeric",
        hexadecimalCharacterSet: "Hexadecimal",
        alphabeticCharacterSet: "Alphabetic",
        alphanumericCharacterSet: "Alphanumeric",
        gs1AI82CharacterSet: "GS1 AI 82",
        gs1AI39CharacterSet: "GS1 AI 39"
    },
    GS1: {
        gs1IDKeyTitle: "GS1 ID Key",
        prefixTypeLabel: "Prefix type",
        prefixTypeText: "Prefix type underlying the identification key.",
        prefixLabel: "Prefix",
        prefixText: "Prefix underlying the identification key.",
        identificationKeyText: "{{identificationKeyType}} to be validated.",
        valueText: "Numeric value to be converted to reference.",
        exclusionText: "Type of reference to be excluded from creation.",
        sparseLabel: "Sparse",
        sparseText: "If true, the value is mapped to a sparse sequence resistant to discovery.",
        startValueText: "Start of numeric values to be converted to references.",
        countText: "Count of numeric values to be converted to references.",
        createAllSubtitle: "Create all",
        zeroExpandGTIN12Subtitle: "Zero expand GTIN-12",
        zeroSuppressedGTIN12Label: "Zero suppressed GTIN-12",
        zeroSuppressedGTIN12Text: "Zero-suppressed GTIN-12 to be expanded.",
        zeroSuppressGTIN12Subtitle: "Zero suppress GTIN-12",
        gtin12Label: "GTIN-12",
        gtin12ToBeZeroSuppressedText: "GTIN-12 to be zero-suppressed.",
        validateAnySubtitle: "Validate any",
        levelLabel: "Level",
        levelAnyLabel: "Any",
        levelRetailConsumerLabel: "Retail consumer",
        levelOtherThanRetailConsumerLabel: "Other than retail consumer",
        levelText: "Level at which the GTIN is applied.",
        validateGTIN14Subtitle: "Validate GTIN-14",
        gtin14Label: "GTIN-14",
        gtin14ToBeValidatedText: "GTIN-14 to be validated.",
        convertToGTIN14Subtitle: "Convert to GTIN-14",
        indicatorDigitLabel: "Indicator digit",
        indicatorDigitText: "If provided, indicator digit to apply to GTIN-14.",
        gtinLabel: "GTIN",
        gtinToBeConvertedToGTIN14Text: "GTIN to be converted to GTIN-14.",
        normalizeGTINSubtitle: "Normalize",
        gtinToBeNormalizedText: "GTIN to be normalized.",
        serialComponentLabel: "Serial component",
        serialComponentText: "Serial component of the identification key.",
        createSerializedSubtitle: "Create serialized",
        concatenateSubtitle: "Concatenate",
        baseIdentificationKeyLabel: "Base {{identificationKeyType}}",
        baseIdentificationKeyText: "Base {{identificationKeyType}} to which to concatenate serial component.",
        referenceLabel: "Reference",
        referenceText: "Reference to be appended to prefix."
    }
} as const;
