import React, { Component } from 'react';
import "./style.css";

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        }
    }

    render() { 
        return ( 
            
            <div className = "results-list">
                
                {this.props.movieList.map( element=> 
                <div key = {element.imdbID} className = "results-item"> 
                    <div className="results-img" style={{ backgroundImage: `url(${element.Poster})`}}></div> 
                    <p>{element.Title} - {element.Year}</p>
                    <button className = "results-button" disabled = {this.props.nominantList.includes(element)}
                        onClick= {()=>this.props.clickNominantHandler(element)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#aaaaaa">
                            <path d="M0 0h24v24H0V0z" fill="none"/>
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/>
                        </svg>                    
                    </button> 
                </div>)}
            </div>
        );
    }
}

export default Results;
