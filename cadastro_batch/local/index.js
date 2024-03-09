const { converteDadosCsv } = require("../converteDadosCsv");
const { fazUploadNoBucket, obtemDadosDoCsv } = require("./serverS3");

module.exports.simulandoUploadCsv = async (event) => {
  try {
    await fazUploadNoBucket();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Simulando upload de CSV' }),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify(error),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};

module.exports.cadastrarAlunos = async (event) => {
  const eventoS3 = event.Records[0].s3;

  const bucketName = eventoS3.bucket.name;
  const keyBucket = decodeURIComponent(eventoS3.object.key.replace(/\+/g, ' '));

  const fileData = await obtemDadosDoCsv(bucketName, keyBucket);

  const alunos = converteDadosCsv(fileData)
};
