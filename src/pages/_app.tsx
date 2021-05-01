import '../styles/global.css';

import { SidebarProvider } from '../contexts/SidebarContext';
import { Sidebar } from '../components/Sidebar';
import { FloatingActionButton } from '../components/FloatingActionButton';

function MyApp({ Component, pageProps }) {

  return(
    <SidebarProvider>
      <Component {...pageProps} />
      <Sidebar />
      <FloatingActionButton />
    </SidebarProvider>
  ) 
}

export default MyApp
