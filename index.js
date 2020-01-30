// process.env.NTBA_FIX_319 = 1;

const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const baseApiUrl = process.env.TELEGRAM_API_URL;
const token = process.env.TELEGRAM_API_KEY;

var Gpio = require('onoff').Gpio;
var DOUT = new Gpio(4, 'out');
DOUT.writeSync(0);

async function openGate() {
	return new Promise(resolve => {
		DOUT.writeSync(1);
		setTimeout(() => {
			DOUT.writeSync(0);
			resolve();
		}, 100);
	});
}

async function main() {
	console.log(`Connecting to Telegram bot API ${baseApiUrl}...`);
	const bot = new TelegramBot(token, {
		baseApiUrl: baseApiUrl,
		polling: true,
	});
	console.log('OK');
	
	bot.onText(/\/start/, async (msg) => {
		const opts = {
			reply_markup: JSON.stringify({
				keyboard: [
					['/open'],
				],
				resize_keyboard: true,
			}),
		}
		bot.sendMessage(msg.chat.id, `Tap button to open gate`, opts);
	});

	bot.onText(/\/open/, async (msg) => {
		const opts = {
			reply_markup: JSON.stringify({
				keyboard: [
					['/open'],
				],
				resize_keyboard: true,
			}),
		}
		await openGate();
		console.log(`Opened by @${msg.from.username} at ${new Date()}`);
		bot.sendMessage(msg.chat.id, 'Opened', opts);
	});
};

main();
