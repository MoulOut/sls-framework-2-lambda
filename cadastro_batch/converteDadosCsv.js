const { parse } = require('fast-csv');

function converteDadosCsv(data) {
  const stream = parse({
    headers: ['nome', 'email'],
    renameHeaders: true,
  })
    .on('data', (aluno) => console.log(aluno))
    .on('error', (error) => console.log(error))
    .on('end', () => console.log('Arquivo processado.'));

  stream.write(data);
  stream.end();
}

module.exports = {
  converteDadosCsv,
};
