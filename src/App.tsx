import React, {Suspense} from 'react';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

import SmallPreview from './components/SmallPreview';

const ViewerWrapper = React.lazy(() => import('./components/ViewerWrapper'));

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={'Loading...'}>
        <Routes>
          <Route path="/viewer-wrapper" element={<ViewerWrapper/>}/>
          <Route path="/small-preview" element={<SmallPreview/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
