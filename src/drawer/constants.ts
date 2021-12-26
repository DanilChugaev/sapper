const rootStyles = getComputedStyle(document.documentElement);

/** Border color on the field */
export const BORDER_COLOR: Color = rootStyles.getPropertyValue(
    "--border-color"
);

/** Color of the text in the game */
export const TEXT_COLOR: Color = rootStyles.getPropertyValue(
    "--text-color"
);

/** Main background color in the game */
export const MAIN_BG_COLOR: Color = rootStyles.getPropertyValue(
    "--main-bg-color"
);

/** Field fill color */
export const INITIAL_FIELD_BG_COLOR: Color = rootStyles.getPropertyValue(
    "--field-bg-color"
);

/** Fill color of the cell under the flag */
export const FLAG_BG_COLOR: Color = rootStyles.getPropertyValue(
    "--flag-bg-color"
);
