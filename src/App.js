// import classes from './App.css';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Routes, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <Layout>
        <Routes>
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route path="/" element={<BurgerBuilder />}></Route>
        </Routes>
        {/* <Route path="/" component={Checkout} />
        <Route path="/" component={Checkout} /> */}
        
        {/* <BurgerBuilder />
        <Checkout /> */}
      </Layout>
    </div>
  );
}

export default App;
