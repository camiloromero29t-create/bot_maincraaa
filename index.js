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
    console.log('¡Botsitouu oike porãma servidor-pe!');
    
    setTimeout(() => {
      bot.chat('/login botafk2926');
    }, 2000);
  });

  bot.on('messagestr', (message) => {
    if (message.includes('/register')) {
      bot.chat('/register botafk2926 botafk2926');
    } else if (message.includes('/login')) {
      bot.chat('/login botafk2926');
    }
  });

  // Ko'ápe bot omeyva'erã ijjyva ha omaña mombyry (¡ko'ãva ndaha'ei hack Grim-pe guarã!)
  setInterval(() => {
    if (bot && bot.entity) {
      bot.swingArm('right'); 
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI;
      bot.look(yaw, pitch, false);
    }
  }, 20000);

  bot.on('end', () => {
    setTimeout(startBot, 15000);
  });

  bot.on('error', err => console.log('Error:', err));
}

startBot();
