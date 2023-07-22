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
    textDangerPrimary: '#A1615D',
    textDangerSecondary: '#DD807B',
    textSuccessPrimary: '#224d22',
    textSuccessSecondary: '#689566',
    textWarningPrimary: '#D9B369',
    textWarningSecondary: '#F1B367',

    background: '#f6f6f6',
    backgroundSurface: '#fff',
    backgroundHover: 'rgba(0, 0, 0, 0.05)',
    backgroundDangerAlpha: 'rgba(161,47,47,0.1)',
    backgroundSuccessAlpha: 'rgba(70, 255, 57, 0.221)',
    backgroundWarningAlpha: 'rgba(111,61,0,0.25)',

    borderNeutralPrimary: '#dedede',
    borderNeutralSecondary: '#eaeaea',
    borderFocus: '#095CFF',

    modes: {
      dark: {
        textNeutralPrimary: '#fff',
        textNeutralSecondary: '#808080',
        textLink: '#6297FF',
        textDangerPrimary: '#FFD7D4',
        textDangerSecondary: '#DD807B',
        textSuccessPrimary: '#D9FFD7',
        textSuccessSecondary: '#A3CBA1',
        textWarningPrimary: '#FFECD4',
        textWarningSecondary: '#F1B367',

        background: '#191616',
        backgroundSurface: '#1D1B1B',
        backgroundHover: 'rgba(255, 255, 255, 0.05)',
        backgroundDangerAlpha: 'rgba(161,47,47,0.1)',
        backgroundSuccessAlpha: 'rgba(69, 255, 57, 0.06)',
        backgroundWarningAlpha: 'rgba(111,61,0,0.25)',

        borderNeutralPrimary: '#2B2B2B',
      }
    }
  },
  shadows: {
    default: '0px 3px 16px 0px rgba(0, 0, 0, 0.04), 0px 0px 14px 0px rgba(0, 0, 0, 0.06)',
    focus: '0px 0px 0px 4px rgba(9, 92, 255, 0.2)',
  },
  space: [
    0, 4, 8, 16, 24, 32, 64, 128, 256
  ],
  fontSizes: [
    12, 14, 16, 20, 24, 32, 48, 56
  ],
  buttons: {
    primary: {
      fontFamily: 'body',
      cursor: 'pointer',
      bg: 'backgroundSurface',
      border: '1px solid',
      borderColor: 'borderNeutralPrimary',
      boxShadow: 'default',
    },
    ghost: {
      fontFamily: 'body',
      cursor: 'pointer',
      border: 'none',
      background: 'transparent',

      '&:hover': {
        bg: 'backgroundHover',
      },
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
      fontWeight: 600,
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