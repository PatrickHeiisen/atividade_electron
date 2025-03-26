const foco = document.getElementById('inputForm')

document.addEventListener('DOMContentLoaded', () =>{
    foco.focus() //iniciar o documento com foco na caixa de texto
})

// capturar os dados do formulario (Passo 1: fluxo)
let cadastro = document.getElementById('cadastro')

//==================================================================
// == CRUD Create ==================================================

// Evento relacionado ao botão submit
cadastro.addEventListener('submit', async (event) => {
    // evitar o comportamento padrão (recarregar a pagina)
    event.preventDefault()
    // Importante (teste de recebimento dos dados do form - Passo 1)
    console.log(
        Name.value,
        sexo.value,
        cpf.value,
        email.value,
        telefone.value,
        endereco.value,
        //cep.value,
        //logradouro.value,
        //numero.value,
        //complemento.value,
        //bairro.value,
        //cidade.value,
        //uf.value,
    )
    // criar um objeto para enviar para o main os dados da nota
    const formCliente = {
        clienteName: Name.value,
        clienteSexo: sexo.value,
        clienteCpf: cpf.value,
        clienteEmail: email.value,
        clienteTelefone: telefone.value,
        clienteEndereco: endereco.value,
    }
    // Enviar o objeto para o main (Passo 2: fluxo)
    api.createNote(formCliente)
})

// == Fim - CRUD Create ============================================
//==================================================================

