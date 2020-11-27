import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Link} from "react-router-dom";
import MenuItem from "../menu/MenuItem";
import Spinner from "../spinner/Spinner";

function List() {
    const [dataPok, setDataPok] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            const result = await axios('https://pokeapi.co/api/v2/pokemon');
            setDataPok(result.data.results)
            setIsLoading(false)
        }

        fetchData()
    }, [])

    if (isLoading || !dataPok) {
        return (
            <div className="container text-center">
                <h1 className='text-center mt-3 mb-3 font-weight-bold title'>Pokemon DB</h1>
                <Spinner/>
            </div>
        )
    }


    return (
        <div className='container-fluid'>
            <div className='row'>

                <MenuItem/>

                <div className='col-md-8 col-lg-9 content-container'>
                    <div className="container">
                        <h1 className='text-center mt-3 mb-3 font-weight-bold title'>Pokemon DB</h1>

                        <ul className="list">
                            {dataPok.map((item, index) => (
                                <li key={item.name} className="list-item">
                                    <Link to={item.name}>{item.name}</Link>
                                    <div className="img-container">
                                        <img
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                                            alt='pokemon'/>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default List;
