const db = require('./db');

// Cria tabelas se não existirem
async function init() {
  const existsAgenda = await db.schema.hasTable('agenda');
  if (!existsAgenda) {
    await db.schema.createTable('agenda', (table) => {
      table.increments('id').primary();
      table.string('titulo').notNullable();
      table.text('descricao');
      table.date('data');
    });
    console.log('✅ Tabela "agenda" criada.');
  }

  const existsFinanceiro = await db.schema.hasTable('financeiro');
  if (!existsFinanceiro) {
    await db.schema.createTable('financeiro', (table) => {
      table.increments('id').primary();
      table.string('tipo').notNullable(); // ex: entrada ou saída
      table.float('valor').notNullable();
      table.string('categoria');
      table.date('data');
      table.text('descricao');
    });
    console.log('✅ Tabela "financeiro" criada.');
  }

  process.exit();
}

init();
