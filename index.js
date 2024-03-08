const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');

function createS3Client() {
  return new S3Client({
    forcePathStyle: true,
    credentials: {
      accessKeyId: 'S3RVER',
      secretAccessKey: 'S3RVER',
    },
    endpoint: 'http://localhost:4569',
  });
}

async function fazUploadNoBucket() {
  const client = createS3Client();

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

async function obtemDadosDoCsv(bucket, key) {
  const client = createS3Client();

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  const response = await client.send(command);
  const csvData = response.Body.transformToString('utf-8');

  return csvData;
}

module.exports.cadastrarAlunos = async (event) => {
  const eventoS3 = event.Records[0].s3;

  const bucketName = eventoS3.bucket.name;
  const keyBucket = decodeURIComponent(eventoS3.object.key.replace(/\+/g, ' '));

  const data = await obtemDadosDoCsv(bucketName, keyBucket);

  console.log(data);
};
