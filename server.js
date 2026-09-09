const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

let registrosPonto = [];
let notificacoes = [];
let logs = [];

app.get('/', (req, res) => {
  res.json({ status: 'Servidor rodando com sucesso!' });
});

// Rotas de Ponto
app.post('/api/pontos', (req, res) => {
  const novoRegistro = req.body;
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

app.get('/api/pontos', (req, res) => {
  res.json(registrosPonto);
});

// Rotas de Notificações
app.post('/api/notificacoes', (req, res) => {
  const novaNotificacao = req.body;
  novaNotificacao.id = Date.now();
  notificacoes.push(novaNotificacao);
  res.status(201).json({ sucesso: true, mensagem: 'Notificação enviada!' });
});

app.get('/api/notificacoes', (req, res) => {
  res.json(notificacoes);
});

// Rotas de Logs
app.post('/api/logs', (req, res) => {
  const novoLog = req.body;
  novoLog.id = Date.now();
  logs.push(novoLog);
  res.status(201).json({ sucesso: true, mensagem: 'Log recebido!' });
});

app.get('/api/logs', (req, res) => {
  res.json(logs);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

