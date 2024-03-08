module.exports.simulandoUploadCsv = async (event) => {
  try {
    console.log('Simule aqui o upload do CSV');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Simulando upload de CSV' }),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify(error),
    };
  }
};

module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v3.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};
