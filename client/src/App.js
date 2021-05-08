import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import Navbar from './components/common/Navbar/Navbar';
import { Switch, Route } from 'react-router-dom';
import appRoutes from './routes/routes';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" >
        <Navbar />
        <Grid minH="100vh" p={3}>
          <Switch >
            {appRoutes.map((route, idx) => <Route component={route.component} exact={route.path} key={`${route.key}_${idx}`} />)}
          </Switch>

        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
