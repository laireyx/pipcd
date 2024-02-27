import { style } from '@vanilla-extract/css';

const pipContent = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '8px',

  padding: '16px',

  backgroundColor: '#242424',
});

export { pipContent };
