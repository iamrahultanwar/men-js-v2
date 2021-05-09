import React from 'react';
import Navbar from './components/common/Navbar/Navbar';
import { Switch, Route } from 'react-router-dom';
import appRoutes from './routes/routes';



function App() {
  return (
    <>
      <Navbar />
      <Switch >
        {appRoutes.map((route, idx) => <Route path={route.path} component={route.component} exact={route.exact} key={`${route.key}_${idx}`} />)}
      </Switch>
    </>

  );
}

export default App;
