const {model, Schema} = require('mongoose');

const ClienteSchema = new Schema({
    nome: { type: String},
    sexo: { type: String},
    cpf: { type: String,},
    email: { type: String,},
    telefone: { type: String},
    cep: {type: String},
    logradouro: {type: String},
    numero: {type: String},
    complemento: {type: String},
    bairro: {type: String},
    cidade: {type: String},
    uf: {type: String}
},{versionKey: false});

module.exports = model('Cliente', ClienteSchema);

