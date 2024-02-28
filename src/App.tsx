import { Suspense } from 'react';
import './App.css';
import LoadingFallback from './components/LoadingFallback';
import Controller from '@components/Controller';

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Controller />
    </Suspense>
  );
}

export default App;
