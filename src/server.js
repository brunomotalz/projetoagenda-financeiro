const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// ==================== ROTAS AGENDA ====================

// Listar todas as tarefas
app.get('/agenda', async (req, res) => {
  try {
    const tarefas = await db('agenda').select('*');
    res.json(tarefas);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ erro: 'Erro ao buscar tarefas.' });
  }
});

// Adicionar nova tarefa
app.post('/agenda', async (req, res) => {
  try {
    const { titulo, descricao, data } = req.body;
    await db('agenda').insert({ titulo, descricao, data });
    res.json({ mensagem: 'Tarefa adicionada com sucesso!' });
  } catch (error) {
    console.error('Erro ao adicionar tarefa:', error);
    res.status(500).json({ erro: 'Erro ao adicionar tarefa.' });
  }
});

// Deletar tarefa
app.delete('/agenda/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db('agenda').where({ id }).del();
    res.json({ mensagem: 'Tarefa removida com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    res.status(500).json({ erro: 'Erro ao deletar tarefa.' });
  }
});

// ==================== ROTAS FINANCEIRO ====================

// Listar registros financeiros
app.get('/financeiro', async (req, res) => {
  try {
    const registros = await db('financeiro').select('*');
    res.json(registros);
  } catch (error) {
    console.error('Erro ao buscar registros financeiros:', error);
    res.status(500).json({ erro: 'Erro ao buscar registros financeiros.' });
  }
});

// Adicionar novo registro financeiro
app.post('/financeiro', async (req, res) => {
  try {
    const { tipo, valor, categoria, data, descricao } = req.body;
    await db('financeiro').insert({ tipo, valor, categoria, data, descricao });
    res.json({ mensagem: 'Registro financeiro adicionado com sucesso!' });
  } catch (error) {
    console.error('Erro ao adicionar registro financeiro:', error);
    res.status(500).json({ erro: 'Erro ao adicionar registro financeiro.' });
  }
});

// Deletar registro financeiro
app.delete('/financeiro/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db('financeiro').where({ id }).del();
    res.json({ mensagem: 'Registro financeiro removido com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar registro financeiro:', error);
    res.status(500).json({ erro: 'Erro ao deletar registro financeiro.' });
  }
});

// ==================== INICIALIZA SERVIDOR ====================
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
});

