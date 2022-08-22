import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from './pages/MainPage';
import Market from './pages/Market';

export default function App () {
  // 마지막 * 경로는 잘못된 경로 모든 메인페이지로 돌리는 라우팅 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/market' element={<Market/>}/>
        
        <Route path="*" element={<MainPage />} /> 
      </Routes>
    </BrowserRouter>

  );

}
