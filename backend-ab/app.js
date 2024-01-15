const express = require('express');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const port = 3000;


app.use(bodyParser.json());

const CLIENT_ID = '496511542471-cam0g2ophmdjhj7cvumkcpesrg0hupiu.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

app.post('/login', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userId = payload['sub'];
    
    console.log('Login successful. User ID:', userId);
    // Hier kannst du weitere Aktionen ausführen, z.B. Benutzer in der Datenbank speichern.

    res.status(200).send('Login successful');
  } catch (error) {
    console.error('Login failed. Error:', error.message);
    res.status(401).send('Login failed');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
