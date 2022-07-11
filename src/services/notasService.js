const { query } = require('express');
const { response } = require('express');
const db = require('../config/db');

const getAllNotas = async () => {
  let sql = 'select * from notas';
  let remedio = await db.query(sql);
  return remedio.rows;
}
const getNotasById = async (params) => {
  let sql = `select * from notas where id = $1`;
  let paciente = await db.query(sql, [params.id]);
  return paciente.rows;
};
const persistir = async (params) => {
  if (!params.id) {
    console.log(params);
    let sql = `insert into notas (nota, peso, id_disciplina, id_aluno, observacao)
        values ($1, $2, $3, $4, $5) returning id;`
    const { nota, peso, id_disciplina, id_aluno, observacao } = params;
    const query = await db.query(sql, [nota, peso, id_disciplina, id_aluno, observacao]);

    return { type: 'info', msg: 'Registro incluído com sucesso!', data: { id: query.rows[0].id } };
  }

  let fields = [];

  Object.keys(params).forEach(e => {
    if (e !== 'id') {
      if (params[e] === '' || params[e] == null) {
        fields.push(`${e} = null`)
      } else {
        fields.push(`${e} = '${params[e]}'`)
      }
    }
  });
  fields = fields.join(', ');
  const sql = `update notas set ${fields} where id = ${params.id}`;

  const response = await db.query(sql);
  const msg = response.rowCount === 0
    ? `Não foi encontrado nenhum registro com o id ${params.id}`
    : `Registro ${params.id} alterado com sucesso!`;

  return { type: 'info', msg }
}
const deleteNotas = async (params) => {

  let sql = 'delete from notas where id = $1;';
  let query = await db.query(sql, [params.id]);
  return query.rowCount == 1;
}
const allMediaAlunos = async (params) =>{
  let { id_disciplina, data_inicio, data_final} = params
  sql = `select 
  p.nome as nome_aluno,
  n.id_aluno,
  n.nota,
  n.peso
  from
  notas as n
  join disciplinas as d on n.id_disciplina = d.id
  join alunos as a on n.id_aluno = a.id
  join pessoas as p on a.id_pessoa = p.id
  where n.id_disciplina = $1 and n.datahora::date between $2 and $3
  order by a.id asc `

  let res = await db.query(sql, [id_disciplina, data_inicio, data_final]);
  //console.log(res.rows);
  let notas = res.rows;
  let somaNotas = 0;
  let somaPesos = 0;
  let retorno = [];
 // console.log(notas.length);
  for(let i = 0; i < notas.length; i++){
   // console.log(notas[i]);
    somaNotas += parseFloat(notas[i].nota) * parseFloat(notas[i].peso)
    somaPesos += parseFloat(notas[i].peso)
    if(!notas[i+1] || notas[i].id_aluno !== notas[i+1].id_aluno){
      media = somaNotas/somaPesos;
      somaNotas = 0;
      somaPesos = 0;
      let status = media < 5 
      ? "reprovado"
      : media >= 7
      ? "aprovado" 
      : media >= 5 && media < 7 ? "recuperação" : "";
      //console.log(`status ${status}`);
      //console.log(notas[i].nome_aluno);
      retorno.push({
        nome: notas[i].nome_aluno,
        media: media,
       status: status
      })
    }
  }
  return retorno;
}
const mediaAluno = async (params) => {
  //console.log(params)
  let { matricula, id_disciplina, data_inicio, data_final } = params
  //console.log(matricula);
  sql = `select 
    p.nome,
    n.nota,
    n.peso
    from notas as n
    join disciplinas as d on n.id_disciplina = d.id
    join alunos as a on n.id_aluno = a.id
    join pessoas as p on a.id_pessoa = p.id
    where 
    a.matricula = $1 and --$1
    d.id = $2 and --$2
    n.datahora::date between $3 and $4 --$3 $4
    `
  let res = await db.query(sql, [matricula, id_disciplina, data_inicio, data_final]);
  //console.log(res.rows);
  let somaNotas = 0;
  let somaPesos = 0;

  res.rows.forEach(linhaSql => {
    somaNotas += parseFloat(linhaSql.nota) * parseFloat(linhaSql.peso)
    somaPesos += parseFloat(linhaSql.peso)
  })

  let media = somaNotas / somaPesos;

  //console.log(media);
  //console.log(res.rows);
  let status = ""
  if (media < 5) {
    status = (res.rows[0].nome + " está reprovado")
  }
  else if (media >= 7) {
    status = (res.rows[0].nome + " está aprovado")
  }
  else if (media >= 5 && media < 7) {
    status = (res.rows[0].nome + " está em recuperação")
  }
  //console.log(status);
  return {
    media: media.toFixed(2),
    mensagem: status,
    notas: res.rows.map(nota => {
      return { peso: nota.peso, nota: nota.nota }
    })
  }
}

module.exports.getAllNotas = getAllNotas;
module.exports.getNotasById = getNotasById;
module.exports.persistirNotas = persistir;
module.exports.deleteNotas = deleteNotas;
module.exports.mediaAluno = mediaAluno;
module.exports.allMediaAlunos = allMediaAlunos;