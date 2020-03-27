import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logo from '../../assets/logo.svg';

import api from '../../services/api';

export default function NewIncident() {
  
  /* Estados */
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);

  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  /* Função para criar um novo caso */
  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    }

    try {
      await api.post('/incidents', data, {
        headers: {
          Authorization: ongId,
        }
      });

      history.push('/profile');
    } catch (err) {
      alert('Não possivel criar o novo caso, tente novamente por favor...');
    }
  }

  return (
    <div className="new-incedent-container">
      <div className="contant">
        <section>
          <img src={logo} alt="Heroes"/>
          <h1>Cadastrar novo caso</h1>

          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a ajude pessoas e encontrarem os casos da sua ONG</p>
        
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input 
            type="text" 
            placeholder="Titulo do caso"
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            placeholder="Descrição" 
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
          <input 
            type="text" 
            placeholder="Valor em reais" 
            onChange={e => setValue(e.target.value)}
            value={value}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
