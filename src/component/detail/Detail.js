import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from '../spinner/Spinner'

export default function Detail({match:{params:{id}}}){
    const [dataDetail, setDataDetail] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        async function fetchData(){
            setIsLoading(true)
            const result = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
            setDataDetail(result.data)
            setIsLoading(false)
        }
        fetchData();
    }, [id])

    if (isLoading || !dataDetail.sprites){
        return (
            <div className="container">
                <div className="card">
                    <Spinner/>
                </div>
            </div>
            )
    }

    return (
        <div className="container">
            <div className="card card-item">
                <h1>Name: {id}</h1>
                <div className="img-container">
                    <img src={dataDetail.sprites.front_default} alt={dataDetail.name} />
                    <img src={dataDetail.sprites.back_default} alt={dataDetail.name} />
                </div>
                <p>height: {dataDetail.height}</p>
                <p>weight: {dataDetail.weight}</p>
                <p>type: {dataDetail.types[0].type.name}</p>
                <p>ability: {dataDetail.abilities[0].ability.name}</p>
                <button>
                    <Link to="/">come back</Link>
                </button>

            </div>
        </div>
    );
}

