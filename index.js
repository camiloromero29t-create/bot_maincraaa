const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.send('Bot Botsitouu 24/7 en línea'));
app.listen(process.env.PORT || 3000);

function startBot() {
  const bot = mineflayer.createBot({
    host: 'vortemc.play.hosting',
    port: 25565,
    username: 'Botsitouu'
  });

  bot.on('spawn', () => {
    console.log('¡Botsitouu se ha conectado al servidor!');
    
    setTimeout(() => {
      bot.chat('/login botafk2926');
      console.log('Comando /login enviado con éxito');
    }, 2000);
  });

  bot.on('messagestr', (message) => {
    if (message.includes('/register')) {
      bot.chat('/register botafk2926 botafk2926');
    } else if (message.includes('/login')) {
      bot.chat('/login botafk2926');
    }
  });

  // Interacción suave: Balancea el brazo y mueve la cámara (No activa el anticheat)
  setInterval(() => {
    if (bot && bot.entity) {
      bot.swingArm('right'); // Mueve el brazo
      // Mueve ligeramente la cabeza (pitch y yaw) para simular presencia
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI;
      bot.look(yaw, pitch, false);
    }
  }, 20000);

  bot.on('end', () => {
    console.log('Conexión cerrada. Reintentando en 15 segundos...');
    setTimeout(startBot, 15000);
  });

  bot.on('error', err => console.log('Error del bot:', err));
}

startBot();
