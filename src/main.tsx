import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import {ToastContainer} from 'react-toastify'
import { store,persistor } from './Redux/Store.ts'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Modal from 'react-modal';
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.tsx'
import './index.css'


Modal.setAppElement('#root');
const GOOGLE_ID ="751305429729-5np6osejn0f1iqkl5co62cog9gi2f3ss.apps.googleusercontent.com"


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <GoogleOAuthProvider clientId={GOOGLE_ID}>
  <React.StrictMode>
   <NextUIProvider>
      <App/>
    </NextUIProvider>
    <ToastContainer/>
  </React.StrictMode>
  </GoogleOAuthProvider>
  </PersistGate>
  </Provider>
)
