import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowDownLeft } from 'react-icons/fi';
import './styles.css';

import api from '../../services/api'; 

import logo from '../../assets/logo.svg';

export default function Register() {

  /* States */
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory()



  async function handleRegister(e) {
    e.preventDefault();


    const data ={
      name,
      email,
      whatsapp,
      city,
      uf
    }


    try {
      const response = await api.post('/ongs', data);

      alert(`O seu id de acesso: ${response.data.id}`);

      history.push('/');
    } catch (err) {
      console.log('Erro no cadastro, tente novamente');
    }

  }


  return (
    <div className="register-container">
      <div className="contant">
        <section>
          <img src={logo} alt="Heroes"/>
          <h1>Cadastro</h1>

          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a ajude pessoas e encontrarem os casos da sua ONG</p>
        
          <Link className="back-link" to="">
            <FiArrowDownLeft size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </section>
          <form onSubmit={handleRegister}>
            <input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              type="text" 
              placeholder="Nome da ONG"
            />
            <input 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              type="email" 
              placeholder="E -mail" 
            />
            <input 
              value={whatsapp} 
              onChange={e => setWhatsapp(e.target.value)} 
              type="tel" 
              placeholder="Whatsapp" 
            />
            <div className="inputs-group">
              <input 
                value={city}
                onChange={e => setCity(e.target.value)}
                type="text" 
                placeholder="Cidade" 
              />
              <input 
                value={uf}
                type="text" 
                placeholder="UF" 
                style={{ width: 80 }} 
                onChange={e => setUf(e.target.value)}
              />
            </div>

            <button className="button" type="submit">Cadastrar</button>
          </form>
      </div>
    </div>
  );
}
