const { MessageMedia } = require('whatsapp-web.js');

const media = MessageMedia.fromFilePath('./path/to/image.png');
chat.sendMessage(media);