// Declara uma lista vazia para armazenar os números sorteados
let listaDeNumeroSorteados = [];

// Define o limite de números que podem ser gerados
let limiteDeNumerosNaLista = 100;

// Gera um número aleatório que será o "número secreto"
let numeroSecreto = gerarNumeroAleatorio();

// Contador de tentativas do jogador
let tentativas = 1;

// Função que exibe um texto em um elemento HTML (tag) específico
function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag); // Seleciona o elemento HTML pela tag
  campo.innerHTML = texto; // Insere o texto dentro do elemento HTML
  // A linha abaixo está comentada, mas poderia ser usada para transformar o texto em fala
  // responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
}

// Função que exibe a mensagem inicial do jogo
function exibirMensagemInicial() {
  exibirTextoNaTela("h1", "Jogo do número secreto"); // Exibe o título do jogo
  exibirTextoNaTela(
    "p",
    `Escolha um número entre 1 e ${limiteDeNumerosNaLista}` // Exibe as instruções do jogo
  );
}
exibirMensagemInicial(); // Chama a função para exibir a mensagem inicial ao carregar a página

// Função para verificar o chute do usuário
function verificarChute() {
  let chute = document.querySelector("input").value; // Obtém o valor digitado no campo input
  if (chute == numeroSecreto) {
    // Verifica se o chute está correto
    exibirTextoNaTela("h1", "Acertou!"); // Exibe a mensagem de acerto
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa"; // Define se o plural de 'tentativa' será usado
    let mensagemTentitvas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`; // Monta a mensagem de sucesso
    exibirTextoNaTela("p", mensagemTentitvas); // Exibe a mensagem de sucesso
    document.getElementById("reiniciar").removeAttribute("disabled"); // Habilita o botão de reiniciar
  } else {
    // Se o chute estiver errado
    exibirTextoNaTela("h1", "Você errou, tente novamente!"); // Exibe mensagem de erro

    // Informa se o número secreto é maior ou menor
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", "O número secreto é menor");
    } else {
      exibirTextoNaTela("p", "O número secreto é maior");
    }
    tentativas++; // Incrementa o número de tentativas
    limparCampo(); // Limpa o campo input
  }
}

// Função para gerar um número aleatório
function gerarNumeroAleatorio() {
  // Gera um número aleatório entre 1 e o limite definido
  let numeroEscolhido = parseInt(Math.random() * limiteDeNumerosNaLista + 1);
  let quantidadeDeNumerosEscolhidos = listaDeNumeroSorteados.length; // Conta quantos números já foram sorteados

  // Reinicia a lista se todos os números já tiverem sido sorteados
  if (quantidadeDeNumerosEscolhidos == limiteDeNumerosNaLista) {
    listaDeNumeroSorteados = [];
  }

  // Verifica se o número já foi sorteado, caso sim, chama a função novamente
  if (listaDeNumeroSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio(); // Evita repetir números sorteados
  } else {
    listaDeNumeroSorteados.push(numeroEscolhido); // Adiciona o número à lista de sorteados
    console.log(listaDeNumeroSorteados); // Exibe a lista de sorteados no console (para depuração)
    return numeroEscolhido; // Retorna o número gerado
  }
}

// Função para limpar o campo de entrada de dados (input)
function limparCampo() {
  chute = document.querySelector("input"); // Seleciona o campo input
  chute.value = ""; // Limpa o valor do input
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  exibirMensagemInicial(); // Exibe a mensagem inicial novamente
  numeroSecreto = gerarNumeroAleatorio(); // Gera um novo número secreto
  limparCampo(); // Limpa o campo de entrada
  tentativas = 1; // Reseta o contador de tentativas
  document.getElementById("reiniciar").setAttribute("disabled", true); // Desabilita o botão de reiniciar até o próximo acerto
}
