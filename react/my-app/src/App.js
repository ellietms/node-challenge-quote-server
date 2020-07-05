import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
function App() {
  const [Quote, setQuote] = useState({});

  useEffect(() => newQuote(), []);


  function newQuote() {
    fetch("https://ellietms-code-server.glitch.me/quotes/random")
      .then((response) => response.json())
      .then((data) => setQuote(data));
  }
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mx-auto px-3 boxContainer">
       <div className="img-1">
       <img className="mb-2 img-1"
        src="https://www.netclipart.com/pp/m/108-1084788_floral-flowers-flower-art-botanical-flowers-peony-flower.png" />
        <img className="mb-2 img-1"
        src="https://www.netclipart.com/pp/m/108-1084788_floral-flowers-flower-art-botanical-flowers-peony-flower.png" />
       </div>
      <div className="my-4 mx-auto px-auto">
      <i className="fas fa-book mx-2 my-auto"></i>
        {Quote.quote}
      </div>
      <div className="my-4 mx-2 px-auto author">
         author : {Quote.author}
      </div>
      <button
      className="button"
      onClick={() => newQuote()}>quote</button>
      <div className="img-1">
       <img className="mb-2 img-1"
        src="https://www.netclipart.com/pp/m/108-1084788_floral-flowers-flower-art-botanical-flowers-peony-flower.png" />
        <img className="mb-2 img-1"
        src="https://www.netclipart.com/pp/m/108-1084788_floral-flowers-flower-art-botanical-flowers-peony-flower.png" />
       </div>
    </div>
    </div>
    </div>
  );
}

export default App;
