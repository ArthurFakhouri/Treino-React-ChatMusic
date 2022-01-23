import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/user';
import './style.css'

export default function Home() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    function handleClick() {
        if (user) {
            navigate('room');
        } else {
            let span = document.querySelector('span');
            span.style.display = 'block';
            setInterval(() => {
                span.style.display = 'none';
            }, 2000);
        }
    }

    return (
        <div className="App">
            <div className='borderCont'>
                <div className='container'>
                    <input type="text" placeholder='Digite seu nome' maxLength={25} value={user} onChange={(e) => setUser(e.target.value)} />
                    <button onClick={handleClick}>Entrar</button>
                    <span>Informe um nome para entrar na sala!</span>
                </div>
            </div>
        </div>
    )
}