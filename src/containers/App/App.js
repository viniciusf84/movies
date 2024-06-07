import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Containers
import Header from '../Header';
import Footer from '../Footer';

// Pages
import Home from '../Home';
import Profile from '../Profile';

// utils
import ScrollToTop from '../../utils/ScrollToTop';

// Store
import { SearchContextProvider } from '../../contexts/SearchContext';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SearchContextProvider>
        <Router>
          <ScrollToTop>
            <Header pageTitle="TELAFILME" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile/:movieId" element={<Profile />} />
            </Routes>
            <Footer
              text={`TelaFilme ${new Date().getFullYear()} - Todos os direitos reservados`}
            />
          </ScrollToTop>
        </Router>
      </SearchContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
