import ShoppingCartControl from './ShoppingCartControl.jsx';
import AccountMenuControl from './AccountMenuControl.jsx';
import { Link } from 'react-router-dom';
import bookImg from '../assets/book-img.png';
import './HeaderContainer.css';
import configApp from '../config/ConfigApp.jsx';

function HeaderContainer() {
  const appTitle = configApp.appTitle;
  return (
    <>
      <header className='header-container'>
        <div>
          <Link to='/home-book-list'>
            <img
              className='header-container__img'
              src={bookImg}
              alt={`Imagen ${appTitle}`}
            />
            <div className='header-container__title'>
              <h2>{appTitle}</h2>
              <h5 className='header-container__subtitle'>Ecuentralo fácil!</h5>
            </div>
          </Link>
        </div>
        <div className='header-container__controls'>
          <ShoppingCartControl></ShoppingCartControl>
          <AccountMenuControl></AccountMenuControl>
        </div>
      </header>
    </>
  );
}

export default HeaderContainer;
