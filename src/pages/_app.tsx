import '../styles/global.css';

import { SidebarProvider } from '../contexts/SidebarContext';
import { Sidebar } from '../components/Sidebar';

function MyApp({ Component, pageProps }) {

  return(
    <SidebarProvider>
      <Component {...pageProps} />
      <Sidebar />
    </SidebarProvider>
  ) 
}

export default MyApp
