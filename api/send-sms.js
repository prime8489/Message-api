// api/send-sms.js

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST allowed');
  }

  const { number, message } = req.body;

  if (!number || !message) {
    return res.status(400).json({ success: false, error: 'Missing number or message' });
  }

  try {
    const response = await axios.post('https://textbelt.com/text', {
      phone: number,
      message: message,
      key: 'textbelt' // free key
    });

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to send SMS' });
  }
}
