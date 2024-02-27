import { Suspense } from 'react';
import './App.css';
import LoadingFallback from './components/LoadingFallback';
import Controller from '@components/Controller';
import PipContent from '@components/PipContent';

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Controller />
      <PipContent />
    </Suspense>
  );
}

export default App;
