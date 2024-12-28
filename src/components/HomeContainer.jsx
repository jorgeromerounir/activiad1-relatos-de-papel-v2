import HeaderContainer from './HeaderContainer.jsx';
import FooterContainer from './FooterContainer.jsx';

function HomeContainer({children}) {
  return (
    <>
      <HeaderContainer></HeaderContainer>
      <section className='home-container'>
        {children}
      </section>
      <FooterContainer></FooterContainer>
    </>
  );
}

export default HomeContainer;
