const {model, Schema} = require('mongoose');

const ClienteSchema = new Schema({
    nome: { type: String},
    sexo: { type: String},
    cpf: { type: String,},
    email: { type: String,},
    telefone: { type: String},
    endereco: {
        cep: String,
        logradouro: String,
        numero: String,
        complemento: String,
        bairro: String,
        cidade: String,
        uf: String
    }
});

module.exports = model('Cliente', ClienteSchema);
