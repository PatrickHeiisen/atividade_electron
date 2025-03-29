// importação dos recursos do frame work
// dialog modulo electrom para ativar a caixa de mensagem
const { app, BrowserWindow, nativeTheme, Menu, shell, ipcMain, dialog } = require('electron/main')

// Ativação do preload.js (importação do path)
const path = require('node:path')

// Importação dos metodos conectar e desconectar (módulo de conexão)
const { conectar, desconectar } = require('./database.js')

const clienteModel = require('./src/models/cliente.js')


// janela principal
let win
const createWindow = () => {
    // definindo o tema da janela claro ou escuro
    nativeTheme.themeSource = 'light'
    win = new BrowserWindow({
        width: 1080,
        height: 900,
        //frame: false,
        //resizable: false,
        //minimizable: false,
        //closable: false,
        //autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // Carregar o menu personalização
    // Antes importar o recurso menu
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    // carregar o documento html
    win.loadFile('./src/views/index.html')
}

// Janela sobre
let about
function aboutWindow() {
    nativeTheme.themeSource = 'light'
    // obter a janela principal
    const mainWindow = BrowserWindow.getFocusedWindow()
    // validação (se existir a janela principal)
    if (mainWindow) {
        about = new BrowserWindow({
            width: 350,
            height: 300,
            autoHideMenuBar: true,
            resizable: false,
            minimizable: false,
            //estabelecer uma relação hierarquica entre janelas
            parent: mainWindow,
            // criar uma janela modal (só retorna a principal quando encerrada)
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }

    about.loadFile('./src/views/sobre.html')

    //recebimento da mensagem de renderização da tela sobre sobre para fechar a janela usando o botão 'OK'
    ipcMain.on('about-exit', () => {
        //validação (se existir a janela e ela não estiver destruida, fechada)
        if (about && !about.isDestroyed()) {
            about.close() //fechar a janela
        }
    })
}

// inicialização da aplicação (assincronismo)
app.whenReady().then(() => {
    createWindow()

    // melhor localç para estabelecer a conexão com o banco de dados
    // No MongoDB e mais eficiente manter uma unica conexão aberta durante todo o tempo de vida do aplicativo
    // ipcmain.on (receber mensagem)
    // db-connect (rotulo da mensagem)
    ipcMain.on('db-connect', async (event) => {
        // a linha a baixo estabelecer a conexão com o banco de dados
        await conectar()
        // enviar a o renderizador uma mensagem para trocar a imagem do icone do status do banco de dados
        setTimeout(() => {
            // enviar ao renderizador a mensagem "Conectado"
            // db-status (ipc - comunicação entre processos - proload.js)
            event.reply('db-status', "conectado")
        }, 500) //500ms = 0.5s
    })

    // so ativar a janela principal se nenhuma outra estiver ativa
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})


// se o sistema não for mac encerrar a aplicação quando a janela for fechada
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// IMPORTANTE encerrar a conexão com o banco de dados quando a aplicação for encerrada
app.on('before-quit', async () => {
    await desconectar()
})

// Reduzir o verbozidade de tops não criticos (devtools)
app.commandLine.appendSwitch('log-level', '3')

// template do menu
const template = [
    {
        label: 'Cadastro',
        submenu: [
            {
                label: 'Sair',
                accelerator: 'Alt+F4',
                click: () => app.quit()
            },
            {
                type: 'separator'
            },
        ]
    },
    {
        label: 'Relatório',
        submenu: [
            {
                label: 'Clientes'
            }
        ]
    },
    {
        label: 'Ferramentas',
        submenu: [
            {
                label: 'Aplicar zoom',
                role: 'zoomIn',
            },
            {
                label: 'Reduzir',
                role: 'zoomOut',
            },
            {
                label: 'Restaurar Zoom padrão',
                role: 'resetZoom',
            },
            {
                type: 'separator'
            },
            {
                label: 'Recarregar',
                role: 'reload'
            },
            {
                label: 'DevTools',
                role: 'toggleDevTools',
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Repositorio',
                click: () => shell.openExternal('https://github.com/PatrickHeiisen/atividade_electron')
            },
            {
                label: 'Sobre',
                click: () => aboutWindow()
            }
        ]
    }
]

//==================================================================
// == CRUD Create ==================================================

// Recebimento do objeto que contem os dados da nota
ipcMain.on('create-cliente', async (event, cadastroCliente) => {
    // IMPORTANTE  teste de recebimento do objeto (Passo 2)
    console.log(cadastroCliente)
    // Criar uma nova estrutura de dados para salvar no banco
    try{
        // atenção os atributos da estrutura precisam ser identicos ao modelo e os valores sao obtidos
        const newCliente = clienteModel({
            nome: cadastroCliente.Nome,
            sexo: cadastroCliente.Sexo,
            cpf: cadastroCliente.Cpf,
            email: cadastroCliente.Email,
            telefone: cadastroCliente.Telefone,
            endereco: cadastroCliente.Endereco,
            cep: cadastroCliente.Cep,
            logradouro: cadastroCliente.Logradouro,
            numero: cadastroCliente.Numero,
            complemento: cadastroCliente.Complemento,
            bairro: cadastroCliente.Bairro,
            cidade: cadastroCliente.Cidade,
            uf: cadastroCliente.Uf
        })
        // Salvar a nota no banco de dados (Passo 3)
        newCliente.save()

        // Confirmação de Cliente adicionado ao banco
        dialog.showMessageBox({
            type: 'info',
            title: 'Aviso',
            message: 'Cliente Adicionado Com Sucesso',
            buttons: ['OK']
        }).then((result) => {
            // Se o ok for pressionado
            if(result.response === 0){
                // enviar o pedido para o renderizador limpar os campos
                event.reply('reset-form')
            }
        })

    } catch (error) {
        console.log("ERROR")
    }
})
// == Fim - CRUD Create ============================================
//==================================================================