const foco = document.getElementById('inputForm')

document.addEventListener('DOMContentLoaded', () => {
    foco.focus() //iniciar o documento com foco na caixa de texto
})

// capturar os dados do formulario (Passo 1: fluxo)
let formCliente = document.getElementById('formCliente')
let clienteNome = document.getElementById('nome')
let clienteSexo = document.getElementById('sexo')
let clienteCpf = document.getElementById('cpf')
let clienteEmail = document.getElementById('email')
let clienteTelefone = document.getElementById('telefone')
let clienteCep = document.getElementById('cep')
let clienteLogradouro = document.getElementById('logradouro')
let clienteNumero = document.getElementById('numero')
let clienteComplemento = document.getElementById('complemento')
let clienteBairro = document.getElementById('bairro')
let clienteCidade = document.getElementById('cidade')
let clienteUf = document.getElementById('uf')

//==================================================================
// == CRUD Create ==================================================

// Evento relacionado ao botão submit
formCliente.addEventListener('submit', async (event) => {
    // evitar o comportamento padrão (recarregar a pagina)
    event.preventDefault()
    // Importante (teste de recebimento dos dados do form - Passo 1)
    console.log(clienteNome.value)
    // criar um objeto para enviar para o main os dados da nota
    const cadastroCliente = {
        nome: clienteNome.value,
        sexo: clienteSexo.value,
        cpf: clienteCpf.value,
        email: clienteEmail.value,
        telefone: clienteTelefone.value,
        cep: clienteCep.value,
        logradouro: clienteLogradouro.value,
        numero: clienteNumero.value,
        complemento: clienteComplemento.value,
        bairro: clienteBairro.value,
        cidade: clienteCidade.value,
        uf: clienteUf.value
    }
    // Enviar o objeto para o main (Passo 2: fluxo)
    api.createCliente(cadastroCliente)
})

// == Fim - CRUD Create ============================================
//==================================================================

