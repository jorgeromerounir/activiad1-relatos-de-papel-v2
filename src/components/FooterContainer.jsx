import './FooterContainer.css'
import configApp from '../config/ConfigApp.jsx';

function FooterContainer() {
  const appTitle = configApp.appTitle;
  return (
    <>
      <footer className='footer-container'>
        <p><strong>UNIR - Universidad Internacional de La Rioja</strong></p>
        <p>Máster Universitario en Ingeniería de Software y Sistemas Informáticos</p>
        <p><strong>Jorge Luis Romero Castañeda</strong></p>
        <p>&copy; [2024] [{appTitle}]. Todos los derechos reservados.</p>
        <p><strong>Actividad 1</strong></p>
      </footer>
    </>
  );
}

export default FooterContainer;
