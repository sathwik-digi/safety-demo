import './App.css';
import { RouterProvider } from "react-router-dom";
import { routers } from "./routes";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { Toaster } from 'sonner'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster />
        <RouterProvider router={routers} />
      </PersistGate>
    </Provider>

  );
}

export default App;
