const mineflayer = require('mineflayer');
const express = require('express');

// 1. Servidor HTTP para evitar el timeout en Render
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
    username: 'Botsitouu',
    // Desactiva el cálculo de física interna que satura el tick de red
    physicsEnabled: false 
  });

  bot.on('spawn', () => {
    console.log('¡Botsitouu ha ingresado al servidor!');
    
    // Login automático tras 3 segundos
    setTimeout(() => {
      bot.chat('/login botafk2926');
    }, 3000);
  });

  // Manejo de autenticación en chat
  bot.on('messagestr', (message) => {
    if (message.includes('/register')) {
      bot.chat('/register botafk2926 botafk2926');
    } else if (message.includes('/login')) {
      bot.chat('/login botafk2926');
    }
  });

  // Mantiene la sesión viva balanceando el brazo suavemente cada 60 segundos
  const activityInterval = setInterval(() => {
    if (bot) {
      bot.swingArm('right');
    }
  }, 60000);

  // Manejo de desconexiones
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
