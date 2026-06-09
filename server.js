const express = require('express');
require('dotenv').config();
const { createProxyMiddleware } = require('http-proxy-middleware');
const { fork } = require('child_process');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(express.json());

// ✅ Static files DULU (css, js, gambar, dll dari folder frontend/)
app.use(express.static(path.join(__dirname, 'frontend')));

// ✅ Root '/' sekarang serve index.html (bukan teks)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const services = [
    { name: 'service-dapur',      path: path.join(__dirname, 'service-dapur', 'src', 'index.js'),      port: 3001 },
    { name: 'service-menu',       path: path.join(__dirname, 'service-menu', 'src', 'index.js'),        port: 3002 },
    { name: 'service-sekolah',    path: path.join(__dirname, 'service-sekolah', 'src', 'index.js'),     port: 3003 },
    { name: 'service-inventory',  path: path.join(__dirname, 'service-inventory', 'src', 'index.js'),   port: 3004 },
    { name: 'service-distribusi', path: path.join(__dirname, 'service-distribusi', 'src', 'index.js'),  port: 3005 },
];

const SERVICE_STARTUP_DELAY = 3000;

services.forEach(service => {
    console.log(`[Gateway] Mengaktifkan ${service.name} pada port ${service.port}...`);

    const child = fork(service.path, [], {
        env: { ...process.env, PORT: service.port },
        cwd: path.join(__dirname, service.name)
    });

    child.on('error', (err) => {
        console.error(`[${service.name}] ERROR:`, err.message);
    });

    child.on('exit', (code) => {
        if (code !== 0 && code !== null) {
            console.error(`[${service.name}] Crash dengan exit code: ${code}`);
        }
    });

    child.stdout?.on('data', (data) => {
        console.log(`[${service.name}] ${data.toString().trim()}`);
    });

    child.stderr?.on('data', (data) => {
        console.error(`[${service.name}] STDERR: ${data.toString().trim()}`);
    });
});

const proxyOptions = (port, pathPrefix) => ({
    target: `http://127.0.0.1:${port}`,
    changeOrigin: true,
    pathRewrite: { [`^/api/${pathPrefix}`]: '' }, // ← hapus /api/dapur jadi /
    // Atau kalau service pakai /dapur:
    // pathRewrite: { [`^/api`]: '' }, // /api/dapur → /dapur
    on: {
        error: (err, req, res) => {
            console.error(`[Proxy Error] ${err.message}`);
            res.status(502).json({ error: 'Service tidak tersedia', detail: err.message });
        },
        proxyRes: (proxyRes) => {
            delete proxyRes.headers['etag'];
            delete proxyRes.headers['last-modified'];
            proxyRes.headers['cache-control'] = 'no-store';
        }
    }
});

setTimeout(() => {
    app.use('/api/dapur',      createProxyMiddleware(proxyOptions(3001)));
    app.use('/api/menu',       createProxyMiddleware(proxyOptions(3002)));
    app.use('/api/sekolah',    createProxyMiddleware(proxyOptions(3003)));
    app.use('/api/inventory',  createProxyMiddleware(proxyOptions(3004)));
    app.use('/api/distribusi', createProxyMiddleware(proxyOptions(3005)));
    console.log('[Gateway] Semua proxy route aktif');
}, SERVICE_STARTUP_DELAY);

// ✅ Fallback: semua route selain /api/* arahkan ke index.html (untuk SPA/multi-page)
app.use((req, res, next) => {
    if (!req.path.startsWith('/api/')) {
        res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
    } else {
        next();
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n==================================================`);
    console.log(`GATEWAY ONLINE: http://0.0.0.0:${PORT}`);
    console.log(`==================================================\n`);
});