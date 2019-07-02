process.env.NTBA_FIX_319 = 1;

const PiServo = require('pi-servo');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const baseApiUrl = process.env.TELEGRAM_API_URL;
const token = process.env.TELEGRAM_API_KEY;

const servo = new PiServo(17);
const angleClosed = 90;
const angleOpened = 45;

async function openGate() {
	return new Promise(resolve => {
		servo.setDegree(angleOpened);
		setTimeout(() => {
			servo.setDegree(angleClosed);
			resolve();
		}, 400);
	});
}

servo.open().then(async function () {
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
});
