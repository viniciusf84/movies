import { Link } from 'react-router-dom';

// components
import Search from '../Search';

const Header = ({ pageTitle }) => {
  return (
    <header id="header" className="page-header">
      <div className="wrapper container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
            <div className="brand start-xs">
              <h1 className="page-title">
                <Link to="/">{pageTitle}</Link>
              </h1>
            </div>
          </div>

          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-8">
            <div className="search-wrapper">
              <Search />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
