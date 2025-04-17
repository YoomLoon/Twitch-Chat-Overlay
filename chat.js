const BOT_LIST = ['streamelements', 'nightbot', 'moobot', 'wizebot'];

const client = new tmi.Client({
  channels: ['your_channel_name_here'] // <-- change this
});

client.connect();

client.on('message', (channel, tags, message, self) => {
  if (self) return;

  const username = tags['display-name'] || tags.username;

  // Filter out bot messages and commands
  if (message.startsWith('!') || BOT_LIST.includes(username.toLowerCase())) return;

  const chatContainer = document.getElementById('chat-container');

  const msgElem = document.createElement('div');
  msgElem.className = 'chat-message';
  msgElem.innerHTML = `
    <div class="username">${username}</div>
    <div class="text">${message}</div>
  `;

  chatContainer.prepend(msgElem);

  // Remove message after 20 seconds
  setTimeout(() => {
    msgElem.remove();
  }, 20000);
});
