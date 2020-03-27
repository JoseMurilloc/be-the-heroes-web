import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';

import api from '../../services/api';

import logo from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {

  /* States */
  const [id, setId] = useState('');

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    
    try {
      const response = await api.post('/sessions', { id });
      console.log(response.data.name);

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name); 

      history.push('/profile');
      
    } catch(err) {
      console.log('Erro ao realizar o login, tente novamente!');
    }
  }


  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Be the heroes"/>

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

            <input 
              placeholder="Sua ID"
              onChange={e => setId(e.target.value)}
            />
            <button className="button" type="submit">Entrar</button>

            <Link className="back-link" to="/register">
              <FiLogIn  color="#E02041" size={16} />
              Não tenho cadastro
            </Link>

          </form>
      </section>
    
      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}
