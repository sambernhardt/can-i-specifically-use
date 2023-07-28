import type { Theme } from 'theme-ui'

const buttonStyles = {
  fontFamily: 'body',
  borderRadius: '8px',
  cursor: 'pointer',
  color: 'textNeutralPrimary',
}

export const theme: Theme = {
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Inter Tight, system-ui, sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    textNeutralPrimary: '#171515',
    textNeutralSecondary: '#636363',
    textLink: '#095CFF',
    textDangerPrimary: '#95140b',
    textDangerSecondary: '#ab403a',
    textSuccessPrimary: '#224d22',
    textSuccessSecondary: '#689566',
    textWarningPrimary: '#44210a',
    textWarningSecondary: '#b1834a',

    background: '#f6f6f6',
    backgroundSurface: '#fff',
    backgroundHover: 'rgba(0, 0, 0, 0.05)',
    backgroundDangerAlpha: 'rgba(161,47,47,0.1)',
    backgroundSuccessAlpha: 'rgba(70, 255, 57, 0.221)',
    backgroundWarningAlpha: 'rgba(200, 127, 39, 0.131)',
    backgroundFocusAlpha: 'rgba(9, 92, 255, 0.1)',

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
        backgroundFocusAlpha: 'rgba(9, 92, 255, 0.1)',

        borderNeutralPrimary: '#2B2B2B',
        borderNeutralSecondary: '#242424',
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
    13, 15, 17, 20, 24, 32, 48, 56
  ],
  breakpoints: [40, 52, 64].map((n) => n + 'em'),
  buttons: {
    primary: {
      ...buttonStyles,
      bg: 'backgroundSurface',
      border: '1px solid',
      borderColor: 'borderNeutralPrimary',
      boxShadow: 'default',
    },
    ghost: {
      ...buttonStyles,
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
    },
  },
  styles: {
    a: {
      fontFamily: 'body',
      color: 'textLink',
    },
    hr: {
      color: 'borderNeutralSecondary',
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