import React, { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Containers
import Header from "../Header";
import Footer from "../Footer";

// Pages
import Home from "../Home";
import Profile from "../Profile";

// utils
import ScrollToTop from "../../utils/ScrollToTop";

// Store
import { SearchContextProvider } from "../../stores/SearchStore";

const App = () => {
  return (
    <SearchContextProvider>
      <Router>
        <ScrollToTop>
          <Header pageTitle="TELAFILME" />
          <Route exact path="/" component={Home} />
          <Route path="/profile/:movieId" component={Profile} />
          <Footer text="TelaFilme 2019 - Todos os direitos reservados" />
        </ScrollToTop>
      </Router>
    </SearchContextProvider>
  );
};

export default App;
