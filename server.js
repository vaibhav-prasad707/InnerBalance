// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { LanguageServiceClient } = require('@google-cloud/language');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Initialize the Google Natural Language API client
const languageClient = new LanguageServiceClient({
    keyFilename: 'path/to/your/google-api-key-file.json', // Replace with the path to your API key file
});

app.post('/gemini', async (req, res) => {
    const query = req.body.text;
    const response = await analyzeSentiment(query);
    res.json({ replies: [{ type: 'text/plain', body: response }] });
});

async function analyzeSentiment(text) {
    try {
        const document = {
            content: text,
            type: 'PLAIN_TEXT',
        };
        const [result] = await languageClient.analyzeSentiment({ document });
        const sentiment = result.documentSentiment;
        if (sentiment.score >= 0) {
            return 'This seems positive!';
        } else {
            return 'This seems negative!';
        }
    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        return 'Error analyzing sentiment';
    }
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
