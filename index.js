const mineflayer = require('mineflayer');
const express = require('express');

// 1. Servidor web HTTP para binding de puerto en Render (evita el port timeout)
const app = express();
app.get('/', (req, res) => res.send('Bot Botsitouu 24/7 activo'));
app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor HTTP iniciado correctamente.');
});

function startBot() {
  console.log('Iniciando conexión de Botsitouu...');

  const bot = mineflayer.createBot({
    host: 'vortemc.play.hosting',
    port: 25565,
    username: 'Botsitouu',
    // Desactiva la física propia de Mineflayer para no distorsionar los paquetes de movimiento
    physicsEnabled: false
  });

  // Al ingresar exitosamente al servidor
  bot.on('spawn', () => {
    console.log('¡Botsitouu ha ingresado al servidor!');
    
    // Autenticación automática tras 3 segundos
    setTimeout(() => {
      bot.chat('/login botafk2926');
    }, 3000);
  });

  // Intercepción de mensajes del chat para LoginPlus
  bot.on('messagestr', (message) => {
    if (message.includes('/register')) {
      bot.chat('/register botafk2926 botafk2926');
    } else if (message.includes('/login')) {
      bot.chat('/login botafk2926');
    }
  });

  // Acción periódica cada 30 segundos (simula actividad básica sin movimiento físico)
  const activityInterval = setInterval(() => {
    if (bot && bot.entity) {
      bot.swingArm('right');
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI;
      bot.look(yaw, pitch, false);
    }
  }, 30000);

  // Control de desconexión y bucle de reconexión
  bot.on('end', (reason) => {
    console.log(`Conexión finalizada (${reason}). Reintentando en 30 segundos...`);
    clearInterval(activityInterval);
    setTimeout(startBot, 30000);
  });

  bot.on('kicked', (reason) => {
    console.log('El bot fue expulsado por:', reason);
  });

  bot.on('error', (err) => {
    console.log('Error de red detectado:', err.message);
  });
}

startBot();
