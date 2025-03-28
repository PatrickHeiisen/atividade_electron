/**
 * Processo de renderização do documento index.js
 */

console.log("Processo de renderização")

// inserção da data no rodapé
function obterData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return data.toLocaleDateString('pt-BR', options)
}

document.getElementById('dataAtual').innerHTML = obterData()

// Troca do icone do banco de dados (Status da conexão)
// uso da api do preload.js
api.dbStatus((event, message) => {
    // Teste de recebimento da mensagem
    console.log(message)

    if (message === "conectado") {
        document.getElementById('iconeDB').src = "../public/img/dbon.png"
    } else {
        document.getElementById('iconeDB').src = "../public/img/dboff.png"
    }
})


const foco = document.getElementById('inputNome')

document.addEventListener('DOMContentLoaded', () => {
    foco.focus() //iniciar o documento com foco na caixa de texto
})

// capturar os dados do formulario (Passo 1: fluxo)
let formCliente = document.getElementById('formCliente')
let nome = document.getElementById('inputNome')
let sexo = document.getElementById('inputSexo')
let cpf = document.getElementById('inputCpf')
let email = document.getElementById('inputEmail')
let telefone = document.getElementById('inputTelefone')
let cep = document.getElementById('inputCep')
let logradouro = document.getElementById('inputLogradouro')
let numero = document.getElementById('inputNumero')
let complemento = document.getElementById('inputComplemento')
let bairro = document.getElementById('inputBairro')
let cidade = document.getElementById('inputCidade')
let uf = document.getElementById('inputUf')

//==================================================================
// == CRUD Create ==================================================

// Evento relacionado ao botão submit
formCliente.addEventListener('submit', async (event) => {
    // evitar o comportamento padrão (recarregar a pagina)
    event.preventDefault()
    // Importante (teste de recebimento dos dados do form - Passo 1)
    console.log(nome.value, sexo.value, cpf.value, email.value, telefone.value,
        cep.value, logradouro.value, numero.value, complemento.value,
        bairro.value, cidade.value, uf.value)
    // criar um objeto para enviar para o main os dados da nota
    const cadastroCliente = {
        Nome: nome.value,
        Sexo: sexo.value,
        Cpf: cpf.value,
        Email: email.value,
        Telefone: telefone.value,
        Cep: cep.value,
        Logradouro: logradouro.value,
        Numero: numero.value,
        Complemento: complemento.value,
        Bairro: bairro.value,
        Cidade: cidade.value,
        Uf: uf.value
    }
    // Enviar o objeto para o main (Passo 2: fluxo)
    api.createCliente(cadastroCliente)
})

// == Fim - CRUD Create ============================================
//==================================================================

