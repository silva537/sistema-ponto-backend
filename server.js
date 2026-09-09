const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Porta que o Render vai fornecer ou a porta 3000 para testes locais
const PORT = process.env.PORT || 3000;

// Rota básica para testar se o servidor está online
app.get('/', (req, res) => {
  res.json({ status: 'Servidor rodando com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Banco de dados temporário em memória (depois podemos plugar um banco real se precisar)
let registrosPonto = [];

// Rota de teste
app.get('/', (req, res) => {
  res.json({ status: 'Servidor rodando com sucesso!' });
});

// Rota para salvar um novo ponto/ronda enviado pelo vigia
app.post('/api/pontos', (req, res) => {
  const novoRegistro = req.body;
  
  // Adiciona uma data/hora no servidor caso não venha no corpo
  novoRegistro.id = Date.now();
  novoRegistro.recebidoEm = new Date().toISOString();
  
  registrosPonto.push(novoRegistro);
  
  console.log('Novo registro recebido:', novoRegistro);
  res.status(201).json({ 
    sucesso: true, 
    mensagem: 'Registro salvo com sucesso!', 
    registro: novoRegistro 
  });
});

// Rota para o painel de supervisão consultar todos os registros
app.get('/api/pontos', (req, res) => {
  res.json(registrosPonto);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
