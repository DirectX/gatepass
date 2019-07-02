const PiServo = require('pi-servo');
const servo = new PiServo(17);
const angleClosed = 90;
const angleOpened = 45;

function openGate() {
	servo.setDegree(angleOpened);
	setTimeout(() => {
		servo.setDegree(angleClosed);
	}, 400);
}

servo.open().then(async function () {
	setInterval(openGate, 2000);
});
