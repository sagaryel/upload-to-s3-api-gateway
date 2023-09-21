const uploadFile = async (event) => {
    console.log('event1', event);
    const formdata = await parseFormData(event);
    console.log('formdata1', formdata);
    // const tags = { filename: file.filename };
    const tags = { filename: file.filename };
    try {
      await s3Client
        .putObject({
          Bucket: BUCKET_NAME,
          Key: fields.filename || file.filename,
          Body: file.content,
          Tagging: queryString.encode(tags),
        })
        .promise();
      return {
        statusCode: 200,
        body: JSON.stringify({ description: 'file created', result: 'ok' }),
      };
    } catch (_error) {
      // this is not ideal error handling, but good enough for the purpose of this example
      return {
        statusCode: 409,
        body: JSON.stringify({
          description: 'something went wrong',
          result: 'error',
        }),
      };
    }
  };
  
  module.exports = { uploadFile }; // Export the function if needed