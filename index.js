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
    physicsEnabled: false // Desactiva la física propia para no distorsionar los paquetes de movimiento
  });

  // Control para evitar enviar el comando de login más de una vez por sesión
  let hasLoggedIn = false;

  bot.on('spawn', () => {
    console.log('¡Botsitouu ha ingresado al servidor!');
    
    // Login automático único a los 4 segundos de ingresar
    setTimeout(() => {
      if (!hasLoggedIn) {
        bot.chat('/login botafk2926');
        hasLoggedIn = true;
      }
    }, 4000);
  });

  // Intercepción segura del chat para LoginPlus
  bot.on('messagestr', (message) => {
    if (message.includes('/register') && !hasLoggedIn) {
      bot.chat('/register botafk2926 botafk2926');
      hasLoggedIn = true;
    }
  });

  // Envío sincronizado a 50 ms (20 TPS de Minecraft)
  // Previene 'TickTimer' sin saturar la red ni activar 'Timer'[cite: 1, 2]
  let lastTickSent = 0;
  bot.on('physicsTick', () => {
    const now = Date.now();
    if (now - lastTickSent >= 50) {
      if (bot._client && bot._client.write) {
        try {
          bot._client.write('tick_end', {});
          lastTickSent = now;
        } catch (err) {
          // Ignora si la versión de protocolo no admite el paquete
        }
      }
    }
  });

  // Acción periódica cada 30 segundos (simula actividad básica)
  const activityInterval = setInterval(() => {
    if (bot && bot.entity) {
      bot.swingArm('right');
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI;
      bot.look(yaw, pitch, false);
    }
  }, 30000);

  // Control de desconexión y prevención de bloqueo de IP
  bot.on('end', (reason) => {
    console.log(`Conexión finalizada (${reason}). Reintentando...`);
    clearInterval(activityInterval);
    hasLoggedIn = false;
    
    // Si la IP fue bloqueada por LoginPlus, espera 10 minutos antes de reconectar
    const delay = (reason && (reason.includes('blocked') || reason.includes('logins'))) ? 600000 : 35000;
    setTimeout(startBot, delay);
  });

  bot.on('kicked', (reason) => {
    console.log('El bot fue expulsado por:', reason);
  });

  bot.on('error', (err) => {
    console.log('Error de red detectado:', err.message);
  });
}

startBot();
