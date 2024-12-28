import { createRoot } from 'react-dom/client'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './index.css'
import LandingPage from './components/LandingPage.jsx'
import HomeBookList from './components/HomeBookList.jsx'
import BookDetail from './components/BookDetail.jsx'
import NotFound from './components/NotFound.jsx'
import CheckoutSummary from './components/CheckoutSummary.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/home-book-list" element={<HomeBookList />} />
        <Route path="/checkout" element={<CheckoutSummary />} />
        <Route path="/book-detail/:bookId" element={<BookDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
)
