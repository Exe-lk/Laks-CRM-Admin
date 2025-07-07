import "@/styles/globals.css";
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from "../redux/store";
import AdminLayout from './components/adminLayout';

const adminPages = [
  '/dashboard',
  '/userAccept',
  '/locumProfiles',
  '/documents',
  '/specialties',
  '/analytics',
  '/settings'
];

function MyApp({ Component, pageProps, router }: AppProps) {
  const useAdminLayout = adminPages.includes(router.pathname);

  return (
    <Provider store={store}>
      {useAdminLayout ? (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  );
}

export default MyApp;
