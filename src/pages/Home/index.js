import React, { useState } from 'react';
import axios from 'axios';
import * as S from './styled'
import { useHistory } from 'react-router-dom';

export default function Home(props) {
  const [usuario, setUsuario] = useState('');
  const history = useHistory();
  const [erro, setErro] = useState(false);

  function handlePesquisa(){
    axios.get(`https://api.github.com/users/${usuario}/repos`)
    .then(response => {
      const repositories = response.data;
      const repositoriesName = [];
     
      // eslint-disable-next-line array-callback-return
      repositories.map((repository) => {
        repositoriesName.push(repository.name)
      });

      localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
      setErro(false);
      history.push('/repositories');
    })
    .catch(err =>{
      setErro(true);
    });
  }

  return (
    <S.HomeContainer>
      <S.Container>
        <S.Input placeholder="Usuário" className="userInput" value = {usuario} onChange = {e => setUsuario(e.target.value)} />
        <S.Button type="button" onClick={handlePesquisa}>Pesquisar</S.Button>
      </S.Container>
      {erro ? <S.ErrorMsg>Dados não encontrados.</S.ErrorMsg> : ''}
    </S.HomeContainer>
  )
}


