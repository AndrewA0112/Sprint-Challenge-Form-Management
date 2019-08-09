import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserListing= ({ history }) => {
    if(localStorage.getItem('token') === null){
        history.push('/register')
    }

    const [ food, setFood ] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/api/restricted/data')
            .then(response =>{
                console.log(response)
                setFood(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div>
            <h1>Food List</h1>
            {
                food.map(fd => {
                    return <h3 key={fd.name}>{fd.name}</h3>
                })
            }
        </div>
    )
}

export default UserListing;