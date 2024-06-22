
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import UserNav from './Component/UserNav';
import UserDataList from './Component/UserDataList';
import UserFooter from './Component/UserFooter';
import Dashbord from './Component/Dashboard';

function App() {
  return (
      <Router>
        
        <Switch>
          {/* <Route path="/" exact>
              <Login></Login>
          </Route>
          <Route path="/sign" exact>
          
            <Sign></Sign>
          </Route> */}
          <Route path="/document" exact>
            <UserNav></UserNav>
            <UserDataList></UserDataList>
          </Route>
          <Route path="/" exact>
            <UserNav></UserNav>
            <Dashbord></Dashbord>
          </Route>
          
        </Switch>
        <UserFooter></UserFooter>
        
        
        
      </Router>

  );
}

export default App;
