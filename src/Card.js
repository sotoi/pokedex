import "./Card.css"
import React from 'react'

import PokemonTypes from "./PokemonType.js"
import {Link
  } from "react-router-dom";

function Card({pokemon}) {
  
    return (
            <Link to= {`/pokemon/${(pokemon.species.url).split('/')[(pokemon.species.url).split("/").length -2]}`}>
       
            <div className='CardContainer'>
                <div className='Card__image'>
                    
                    <img id="pok-img" src={pokemon.sprites.other.['official-artwork'].front_default || pokemon.sprites.front_default} alt =""></img>
                </div>
                <div className="Card__name">
                    {pokemon.name}
                </div>
                <div className="Card__types">
                    {pokemon.types.map((type)=> {
                        return (<div className="Card__type" style={{backgroundColor: PokemonTypes[type.type.name]}} >
                            {type.type.name}
                            </div>)

                    })}
                </div>
                <div className="Card__stats">
                <div  className="Card__height">
                <p className="title">
                    Height
                    </p>
                    <p>{pokemon.height}</p>
                    
                </div>
                <div  className="Card__weight">
                <p className="title">
                    Weight
                    </p>
                    <p>{pokemon.weight}</p>
                </div>
                </div>
               

                
            </div>
            </Link>
        
            

       
    )
};

export default Card
