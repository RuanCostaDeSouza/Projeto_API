const config = require('./config/configexpress')
const conexao = require('./Infraestrutura/conexao')
const tabelas = require('./Infraestrutura/tabelas')
conexao.connect(erro=>{
    if(erro){
        console.log(erro)
    } else{
        console.log('conectado')

        tabelas.init(conexao)

        const app = config()

        app.listen(3000, () => console.log('servidor rodando na porta 3000'))
    }
})


