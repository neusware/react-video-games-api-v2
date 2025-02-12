// filepath: /c:/Users/ramon/Documents/_wsd24/_2425/Diseño e interfaces web/react/video-games-api/server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

// Proxy para la API
app.use('/api', createProxyMiddleware({
  target: 'https://api.rawg.io',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api', // Reescribe /api en la URL
  },
}));

// Servir archivos estáticos de la aplicación de React
app.use(express.static(path.join(__dirname, 'dist')));

// Redirigir todas las solicitudes al archivo index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});