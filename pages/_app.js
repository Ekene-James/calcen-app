import React from 'react';
import '../styles/globals.css';
import { MuiThemeProvider, createTheme   } from '@material-ui/core/styles';
import AuthContextProvider from '../store/auth/AuthStore'
import CssBaseline from '@material-ui/core/CssBaseline';

import Layout1 from "../components/layout/Layout1";
import Layout2 from "../components/layout/Layout2";
import Layout3 from "../components/layout/Layout3";
import SuperAdminContextProvider from '../store/superAdmin/SuperAdminStore';
import AdminContextProvider from '../store/admin/AdminStore';

const layouts = {
  L1: Layout1,
  L2: Layout2,
  L3: Layout3,
};
const theme = createTheme({
 
typography: {
  // Use the system font instead of the default Roboto font.
  fontFamily: [
    'Noto Sans', 
    'sans-serif ',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
},

});
function MyApp({ Component, pageProps }) {
  
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
   // React.useEffect(() => {
  //   // Remove the server-side injected CSS.
  //   const jssStyles = document.querySelector('#jss-server-side');
  //   if (jssStyles) {
  //     jssStyles.parentElement.removeChild(jssStyles);
  //   }
  // }, []);

  return (
    <AuthContextProvider>
    <SuperAdminContextProvider>
    <AdminContextProvider>
    
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
              <Layout>
                <Component {...pageProps} />
              </Layout>
          </MuiThemeProvider>
    
    </AdminContextProvider>
    </SuperAdminContextProvider>
    </AuthContextProvider>
    )
}

export default MyApp
