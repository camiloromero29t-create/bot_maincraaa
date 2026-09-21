const mineflayer = require('mineflayer');
const express = require('express');

// Servidor web para mantener el proceso activo en Render
const app = express();
app.get('/', (req, res) => res.send('Bot Botsitouu 24/7 en línea'));
app.listen(process.env.PORT || 3000);

function startBot() {
  const bot = mineflayer.createBot({
    host: 'vortemc.play.hosting', // La IP de tu servidor
    port: 25565,                  // Puerto por defecto
    username: 'Botsitouu'         // Nombre del bot
  });

  // Evento al conectarse
  bot.on('spawn', () => {
    console.log('¡Botsitouu se ha conectado al servidor!');
    
    // Ejecuta el login automáticamente tras 2 segundos de entrar
    setTimeout(() => {
      bot.chat('/login botafk292');
      console.log('Comando /login enviado con éxito');
    }, 2000);
  });

  // Reacción en caso de que el plugin vuelva a pedir login o register por chat
  bot.on('messagestr', (message) => {
    if (message.includes('/register')) {
      bot.chat('/register botafk2926 botafk2926');
    } else if (message.includes('/login')) {
      bot.chat('/login botafk2926');
    }
  });

  // Salto periódico cada 30 segundos para evitar ser expulsado por estar AFK
  setInterval(() => {
    if (bot && bot.entity) {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }
  }, 30000);

  // Reconexión automática si el servidor se cae o se reinicia
  bot.on('end', () => {
    console.log('Conexión cerrada. Reintentando en 15 segundos...');
    setTimeout(startBot, 15000);
  });

  bot.on('error', err => console.log('Error del bot:', err));
}

startBot();
