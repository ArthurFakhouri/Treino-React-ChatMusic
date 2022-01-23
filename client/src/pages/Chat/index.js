import './chat.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/user';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

export default function Chat() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() =>{
        if (!user) 
            navigate('/');
        socket.emit('user_connected', { user: user, isServer: true });
        loadTexts();
        handlerEnter();
    }, []);

    function loadTexts() {
        socket.on('msgFromServer', (data) => {
            textServer(data.text);
        });
        socket.on('msgToUser', (data) => {
            textUser(data.user, data.text);
        });
    }

    function textServer(text) {
        const mensagens = document.querySelector('.mensagens');
        mensagens.innerHTML += `
        <p class='serverText'>${text}</p>
        `
        mensagens.scrollTop = mensagens.scrollHeight;
    }

    function textUser(userSent, text) {
        const mensagens = document.querySelector('.mensagens');
        const mensagem = document.querySelector('#mensagem');
        let style = '';
        if (userSent !== user) {
            style = "margin-left: 0;margin-right:auto;border-bottom-right-radius: 20px;border-bottom-left-radius: 5px;";
        }
        document.querySelector('#mensagem');
        mensagens.innerHTML += `
        <fieldset style="${style}">
        <legend>${userSent}</legend>
        <p>${text}</p>
        </fieldset>
        `
        mensagem.value = "";
        mensagens.scrollTop = mensagens.scrollHeight;
    }

    function handlerClick() {
        const mensagem = document.querySelector('#mensagem');
        if (mensagem.value.trim())
            socket.emit('msgFromUser', { user: user, text: mensagem.value });
    }

    function handlerEnter() {
        const msg = document.querySelector('#mensagem');
        msg.addEventListener("keydown", (e) => {
            if (e.key === "Enter")
                handlerClick();
        });
    }

    return (
        <div id='container'>
            <div className='mensagens'>
            </div>
            <div className='controls'>
                <input type="text" placeholder='Digite sua mensagem' id='mensagem' />
                <button onClick={handlerClick}><FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>
            <iframe src="https://open.spotify.com/embed/playlist/4iInTEPBbYgXk1mFAKwbyr" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div>
    )
}