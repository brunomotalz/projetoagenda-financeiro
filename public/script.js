const API_URL = "http://localhost:3000";

// ====== AGENDA ======
const formAgenda = document.getElementById('form-agenda');
const listaAgenda = document.getElementById('lista-agenda');

async function carregarAgenda() {
  const res = await fetch(`${API_URL}/agenda`);
  const tarefas = await res.json();
  listaAgenda.innerHTML = '';
  tarefas.forEach(t => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${t.titulo}</strong> - ${t.data}<br>
      ${t.descricao || ''}<br>
      <button onclick="deletarTarefa(${t.id})">Excluir</button>
    `;
    listaAgenda.appendChild(li);
  });
}

formAgenda.addEventListener('submit', async (e) => {
  e.preventDefault();
  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const data = document.getElementById('data').value;

  await fetch(`${API_URL}/agenda`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, descricao, data })
  });

  formAgenda.reset();
  carregarAgenda();
});

async function deletarTarefa(id) {
  await fetch(`${API_URL}/agenda/${id}`, { method: 'DELETE' });
  carregarAgenda();
}

// ====== FINANCEIRO ======
const formFinanceiro = document.getElementById('form-financeiro');
const listaFinanceiro = document.getElementById('lista-financeiro');

async function carregarFinanceiro() {
  const res = await fetch(`${API_URL}/financeiro`);
  const registros = await res.json();
  listaFinanceiro.innerHTML = '';
  registros.forEach(r => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${r.tipo.toUpperCase()}</strong> - R$${r.valor.toFixed(2)} (${r.categoria || 'Sem categoria'}) - ${r.data}<br>
      ${r.descricao || ''}<br>
      <button onclick="deletarRegistro(${r.id})">Excluir</button>
    `;
    listaFinanceiro.appendChild(li);
  });
}

formFinanceiro.addEventListener('submit', async (e) => {
  e.preventDefault();
  const tipo = document.getElementById('tipo').value;
  const valor = parseFloat(document.getElementById('valor').value);
  const categoria = document.getElementById('categoria').value;
  const data = document.getElementById('dataFinanceiro').value;
  const descricao = document.getElementById('descricaoFinanceiro').value;

  await fetch(`${API_URL}/financeiro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tipo, valor, categoria, data, descricao })
  });

  formFinanceiro.reset();
  carregarFinanceiro();
});

async function deletarRegistro(id) {
  await fetch(`${API_URL}/financeiro/${id}`, { method: 'DELETE' });
  carregarFinanceiro();
}

// ====== Inicialização ======
carregarAgenda();
carregarFinanceiro();
