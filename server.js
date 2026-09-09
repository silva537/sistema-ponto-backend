const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ status: 'Servidor rodando com sucesso!' });
});

let registrosPonto = [];

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

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
