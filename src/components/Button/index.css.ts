import { borderless } from '@styles/border/borderless.css';
import { roundBorder } from '@styles/border/round.css';
import { style } from '@vanilla-extract/css';

export const button = style([
  borderless,
  roundBorder,
  {
    padding: '0.6em 1.2em',
    fontSize: '1em',
    fontWeight: 500,
    fontFamily: 'inherit',
    backgroundColor: '#555',
    cursor: 'pointer',
    transition: 'border-color 0.25s',

    color: '#ec2',

    ':hover': {
      borderColor: '#ec2',
    },
    ':focus': {
      outline: '4px auto -webkit-focus-ring-color',
    },
    ':focus-visible': {
      outline: '4px auto -webkit-focus-ring-color',
    },
  },
]);
