# pt-autorss

[![codecov](https://codecov.io/gh/huihuimoe/pt-autorss/branch/master/graph/badge.svg)](https://codecov.io/gh/huihuimoe/pt-autorss)
[![Build Status](https://travis-ci.com/huihuimoe/pt-autorss.svg?branch=master)](https://travis-ci.com/huihuimoe/pt-autorss)

An auto fetch, filter, download and load torrents automation program.

Written in Typescript, type safed.

[Old version here.](https://github.com/huihuimoe/pt-autorss/tree/v3)

## Usage

```bash
npm i --production
cp config-example.ts config.ts
vim config.ts
npm start
```

To config pt-autorss, you would learn a little about Javascript.

Recommend using [Visual Studio Code](https://code.visualstudio.com/download) to edit the `config.ts`, which has full support of error and syntax hints.

More custom rule see `lib/NexusPHP-utils.ts`.

PR welcome.

## Config

See [config-example.ts](config-example.ts)

## Autostart and Running in background Using Systemd

### System level

If you have root access, use this template.

```
[Unit]
Description=pt-autorss
After=network-online.target
[Service]
Type=simple
User=userTest
Group=groupTest
UMask=007
WorkingDirectory=/somedir/pt-autorss
ExecStart=/usr/bin/npm start
Restart=on-failure
[Install]
WantedBy=multi-user.target
```

And put the file into `/etc/systemd/system/pt-autorss.service`

Usage: `systemctl start/stop/restart/enable/disable pt-autorss.service`

View log: `journalctl -u pt-autorss`

### User level

If you are using sharing seedbox like feralhosting, seedhost...

You can use this template. 

```
[Unit]
Description=pt-autorss
After=network-online.target
[Service]
Type=simple
WorkingDirectory=/somedir/pt-autorss
ExecStart=/somedir/npm start
Restart=on-failure
[Install]
WantedBy=default.target
```

And put the file to `~/.config/systemd/user/pt-autorss.service`.

After reload by `systemctl --user daemon-reload`,

you can use `systemctl --user start/stop/restart/enable/disable pt-autorss.service` to control it.

## License

[SATA](LICENSE)