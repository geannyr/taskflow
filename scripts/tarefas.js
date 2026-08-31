const formularioTarefa = document.querySelector("#formulario-tarefa");
const campoTituloTarefa = document.querySelector("#titulo-tarefa");
const listaTarefas = document.querySelector("#lista-tarefas");
const contadorTarefas = document.querySelector("#contador-tarefas");

let tarefas = [
  {
    id: 1,
    titulo: "Ler o README do projeto",
    concluida: false
  },
  {
    id: 2,
    titulo: "Criar uma branch para praticar Git",
    concluida: true
  },
  {
    id: 3,
    titulo: "Abrir o projeto no navegador",
    concluida: false
  }
];

function renderizarTarefas() {
  listaTarefas.innerHTML = "";

  if (tarefas.length === 0) {
    const itemVazio = document.createElement("li");
    itemVazio.className = "mensagem-vazia";
    itemVazio.textContent = "Nenhuma tarefa cadastrada.";
    listaTarefas.appendChild(itemVazio);
  }

  tarefas.forEach(function (tarefa) {
    const item = document.createElement("li");
    item.className = "item-tarefa";

    if (tarefa.concluida) {
      item.classList.add("concluida");
    }

    const caixaSelecao = document.createElement("input");
    caixaSelecao.type = "checkbox";
    caixaSelecao.checked = tarefa.concluida;
    caixaSelecao.addEventListener("change", function () {
      alternarConclusaoTarefa(tarefa.id);
    });

    const titulo = document.createElement("span");
    titulo.className = "titulo-tarefa";
    titulo.textContent = tarefa.titulo;

    const acoes = document.createElement("div");
    acoes.className = "acoes-tarefa";

    const botaoEditar = document.createElement("button");
    botaoEditar.type = "button";
    botaoEditar.className = "botao-editar";
    botaoEditar.textContent = "Editar";
    botaoEditar.addEventListener("click", function () {
      editarTarefa(tarefa.id);
    });

    const botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.className = "botao-excluir";
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.addEventListener("click", function () {
      excluirTarefa(tarefa.id);
    });

    acoes.appendChild(botaoEditar);
    acoes.appendChild(botaoExcluir);

    item.appendChild(caixaSelecao);
    item.appendChild(titulo);
    item.appendChild(acoes);

    listaTarefas.appendChild(item);
  });

  atualizarContadorTarefas();
}

function adicionarTarefa(titulo) {
  const novaTarefa = {
    id: Date.now(),
    titulo: titulo,
    concluida: false
  };

  tarefas.push(novaTarefa);
  renderizarTarefas();
}

function alternarConclusaoTarefa(idTarefa) {
  tarefas = tarefas.map(function (tarefa) {
    if (tarefa.id === idTarefa) {
      tarefa.concluida = !tarefa.concluida;
    }

    return tarefa;
  });

  renderizarTarefas();
}

function excluirTarefa(idTarefa) {
  tarefas = tarefas.filter(function (tarefa) {
    return tarefa.id !== idTarefa;
  });

  renderizarTarefas();
}

function editarTarefa(idTarefa) {
  const tarefa = tarefas.find(function (itemTarefa) {
    return itemTarefa.id === idTarefa;
  });

  const novoTitulo = prompt("Edite o título da tarefa:", tarefa.titulo);

  tarefa.titulo = novoTitulo;
  renderizarTarefas();
}

function atualizarContadorTarefas() {
  const total = tarefas.length;
  const texto = total === 1 ? "1 tarefa" : total + " tarefas";

  contadorTarefas.textContent = texto;
}

formularioTarefa.addEventListener("submit", function (evento) {
  evento.preventDefault();

  adicionarTarefa(campoTituloTarefa.value);
  campoTituloTarefa.value = "";
  campoTituloTarefa.focus();
});

renderizarTarefas();
