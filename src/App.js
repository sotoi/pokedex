import React, { useState, useEffect } from 'react';
import './App.css';
import axios from './axios';
import Card from './Card.js';
import pokedexim from "./pokedex.png"
import Pokemon from "./Pokemon.js"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";






function App() {
 const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [defaultData, setDefaultData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let list = await axios.get("/pokemon?offset=20&limit=10220");
      let req = await axios.get("/pokemon");


      setLoading(false);
      setNextUrl(req.data.next);
      setPrevUrl(req.data.previous);
      
      await loadPokemonInfo(req.data.results);




    }

    fetchData();





  }, [])
  

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let req = await axios.get(prevUrl);

    await loadPokemonInfo(req.data.results);
    setNextUrl(req.data.next);
    setPrevUrl(req.data.previous);
    setLoading(false);


  }
  const next = async () => {
    setLoading(true);
    let req = await axios.get(nextUrl);


    await loadPokemonInfo(req.data.results);
    setNextUrl(req.data.next);
    setPrevUrl(req.data.previous);
    setLoading(false);

  }
  const loadPokemonInfo = async (data) => {
    let _pokeData = await Promise.all(data.map(async pokemon => {

      let pokeRecord = null;
      try {
        pokeRecord = await axios.get(pokemon.url);
        return pokeRecord;
      } catch (err) {

        console.log(err.response.status)
      }



    }
    ));

    setPokemonData(_pokeData);

  }
  
 

    ;



  return (
    
      <div className="App">


        <Link to="/">
          <div className="header">
            <img className="pokedex" src={pokedexim} alt="errror"></img>
          </div>
        </Link>
        <Switch>
          <Route exact path="/">
            <>

            

              



            </>
            <div className="loader">
              {
                loading ? (<h1>Loading...</h1>) : (

                  <>
                    <div className="nav">
                      <button id="prevbtn" onClick={prev}>
                        previous
                      </button>



                      <button id="nextbtn" onClick={next}>
                        next


                      </button>

                    </div>

                    <div className="grid-container">
                      {pokemonData.map((pokemon, i) => {
                        return <Card key={i} pokemon={pokemon.data} />

                      })}
                    </div>
                    <div className="nav">
                      <button id="prevbtn" onClick={prev}>
                        previous
                      </button>



                      <button id="nextbtn" onClick={next}>
                        next


                      </button>

                    </div>




                  </>
                )
              }

            </div>
          </Route>
          <Route path="/pokemon/:pokeid" component={Pokemon} >
            
          </Route>



        </Switch>
      </div>
    
  );
}



export default App;
