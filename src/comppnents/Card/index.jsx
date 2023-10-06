import React from 'react'

const Card = ({ scoop, basket, setBasket }) => {

    const { imagePath, name } = scoop;
    // farklı ürürnlerden ekleme işlemi
    const found = basket.filter((item) => item.name === name)
    const amaunt = found.length

    // farklı ürürnlerden silme işlemi
    const handleReset = () => {
        const clearBasket = basket.filter((item) => item.name !== name)
        setBasket(clearBasket)
    }

    return (
        <div style={{ width: "150px" }} className='d-flex flex-column align-items-center'>
            <img className='img-fluid' src={imagePath} alt="test-img" />
            <label className='lead' htmlFor="">{name}</label>
            <div className='d-flex gap-2'>
                <button onClick={handleReset} className='btn btn-danger align-items-center'>Sıfırla</button>
                <span className='fs-2'>{amaunt}</span>
                <button onClick={() => setBasket([...basket, scoop])} className='btn btn-success'>Ekle</button>
            </div>
        </div>
    )
}

export default Card