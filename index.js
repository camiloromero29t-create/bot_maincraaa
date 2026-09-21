const mineflayer = require('mineflayer');
const express = require('express');

// Mantiene un servidor web activo para que Render no suspenda el bot
const app = express();
app.get('/', (req, res) => res.send('Bot AFK Minecraft 24/7 Activo'));
app.listen(process.env.PORT || 3000);

function startBot() {
  const bot = mineflayer.createBot({
    host: 'vortemc.play.hosting', // Tu IP de play.hosting
    port: 25565,                  // Puerto por defecto de Minecraft
    username: 'Botsitouu'        // Nombre del bot dentro del juego
  });

  bot.on('spawn', () => {
    console.log('¡Bot conectado con éxito al servidor!');
  });

  // Salto periódico para evitar ser expulsado por inactividad (AFK)
  setInterval(() => {
    if (bot && bot.entity) {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }
  }, 30000);

  // Reconexión automática si el servidor se reinicia
  bot.on('end', () => {
    console.log('Conexión cerrada. Reintentando en 15 segundos...');
    setTimeout(startBot, 15000);
  });

  bot.on('error', err => console.log('Error del bot:', err));
}

startBot();
