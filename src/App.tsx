import { Suspense } from 'react';
import './App.css';
import LoadingFallback from './components/LoadingFallback';

function App() {
  return <Suspense fallback={<LoadingFallback />}></Suspense>;
}

export default App;
