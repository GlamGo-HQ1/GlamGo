require('dotenv').config({ path: '.env.local' });

async function testToken() {
  const CLIENT_ID = process.env.INTERSWITCH_CLIENT_ID;
  const SECRET_KEY = process.env.INTERSWITCH_SECRET_KEY;
  const PASSPORT_URL = 'https://sandbox.interswitchng.com/passport/oauth/token';

  console.log('CLIENT_ID exists:', !!CLIENT_ID);
  console.log('SECRET_KEY exists:', !!SECRET_KEY);

  const encodedAuth = Buffer.from(`${CLIENT_ID}:${SECRET_KEY}`).toString('base64');

  try {
    const response = await fetch(PASSPORT_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ grant_type: 'client_credentials' }),
    });

    const text = await response.text();
    console.log('Status:', response.status);
    console.log('Response body:', text);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

testToken();
