import { describe, it, expect, vi } from 'vitest';
import { setupInspiraUI, addVariablesForColors, addBackgrounds } from '../src'; // Adjust the import path as needed
import { PluginAPI } from 'tailwindcss/types/config';

// Mock the handler functions of the individual plugins
vi.mock('../src/addVariablesForColors', () => ({
  addVariablesForColors: { handler: vi.fn() }
}));

vi.mock('../src/addBackgrounds', () => ({
  addBackgrounds: { handler: vi.fn() }
}));

describe('setupInspiraUI Plugin', () => {
  it('should set up all Inspira UI plugins correctly', () => {
    const mockHelpers = {} as unknown as PluginAPI;

    // Execute the setupInspiraUI plugin with mock helpers
    setupInspiraUI.handler(mockHelpers);

    // Ensure that the individual plugin handlers are called with the correct helpers
    expect(addVariablesForColors.handler).toHaveBeenCalledWith(mockHelpers);
    expect(addBackgrounds.handler).toHaveBeenCalledWith(mockHelpers);
  });
});
