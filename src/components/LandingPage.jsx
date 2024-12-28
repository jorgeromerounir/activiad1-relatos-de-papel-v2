import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bookImg from '../assets/book-img.png';
import FooterContainer from './FooterContainer';
import './LandingPage.css';

function LandingPage() {
  const appTitle = 'Relatos de papel';
  const navigate = useNavigate();
  useEffect(() => {
    const timerId = setTimeout(() => {
        navigate('/home-book-list');
    }, 5000); // 5000 milliseconds = 10 seconds
    return () => clearTimeout(timerId);
  }, [navigate]);
  return (
    <>
        <header>
            <h1>Bienvenido a {appTitle}</h1>
            <p>¡Encuentra fácilmente tu próxima lectura!</p>
        </header>
        <section className='hero'>
            <img className='hero__img' src={bookImg} alt='Imagen de libro'/>
            <h2>¡Únete a nuestra comunidad de lectores!</h2>
            <p>Regístrate ahora y descubre tu mejor lectura.</p>
        </section>
        <section className='form-container'>
            <form className='form-container__form'>
                <h3>Regístrate</h3>
                <input type='text' name='nombre' placeholder='Nombre completo' className='form-container__input' required />
                <input type='email' name='email' placeholder='Correo electrónico' className='form-container__input' required />
                <input type='password' name='password' placeholder='Contraseña' className='form-container__input' required />
                <button type='submit' className='form-container__btn'>Registrarse</button>
                <p>¿Ya tienes una cuenta? <a href='#'>Inicia sesión</a></p>
            </form>
        </section>
        <br></br>
        <br></br>
        <FooterContainer></FooterContainer>
    </>
  );
}

export default LandingPage;
