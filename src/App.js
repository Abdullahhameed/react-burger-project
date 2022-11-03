// import classes from './App.css';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch } from 'react-router-dom';
import Orders from "./containers/Orders/Orders";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
            <Route path="/checkout" component={Checkout}></Route>
            <Route path="/orders" component={Orders}></Route>
            <Route path="/" component={BurgerBuilder}></Route>
        </Switch>
        {/* <Route path="/" component={Checkout} />
        <Route path="/" component={Checkout} /> */}
        
        {/* <BurgerBuilder />
        <Checkout /> */}
      </Layout>
    </div>
  );
}

export default App;
