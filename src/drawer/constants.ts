const rootStyles = getComputedStyle(document.documentElement)

export const BORDER_COLOR: Color = rootStyles.getPropertyValue(
    "--border-color"
);
export const TEXT_COLOR: Color = rootStyles.getPropertyValue(
    "--text-color"
);
export const MAIN_BG_COLOR: Color = rootStyles.getPropertyValue(
    "--main-bg-color"
);
export const INITIAL_FIELD_BG_COLOR: Color = rootStyles.getPropertyValue(
    "--field-bg-color"
);
export const FLAG_BG_COLOR: Color = rootStyles.getPropertyValue(
    "--flag-bg-color"
);
