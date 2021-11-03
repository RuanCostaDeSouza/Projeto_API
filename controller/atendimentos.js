const atendimentos = require('../models/atendimentos')
const Atendimento = require('../models/atendimentos')

module.exports= app => {
    app.get('/atendimento', (req, res) => {
        Atendimento.lista(res)

    })

    app.post('/atendimento', (req,res)=> { 
        const atendimento = req.body

        Atendimento.adiciona(atendimento, res)
        
    })  

    app.get('/atendimento/:id',(req,res)=>{
        const id = parseInt(req.params.id)
        Atendimento.BuscaPorID(id,res)
    })

    app.patch('/atendimento/:id',(req,res)=>{
        const id = parseInt(req.params.id)
        const valores = req.body
        Atendimento.altera(id,valores,res)
    })
    app.delete('/atendimento/:id',(req,res)=>{
        const id=parseInt(req.params.id)
        Atendimento.deleta(id,res)
    })
}
