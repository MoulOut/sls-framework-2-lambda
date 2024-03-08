const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

async function fazUploadNoBucket() {
  const client = new S3Client({
    forcePathStyle: true,
    credentials: {
      accessKeyId: 'S3RVER',
      secretAccessKey: 'S3RVER',
    },
    endpoint: 'http://localhost:4569',
  });

  const comandoUpload = new PutObjectCommand({
    Bucket: 'alunos-csv-local',
    Key: 'test.csv',
    Body: Buffer.from('12345'),
  });

  await client.send(comandoUpload);
}

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
  console.log('Funcao lambda executada a partir do bucket s3');
};
