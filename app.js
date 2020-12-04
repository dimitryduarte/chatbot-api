const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const port = 3000;

const assistant = new AssistantV2({
  version: '2020-04-01',
  authenticator: new IamAuthenticator({
    apikey: 'eRV3zCRMATDfDNvXJPEJPBmC75P4n3G6_8YiecbuDCga',
  }),
  serviceUrl: 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/2a70b264-08aa-48c8-abac-9d5cd16eef14',
});

app.post('/conversation/', (req, res) => {
  const { text, context = {} } = req.body;

  const params = {
    input: { text },
    workspace_id:'<workspace_id>',
    context,
  };

  assistant.message(params, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      res.json(response);
    }
  });
});

app.listen(port, () => console.log(`Running on port ${port}`));