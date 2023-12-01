import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import {
  Route,
  Routes,
} from "react-router-dom";
import AllProducts from './pages/AllProducts';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import UserDetails from './userDetails/UserDetail';
import { Toaster } from 'react-hot-toast';
import AccountInfo from './userDetails/AccountInfo';
import Protected from './userDetails/Protected';
import AllUserDisplay from './userDetails/AllUserDisplay';
import AddProduct from './userDetails/AddProduct';
import SpecificProduct from './pages/SpecificProduct';
import CategoriesProduct from './pages/CategoriesProduct';
import ProductDetailed from './pages/ProductDetailed';
import CartSummary from './pages/CartSummary';
import ShippingAddress from './pages/ShippingAddress';
import DeliveryOptions from './pages/DeliveryOptions';
import OrderHistory from './userDetails/OrderHistory';
import SearchPage from './components/SearchPage';
import RequestOtp from './pages/RequestOtp';
import ChangePassword from './pages/ChangePassword';
import ProtectChangePass from './userDetails/ProtectChangePass';
import EditProduct from './userDetails/EditProduct';
import EditSingleProduct from './userDetails/EditSingleProduct';
import NotFound from './components/NotFound';

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/forgotpassword' element={<RequestOtp></RequestOtp>}></Route>
          <Route path='/changepassword' element={<ProtectChangePass Comp={ChangePassword}/>}></Route>
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Protected Comp={Cart}></Protected>} />
          <Route path="/search/:searchQ" element={<SearchPage></SearchPage>}></Route>
          <Route path="/Summary" element={<Protected Comp={CartSummary}></Protected>}></Route>
          <Route path="/Addaddress" element={<Protected Comp={ShippingAddress}></Protected>}></Route>
          <Route path="/checkout" element={<Protected Comp={DeliveryOptions}></Protected>}></Route>
          <Route path='/women' element={<CategoriesProduct></CategoriesProduct>}></Route>
          <Route path='/men' element={<CategoriesProduct></CategoriesProduct>}></Route>
          <Route path='/kid' element={<CategoriesProduct></CategoriesProduct>}></Route>
          <Route path='/productDetailed/:productId' element={<ProductDetailed></ProductDetailed>}></Route>
          <Route path='/womendresses' element={<SpecificProduct/>}></Route>
          <Route path='/womenskirts' element={<SpecificProduct/>}></Route>
          <Route path='/womenpants' element={<SpecificProduct/>}></Route>
          <Route path='/menshirts' element={<SpecificProduct/>}></Route>
          <Route path='/menpants' element={<SpecificProduct/>}></Route>
          <Route path='/menhoodies' element={<SpecificProduct/>}></Route>
          <Route path='/kidshirts' element={<SpecificProduct/>}></Route>
          <Route path='/kidpants' element={<SpecificProduct/>}></Route>
          <Route path='/e/:productId' element={<EditSingleProduct></EditSingleProduct>}></Route>
          <Route path="/userDetail" element={<Protected Comp={UserDetails}></Protected>}>
            <Route path="accountinfo" element={<AccountInfo></AccountInfo>}></Route>
            <Route path="orderhistory" element={<OrderHistory></OrderHistory>}></Route>
            <Route path="addProduct" element={<AddProduct></AddProduct>}></Route>
            <Route path="editproduct" element={<EditProduct></EditProduct>}></Route>
            <Route path="allUserDisplay" element={<AllUserDisplay></AllUserDisplay>}></Route>
          </Route>
          <Route path='*' element={<NotFound></NotFound>}></Route>
        </Routes>
        <Toaster/>
    </>
  );
}

export default App;
