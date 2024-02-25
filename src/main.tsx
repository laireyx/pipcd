import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DetectorProvider } from '@utils/detect/BuffDetectorProvider.ts';
import BuffDetector from '@utils/detect/BuffDetector.ts';

const detector = new BuffDetector();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DetectorProvider value={detector}>
      <App />
    </DetectorProvider>
  </React.StrictMode>,
);
