import { borderless } from '@styles/border/borderless.css';
import { style } from '@vanilla-extract/css';

const numberInputBox = style({
  padding: '8px',

  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  gap: '8px',
});

const numberInputLabel = style({
  fontWeight: 'bold',
});

const numberInputValue = style([
  borderless,
  {
    transition: '0.2s',
    ':focus': {
      outline: 'none',
      borderBottom: '2px solid white',
      transition: '0.5s',
    },
  },
  {
    margin: 'auto',
    width: '4ch',
    background: 'transparent',
    padding: '4px',

    textAlign: 'center',
    fontSize: '2.4rem',
    fontWeight: 'bold',
    color: '#ec2',
  },
  {
    MozAppearance: 'textfield',
    '::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      appearance: 'none',
    },
    '::-webkit-outer-spin-button': {
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      appearance: 'none',
    },
  },
]);

export { numberInputBox, numberInputLabel, numberInputValue };
