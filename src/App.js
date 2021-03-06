import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [joke, setJoke] = useState([]);
  const [query, setQuery] = useState(
    window.localStorage.getItem('query') !== null ? window.localStorage.getItem('query') : undefined
  );

  useEffect(() => {
    const fetchJoke = async () => {
      const result = await axios.get(
        query !== undefined
          ? `https://official-joke-api.appspot.com/jokes/${query}/random`
          : 'https://official-joke-api.appspot.com/random_joke'
      );
      setJoke(result.data);
    };

    fetchJoke();
  }, [query]);

  const handleChangeQuery = (e) => {
    e.preventDefault();

    window.localStorage.setItem('query', e.target.value);
    setQuery(e.target.value);
  };

  const handleRefresh = (e) => {
    e.preventDefault();

    window.location.reload();
  };

  console.log(query);
  console.log(window.localStorage.getItem('query'));

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Title">random jokes generator.</h1>

        <p>i don't know, go fun yourself.</p>
      </header>

      <main className="Main">
        {joke.length > 0 || joke ? (
          <>
            <label for="cars">Choose a joke type: </label>

            <select name="jokes" id="jokes" onChange={handleChangeQuery} value={query}>
              <option value="general">Random</option>
              <option value="programming">Programming</option>
              <option value="knock-knock">Knock Knock</option>
            </select>

            <button
              onClick={handleRefresh}
              style={{ display: 'block', margin: 'auto', marginTop: '2em', padding: '.5em' }}
            >
              Refresh
            </button>

            {joke ? (
              query ? (
                joke[0] !== undefined ? (
                  <div className="joke-container">
                    <h3>{joke[0].setup ? joke[0].setup : ''}</h3>
                    <br />
                    <br />
                    <h3>{joke[0].punchline ? joke[0].punchline : ''}</h3>
                  </div>
                ) : (
                  <h3 className="joke-container">Please wait ...</h3>
                )
              ) : (
                <div className="joke-container">
                  <h3>{joke.setup ? joke.setup : ''}</h3>
                  <br />
                  <br />
                  <h3>{joke.punchline ? joke.punchline : ''}</h3>
                </div>
              )
            ) : (
              <h3 className="joke-container">Please wait ...</h3>
            )}
          </>
        ) : (
          <h3 className="joke-container">Please wait ...</h3>
        )}
      </main>
    </div>
  );
}

export default App;
