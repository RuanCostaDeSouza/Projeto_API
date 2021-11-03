const moment = require('moment')
const conexao = require('../Infraestrutura/conexao')

class Atendimentos {
    adiciona(atendimento,res){
        const dataCriacao = moment().format('YYYY-MM-DD HH-MM-SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH-MM-SS')
        
        const dataEhValida = data >= dataCriacao
        const clienteEhValido = atendimento.cliente.length >=5

        const validacoes = [
            {
                nome:'data',
                valido:dataEhValida,
                msg:'data invalida, a data deve ser maior do que a atual'
            },
            {
                nome:'cliente',
                valido: clienteEhValido,
                msg:'nome de cliente invalido, nome deve ter mais que 5 caracteres'
            }
        ]

        const erros = validacoes.filter(campo=>!campo.valido)

        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        }else{

            const atendimentoDatado= {...atendimento, dataCriacao ,data}
            const sql = 'INSERT INTO atendimentos SET ?'
    
            conexao.query(sql, atendimentoDatado, (erro, resultados) =>{
                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(201).json(resultados)
                }
            })
        }
    }

    lista(res){
        const sql = 'SELECT * FROM atendimentos'
        conexao.query(sql,(erro,resultado)=>{
            if(erro){
                res.json(erro)
            } else{
                res.json(resultado)
            }
        })
    }

    BuscaPorID(id,res){
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`;

        conexao.query(sql, (erro,resultados)=>{
            if(erro){
                res.json(erro)
            } else{
                res.json(resultados)
            }
        })
    }

    altera(id, valores,res){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH-MM-SS')
        }
        
        const sql='UPDATE atendimentos set ? WHERE id=?'

        conexao.query(sql,[valores,id],(erro,resultados)=>{
            if(erro){
                res.json(erro)
            }else{
                res.json(resultados)
            }
        })
    }

    deleta(id,res){
        const sql = `DELETE FROM atendimentos WHERE id =${id}`
        conexao.query(sql, (erro,resultados)=>{
            if(erro){
                res.json(erro)
            } else{
                res.json(resultados)
            }
        })
    }
}
module.exports = new Atendimentos