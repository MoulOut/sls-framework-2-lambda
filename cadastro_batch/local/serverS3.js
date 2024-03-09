const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');
const { readFile } = require('fs/promises');
const { join } = require('path');

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

  const fileName = 'cadastrar_alunos.csv';
  const filePath = join(__dirname, fileName);
  const csvData = await readFile(filePath, 'utf-8');

  const comandoUpload = new PutObjectCommand({
    Bucket: 'alunos-csv-local',
    Key: fileName,
    Body: csvData,
  });

  await client.send(comandoUpload);
}

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

module.exports = {
  obtemDadosDoCsv,
  fazUploadNoBucket,
};
