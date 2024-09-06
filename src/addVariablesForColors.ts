import plugin from "tailwindcss/plugin";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

/**
 * Generates CSS variables for all colors defined in the Tailwind theme.
 */
export const addVariablesForColors = plugin(({ addBase, theme }) => {
    const allColors = flattenColorPalette(theme("colors"));

    const newVars: any = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );

    addBase({
        ":root": newVars,
    });
});
