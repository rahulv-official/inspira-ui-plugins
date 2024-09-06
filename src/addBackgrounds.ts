import plugin from "tailwindcss/plugin";
import svgToTinyDataUri from "mini-svg-data-uri";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

/**
 * Adds background utilities such as grid and dot patterns with customizable colors.
 */
export const addBackgrounds = plugin(function ({ matchUtilities, theme }: any) {
    const backgroundData = {
        "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToTinyDataUri(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
        }),
        "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgToTinyDataUri(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
        }),
        "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToTinyDataUri(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
        }),
    };

    matchUtilities(backgroundData, {
        values: flattenColorPalette(theme("backgroundColor")),
        type: "color",
    });
});
