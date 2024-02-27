import { globalStyle } from '@vanilla-extract/css';

globalStyle(':root', {
  fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  lineHeight: 1.5,
  fontWeight: 400,

  color: 'rgba(255, 255, 255, 0.87)',
  backgroundColor: '#242424',

  fontSynthesis: 'none',
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('a', {
  fontWeight: 500,
  color: '#646cff',
  textDecoration: 'inherit',
});

globalStyle('a:hover', {
  color: '#535bf2',
});

globalStyle('body', {
  margin: 0,
  display: 'flex',
  placeItems: 'center',
  minWidth: '320px',
  minHeight: '100vh',
});

globalStyle('#root', {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '2rem',
  textAlign: 'center',
});
