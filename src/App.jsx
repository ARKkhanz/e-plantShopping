import { useState } from 'react';
import ProductList from './ProductList.jsx';
import AboutUs from './AboutUs.jsx';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleHomeClick = () => {
    setShowProductList(false);
    window.scrollTo(0, 0);
  };

  return showProductList ? (
    <ProductList onHomeClick={handleHomeClick} />
  ) : (
    <main className="landing-page">
      <div className="landing-content">
        <section className="landing-intro">
          <span className="eyebrow">Bring nature home</span>
          <h1>Welcome to<br />Paradise Nursery</h1>
          <div className="divider" />
          <p>Where Green Meets Serenity</p>
          <button className="get-started-button"
            onClick={() => {
              setShowProductList(true);
              window.scrollTo(0, 0);
            }}>Get Started</button>
        </section>
        <AboutUs />
      </div>
    </main>
  );
}

export default App;
