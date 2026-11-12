import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import BabyCare from './pages/BabyCare';
import HomeHealthcare from './pages/HomeHealthcare';
import Nursing from './pages/Nursing';
import HowItWorks from './pages/HowItWorks';
import Locations from './pages/Locations';
import Faqs from './pages/Faqs';
import Contact from './pages/Contact';
import BookVisit from './pages/BookVisit';
import NotFound from './pages/NotFound';
export default function App(){return <Routes><Route element={<Layout/>}><Route index element={<Home/>}/><Route path="about" element={<About/>}/><Route path="services" element={<Services/>}/><Route path="baby-newborn-care" element={<BabyCare/>}/><Route path="home-healthcare" element={<HomeHealthcare/>}/><Route path="nursing-services" element={<Nursing/>}/><Route path="how-it-works" element={<HowItWorks/>}/><Route path="locations" element={<Locations/>}/><Route path="faqs" element={<Faqs/>}/><Route path="contact" element={<Contact/>}/><Route path="book-a-visit" element={<BookVisit/>}/><Route path="*" element={<NotFound/>}/></Route></Routes>}
