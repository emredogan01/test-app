import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Toppings = () => {
    const [toppingData, setToppingData] = useState([]);
    const [basket, setBasket] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/toppings")
            .then(res => setToppingData(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleChange = (e, topping) => {
        e.target.checked ? setBasket([...basket, topping]) : setBasket(basket.filter((basket) => basket.name !== topping.name))
    }


    return (
        <div className='container mt-4'>
            <h1>Sos Çeşitleri</h1>
            <p>Tanesi 3 &#8378;</p>
            <h2>Soslar ücreti: {basket.length * 3} &#8378;</h2>
            <div className='row gap-3 mt-4 justify-content-between'>
                {toppingData.map((item, idx) => {
                    return (
                        <div style={{ width: "150px" }} key={idx} className='d-flex flex-column align-items-center'>
                            <img className='img-fluid' src={item.imagePath} alt="" />
                            <label className='text-nowrap' htmlFor={item.name}>{item.name}</label>
                            <input onChange={(e) => handleChange(e, item)} type="checkbox" className='form-check-input' id={item.name} />
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Toppings;