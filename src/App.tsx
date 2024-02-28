import { Suspense } from 'react';
import './App.css';
import LoadingFallback from './components/LoadingFallback';
import Controller from '@components/Controller';
import Disclaimer from '@components/Disclaimer';

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Controller />
      <Disclaimer />
    </Suspense>
  );
}

export default App;
