import type { Theme } from 'theme-ui'

export const theme: Theme = {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'system-ui, sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    textNeutralPrimary: '#171515',
    textNeutralSecondary: '#636363',
    textLink: '#095CFF',

    background: '#F4F4F4',
    backgroundSurface: '#fff',
    backgroundHover: 'rgba(0, 0, 0, 0.05)',

    borderNeutral: '#CBCBCB',
    borderFocus: '#095CFF',

    modes: {
      dark: {
        textNeutralPrimary: '#fff',
        textNeutralSecondary: '#808080',
        textLink: '#6297FF',

        background: '#191616',
        backgroundSurface: '#1D1B1B',
        backgroundHover: 'rgba(255, 255, 255, 0.05)',

        borderNeutral: '#2B2B2B',
      }
    }
  },
  shadows: {
    default: '0px 3px 16px 0px rgba(0, 0, 0, 0.02), 0px 0px 14px 0px rgba(0, 0, 0, 0.05)',
    focus: '0px 0px 0px 4px rgba(9, 92, 255, 0.2)',
  },
  space: [
    0, 4, 8, 16, 32, 64, 128, 256
  ],
  fontSizes: [
    12, 14, 16, 20, 24, 32, 48, 64
  ],
  buttons: {
    primary: {
      cursor: 'pointer',
    }
  },
  text: {
    default: {
      fontFamily: 'body',
      color: 'textNeutralPrimary',
    },
    heading: {
      fontFamily: 'heading',
      color: 'textNeutralPrimary',
    }
  },
  forms: {
    input: {
      fontFamily: 'body',
    },
    label: {
      fontFamily: 'body',
    },
  }
}