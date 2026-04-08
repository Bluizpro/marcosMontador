const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const webhookUrl = 'https://bbgempreemdimentos.online/webhook/receber-mensagem';
  
  try {
    const response = await axios.post(webhookUrl, req.body);
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error('Erro ao enviar para o webhook:', error.message);
    res.status(error.response?.status || 500).json({ 
      error: 'Erro no servidor', 
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
