import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss';
import Cart from './pages/Cart';
import { createContext, useState } from 'react';
import Footer from './Components/Footer';

export const SearchContext = createContext('');

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart/" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
