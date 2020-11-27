import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './MenuItem.css'
import Spinner from "../spinner/Spinner";
import {Link} from "react-router-dom";

function MenuItem() {
    const [dataAllPok, setDataAllPok] = useState([])
    const [term, setTerm] = useState('')
    const [filteredPok, setFilteredPok] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            const result = await axios('https://pokeapi.co/api/v2/pokemon?limit=1050');
            setDataAllPok(result.data.results)
            setIsLoading(false)
        }

        fetchData()
        return () => {
            setDataAllPok([])
        }
    }, [])

    useEffect(() => {
        setFilteredPok(
            dataAllPok.filter(pokemon => {
                return pokemon.name.toLowerCase().includes(term.toLowerCase())
            })
        )
    }, [term, dataAllPok])


    if (isLoading || !dataAllPok) {
        return (
            <Spinner/>
        )
    }

    return (
        <div className="col-md-4 col-lg-3 navbar-container bg-light">
            <nav className="navbar navbar-expand-md navbar-light">

                <input onChange={(event => setTerm(event.target.value))}
                       className="form-control mr-sm-2 mb-3"
                       type="text"
                       placeholder="Search"
                       value={term}/>
                {/*<button onClick={searchPok}>Search</button>*/}

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar">

                    <ul className="navbar-nav">
                        {filteredPok.map(item => (
                            <li key={item.name} className="nav-item">
                                <Link to={item.name}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default MenuItem;
