import "./Pokemon.css"
import React  from 'react'

import axios from "./axios"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  


class Pokemon extends React.Component{
    state={
        name: '',
        imageUrl:'',
        pokeid: '',
        description:'',
        hp:'',
        attack:'',
        defense:'',
        special_attack:'',
        special_defense:'',
        speed:'',
        
        
        
    
};



componentDidMount(){
   
    this.loadPokemon(this.props)
    
};



componentDidUpdate(prevProps){
    if(prevProps.match.params!== this.props.match.params){
        console.log("update attemp");
        this.loadPokemon(this.props)

    }
    

};

async loadPokemon(props){ 
    const pokeid=props.match.params;
    const pokemonUrl =`/pokemon/${pokeid["pokeid"]}`
    const pokemonSpeciesurl=`/pokemon-species/${pokeid["pokeid"]}`
    let res = await axios.get(pokemonUrl);
    let res2= await axios.get(pokemonSpeciesurl);
    
    const name =res.data.name;
    const imageUrl= res.data.sprites.other.["official-artwork"].front_default || res.data.sprites.front_default;
    const description= (res2.data.flavor_text_entries["0"].flavor_text).replace("\f"," ");
    console.log(res.data)
    const hp=res.data.stats[0].base_stat;
    const attack= res.data.stats[1].base_stat;
    const defense= res.data.stats[2].base_stat;
    const special_attack=res.data.stats[3].base_stat;
    const special_defense=res.data.stats[4].base_stat;
    const speed= res.data.stats[5].base_stat;
    
    console.log(res2.data.flavor_text_entries)
    console.log(name);
    this.setState({name, imageUrl, description, hp, attack, defense,special_defense,special_attack,speed})
}



render(){
    return(
        
            
        <div className="body">
            <div className="pokemon">
                <div className="pok-img">
                    <img src={this.state.imageUrl} alt=''></img>

                </div>
            </div>
            <div className="info">
            <div className= "name">
                {this.state.name}
                
                
            </div>
            <div className="description">
                {this.state.description}
            </div>
            <div>
                HP: {this.state.hp}
                
                
            </div>
            <div>ATTACK: {this.state.attack}</div>
            <div>DEFENSE:  {this.state.defense}</div>
            <div>SPECIAL-ATTACK: {this.state.special_attack}</div>
            <div>SPECIAL-DEFENSE: {this.state.special_defense}</div>
            <div>SPEED: {this.state.speed}</div>
            
            
                
                
                
            </div>
      


      
           
    
            
            

        </div>
    )
}

}
      
    


export default Pokemon
