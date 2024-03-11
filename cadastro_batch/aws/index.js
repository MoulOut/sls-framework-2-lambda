const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { cadastrarAlunosNoBd } = require('../cadastrarAlunosNoBd');
const { converteDadosCsv } = require('../converteDadosCsv');

async function obtemDadosDoCsv(bucket, key) {
  const client = new S3Client({});

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  const response = await client.send(command);
  const csvData = response.Body.transformToString('utf-8');

  return csvData;
}

module.exports = {
  obtemDadosDoCsv,
  fazUploadNoBucket,
};

module.exports.cadastrarAlunos = async (event) => {
  try {
    const eventoS3 = event.Records[0].s3;

    const bucketName = eventoS3.bucket.name;
    const keyBucket = decodeURIComponent(
      eventoS3.object.key.replace(/\+/g, ' ')
    );

    const fileData = await obtemDadosDoCsv(bucketName, keyBucket);

    const alunos = await converteDadosCsv(fileData);

    await cadastrarAlunosNoBd(alunos);

    console.log('Cadastro dos alunos realizado com sucesso.');
  } catch (error) {
    console.log(error);
  }
};
