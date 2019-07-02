# GatePass

Raspberry Pi Telegram Remote Control Bot

https://github.com/stianeikeland/go-rpio

## Prerequisites

### Hardware

![Scheme](img/pi-servo.png)

### Software

#### Node

```bash
sudo apt update
sudo apt upgrade
sudo apt install npm
```

#### Pi Blaster
Follow [Pi Blaster library](https://github.com/sarfata/pi-blaster) setup. Patch file `pi-blaster.c` before compile to set 50Hz servo frequency:

```c
#define CYCLE_TIME_US 20000
```

## Installation

```bash
cp .env.example .env
```

Replace placeholders in `.env` with actual API key

```bash
npm install
npm start
```

## References

* [Raspberry Pi Servo Motor control](https://tutorials-raspberrypi.com/raspberry-pi-servo-motor-control/)
