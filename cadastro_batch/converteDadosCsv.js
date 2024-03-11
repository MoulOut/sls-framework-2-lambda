const { parse } = require('fast-csv');

async function converteDadosCsv(data) {
  const result = await new Promise((resolve, reject) => {
    const alunos = [];
    const stream = parse({
      headers: ['nome', 'email'],
      renameHeaders: true,
    })
      .on('data', (aluno) => alunos.push(aluno))
      .on('error', (error) =>
        reject(new Error('Houve um erro no processamento do arquivo.'))
      )
      .on('end', () => resolve(alunos));

    stream.write(data);
    stream.end();
  });

  if (result instanceof Error) throw result;

  return result;
}

module.exports = {
  converteDadosCsv,
};
