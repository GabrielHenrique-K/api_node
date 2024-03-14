import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [ultimoPost, setUltimoPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUltimoPost = async () => {
      try {
        const response = await axios.get('http://localhost:8000/ultimo_post/');
        setUltimoPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar último post:', error);
        setLoading(false);
      }
    };

    fetchUltimoPost();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Último Post da API FastAPI</h1>
      {loading ? (
        <p className="loading">Carregando...</p>
      ) : (
        ultimoPost ? (
          <div className="response">
            <p><strong>Sensor:</strong> {ultimoPost.Sensor.toString()}</p>
            <p><strong>Botão:</strong> {ultimoPost.Botao.toString()}</p>
            <p><strong>Liga Robô:</strong> {ultimoPost.LigaRobo.toString()}</p>
            <p><strong>Reset Contador:</strong> {ultimoPost.ResetContador.toString()}</p>
            <p><strong>Valor da Contagem:</strong> {ultimoPost.ValorContagem}</p>
          </div>
        ) : (
          <p className="no-data">Nenhum post foi feito ainda.</p>
        )
      )}
    </div>
  );
}

export default App;
