const mineflayer = require('mineflayer');
const express = require('express');

// Servidor web para mantener el contenedor activo en Render
const app = express();
app.get('/', (req, res) => res.send('Bot Botsitouu 24/7 en línea'));
app.listen(process.env.PORT || 3000);

function startBot() {
  const bot = mineflayer.createBot({
    host: 'vortemc.play.hosting', // Tu IP de play.hosting
    port: 25565,                  // Puerto de tu servidor
    username: 'Botsitouu'         // Nombre del bot
  });

  // Evento al conectar e ingresar al mapa
  bot.on('spawn', () => {
    console.log('¡Botsitouu se ha conectado al servidor!');
    
    // Inicia sesión automáticamente tras 2 segundos
    setTimeout(() => {
      bot.chat('/login botafk2926');
      console.log('Comando /login enviado con éxito');
    }, 2000);
  });

  // Reacción automática si el plugin solicita registro o login por chat
  bot.on('messagestr', (message) => {
    if (message.includes('/register')) {
      bot.chat('/register botafk2926 botafk2926');
    } else if (message.includes('/login')) {
      bot.chat('/login botafk2926');
    }
  });

  // Interacción suave cada 20 segundos (No activa alertas en GrimAC)
  setInterval(() => {
    if (bot && bot.entity) {
      // Balancea la mano derecha
      bot.swingArm('right'); 

      // Mueve suavemente la cabeza a una dirección aleatoria
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI;
      bot.look(yaw, pitch, false);
    }
  }, 20000);

  // Reconexión automática si el servidor se reinicia o se cae
  bot.on('end', () => {
    console.log('Conexión cerrada. Reintentando en 15 segundos...');
    setTimeout(startBot, 15000);
  });

  bot.on('error', err => console.log('Error del bot:', err));
}

startBot();
