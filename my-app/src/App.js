import React, { useEffect, useState } from "react";

function App() {
  const [Quote, setQuote] = useState({});

  useEffect(() => newQuote(), []);

  function newQuote() {
    fetch("https://ellietms-code-server.glitch.me/quotes/random")
      .then((response) => response.json())
      .then((data) => setQuote(data));
  }

  return (
    <div className="App">
      <div>
        this is {Quote.quote} from {Quote.author}
      </div>
      <button onClick={() => newQuote()}>Get quotes</button>
      <div>{Quote.quote}</div>
    </div>
  );
}

export default App;
