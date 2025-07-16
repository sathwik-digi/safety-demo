import './App.css';
import { RouterProvider} from "react-router-dom";
import {routers} from "./routes";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Toaster } from 'sonner'

function App() {
  return (
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={routers} />
    </Provider>
    
  );
}

export default App;
