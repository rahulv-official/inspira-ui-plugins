import plugin from "tailwindcss/plugin";
import { addVariablesForColors } from "./addVariablesForColors";
import { addBackgrounds } from "./addBackgrounds";

/**
 * Sets up all Inspira UI plugins for use in Tailwind CSS.
 */
export const setupInspiraUI = plugin(function (helpers) {
    addVariablesForColors.handler(helpers);
    addBackgrounds.handler(helpers);
});