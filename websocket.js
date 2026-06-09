const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, req) => {
    const ip = req.socket.remoteAddress;
    console.log(`ESP terhubung dari IP: ${ip}`);

    ws.on('message', (message) => {
        console.log('Data dari ESP:', message.toString());
        // Parse data dari ESP
        try {
            const data = JSON.parse(message);
            // contoh: { nis: "20.21.I.1280", action: "presensi" }
            console.log('NIS:', data.nis, 'Action:', data.action);
        } catch (e) {
            console.log('Raw message:', message.toString());
        }
    });

    ws.on('close', () => {
        console.log(`ESP ${ip} terputus`);
    });
});

console.log('WebSocket server jalan di port 8080');
module.exports = wss;