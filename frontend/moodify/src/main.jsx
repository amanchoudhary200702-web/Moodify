import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./features/auth/auth.context";
import { SongContextProvider } from "../src/features/home/song.context.jsx";

createRoot(document.getElementById('root')).render(

    
<AuthProvider>
    <SongContextProvider>
 <App />
 </SongContextProvider>
</AuthProvider>
)



