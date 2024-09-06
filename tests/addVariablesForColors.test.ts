import { describe, it, expect, vi } from 'vitest';
import { addVariablesForColors } from '../src';
import { PluginAPI } from 'tailwindcss/types/config';

// Mock the TailwindCSS utilities
const mockAddBase = vi.fn();
const mockTheme = vi.fn().mockReturnValue({
  red: '#ff0000',
  blue: '#0000ff',
});

vi.mock('tailwindcss/lib/util/flattenColorPalette', () => ({
  default: (colors) => colors,
}));

describe('addVariablesForColors Plugin', () => {
  it('should generate CSS variables for all Tailwind colors', () => {
    const api: PluginAPI = {
        addBase: mockAddBase,
        theme: mockTheme,
      } as unknown as PluginAPI;
      
    addVariablesForColors.handler(api);

    // Check that addBase is called correctly
    expect(mockAddBase).toHaveBeenCalledWith({
      ':root': {
        '--red': '#ff0000',
        '--blue': '#0000ff',
      },
    });
  });
});
