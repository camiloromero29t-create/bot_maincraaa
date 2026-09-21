const mineflayer = require('mineflayer');
const express = require('express');

// Servidor HTTP para Render
const app = express();
app.get('/', (req, res) => res.send('Bot Botsitouu 24/7 activo'));
app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor HTTP listo en Render.');
});

function startBot() {
  console.log('Iniciando conexión de Botsitouu...');

  const bot = mineflayer.createBot({
    host: 'vortemc.play.hosting',
    port: 25565,
    username: 'Botsitouu'
  });

  bot.on('spawn', () => {
    console.log('¡Botsitouu ha ingresado al servidor!');
    
    // Login automático tras 3 segundos
    setTimeout(() => {
      bot.chat('/login botafk2926');
    }, 3000);
  });

  // Autenticación por chat
  bot.on('messagestr', (message) => {
    if (message.includes('/register')) {
      bot.chat('/register botafk2926 botafk2926');
    } else if (message.includes('/login')) {
      bot.chat('/login botafk2926');
    }
  });

  // Movimiento básico cada 45 segundos (evita saturar paquetes de red)
  const activityInterval = setInterval(() => {
    if (bot && bot.entity) {
      bot.swingArm('right');
    }
  }, 45000);

  // Reconexión limpia si se interrumpe la red
  bot.on('end', (reason) => {
    console.log(`Conexión cerrada (${reason}). Reintentando en 30 segundos...`);
    clearInterval(activityInterval);
    setTimeout(startBot, 30000);
  });

  bot.on('kicked', (reason) => {
    console.log('Expulsado:', reason);
  });

  bot.on('error', (err) => {
    console.log('Error de red:', err.message);
  });
}

startBot();
