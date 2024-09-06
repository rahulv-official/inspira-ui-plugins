import { describe, it, expect, vi } from 'vitest';
import { addBackgrounds } from '../src'; // Adjust the import path as needed
import svgToTinyDataUri from 'mini-svg-data-uri';
import { PluginAPI } from 'tailwindcss/types/config';

// Mock the TailwindCSS utilities
const mockMatchUtilities = vi.fn();
const mockTheme = vi.fn().mockReturnValue({
  red: '#ff0000',
  blue: '#0000ff',
});

describe('addBackgrounds Plugin', () => {
  it('should generate background utilities with correct patterns', () => {
    const api: PluginAPI = {
      matchUtilities: mockMatchUtilities,
      theme: mockTheme,
    } as unknown as PluginAPI;

    addBackgrounds.handler(api);

    // Check that matchUtilities is called correctly
    expect(mockMatchUtilities).toHaveBeenCalledWith(
      {
        'bg-grid': expect.any(Function),
        'bg-grid-small': expect.any(Function),
        'bg-dot': expect.any(Function),
      },
      {
        values: expect.objectContaining({
          red: '#ff0000',
          blue: '#0000ff',
        }),
        type: 'color',
      }
    );

    // Verify the utility functions generate the correct SVG data URIs
    const gridFunction = mockMatchUtilities.mock.calls[0][0]['bg-grid'];
    const gridSmallFunction = mockMatchUtilities.mock.calls[0][0]['bg-grid-small'];
    const dotFunction = mockMatchUtilities.mock.calls[0][0]['bg-dot'];

    // Expected SVG data URIs
    const expectedGridUri = svgToTinyDataUri(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="#ff0000"><path d="M0 .5H31.5V32"/></svg>`
    );
    const expectedGridSmallUri = svgToTinyDataUri(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="#ff0000"><path d="M0 .5H31.5V32"/></svg>`
    );
    const expectedDotUri = svgToTinyDataUri(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="#ff0000" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
    );

    // Check that the background utilities produce the correct output
    expect(gridFunction('#ff0000')).toEqual({
      backgroundImage: `url("${expectedGridUri}")`,
    });
    expect(gridSmallFunction('#ff0000')).toEqual({
      backgroundImage: `url("${expectedGridSmallUri}")`,
    });
    expect(dotFunction('#ff0000')).toEqual({
      backgroundImage: `url("${expectedDotUri}")`,
    });
  });
});
