import { style } from '@vanilla-extract/css';

const controller = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  gap: '24px',
});

const title = style({
  fontSize: '3.2rem',
  lineHeight: '1.1em',
});

const buttonPanel = style({
  display: 'flex',
  gap: '8px',
});

export { controller, title, buttonPanel };
