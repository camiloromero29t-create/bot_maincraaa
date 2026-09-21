const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.send('Bot Botsitouu 24/7 activo'));
app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor web escuchando puerto de Render');
});

function startBot() {
  console.log('Intentando conectar Botsitouu a Minecraft...');

  const bot = mineflayer.createBot({
    host: 'vortemc.play.hosting',
    port: 25565,
    username: 'Botsitouu',
    version: false // Detecta la versión automáticamente
  });

  bot.on('spawn', () => {
    console.log('¡Botsitouu se ha conectado al servidor!');
    
    // Inicia sesión tras ingresar
    setTimeout(() => {
      bot.chat('/login botafk2926');
    }, 3000);
  });

  bot.on('messagestr', (message) => {
    if (message.includes('/register')) {
      bot.chat('/register botafk2926 botafk2926');
    } else if (message.includes('/login')) {
      bot.chat('/login botafk2926');
    }
  });

  // Movimiento suave para simular actividad
  const interval = setInterval(() => {
    if (bot && bot.entity) {
      bot.swingArm('right');
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI;
      bot.look(yaw, pitch, false);
    }
  }, 30000);

  // Manejo de desconexión sin bloquear el proceso
  bot.on('end', (reason) => {
    console.log(`Desconectado por: ${reason}. Reintentando en 30 segundos...`);
    clearInterval(interval);
    setTimeout(startBot, 30000); // Espera 30 segundos antes de volver a entrar
  });

  bot.on('kicked', (reason) => {
    console.log('Expulsado del servidor por:', reason);
  });

  bot.on('error', (err) => {
    console.log('Error de red/conexión:', err.message);
  });
}

startBot();
