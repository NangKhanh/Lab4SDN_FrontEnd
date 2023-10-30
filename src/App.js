import './App.css';
import { Routes, Route } from "react-router-dom";
import Register from './component/register/Register';
import ProductTable from './component/products/Product';
import AddProductForm from './component/newProduct/AddProduct';
import ProductCard from './component/detailProduct/Detail';
import Login from './component/login/Login';
import MyCart from './component/myCart/MyCart';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductTable />} />
        <Route path="/addproduct" element={<AddProductForm />} />
        <Route path='/product/:id'element={<ProductCard/>} />
        <Route path='/mycart'element={<MyCart/>} />

      </Routes>
    </div>
  );
}

export default App;
