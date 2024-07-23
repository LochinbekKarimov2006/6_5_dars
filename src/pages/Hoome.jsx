import React, { useEffect, useState } from 'react';

function Hoome() {
    const [malumod, setMalumod] = useState("");
    const [obj, setObj] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(null);

    useEffect(() => {
        // localStorage'dan ma'lumotlarni olish
        const savedData = JSON.parse(localStorage.getItem("malumotlar"));
        if (savedData) {
            setObj(savedData);
        }
    }, []);

    useEffect(() => {
        // obj massivini localStorage'ga saqlash
        localStorage.setItem("malumotlar", JSON.stringify(obj));
    }, [obj]);

    function malumodQoshish(e) {
        e.preventDefault();
        const newObj = [...obj, malumod];
        setObj(newObj);
        setMalumod("");
    }

    function handleMouseEnter(index) {
        setHoverIndex(index);
    }

    function handleMouseLeave() {
        setHoverIndex(null);
    }

    function tozalash(index) {
        const newObj = obj.filter((_, i) => i !== index);
        setObj(newObj);
    }

    return (
        <div className='div-1 drop-shadow-2xl bg-base-100'>
            <form className='flex gap-2' onSubmit={malumodQoshish}>
                <input 
                    value={malumod} 
                    onChange={(e) => setMalumod(e.target.value)} 
                    className='input1 drop-shadow-2xl' 
                    type="text" 
                />
                <button type="submit" className=' drop-shadow-2xl button1'>Qo'shish</button>
            </form>
            <div className='div-2 drop-shadow-2xl bg-base-100'>
                {obj.map((item, index) => (
                    <div 
                        key={index}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        className='item-container'
                    >
                        <h1 className='h1 bg-base-100 drop-shadow-xl'><p>{item}</p>
                        {hoverIndex === index && (
                            <button onClick={() => tozalash(index)} className='button'>
                                <svg className='svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                                </svg>
                            </button>
                        )}
                        </h1>
                    </div>
                ))}
            </div>
            <div className='div-3'>
                <h1 className='bg-base-100 drop-shadow-2xl'>You have {obj.length} pending tasks</h1>
                <button  className='button1 bg-base-100 drop-shadow-2xl' onClick={() => setObj([])}>Clear All</button>
            </div>
        </div>
    );
}

export default Hoome;
