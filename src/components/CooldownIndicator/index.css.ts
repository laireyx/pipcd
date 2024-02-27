import { style } from '@vanilla-extract/css';

const indicator = style({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '8px',
});

const skillIcon = style({
  width: '32px',
  height: '32px',
});

const cooldownText = style({
  fontWeight: 'bold',
});

const cooldownActive = style({
  color: '#0c8',
});

const cooldownImminent = style({
  color: '#c00',
});

export { indicator, skillIcon, cooldownText, cooldownActive, cooldownImminent };
