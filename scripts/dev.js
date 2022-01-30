const path = require('path');
const { createServer, defineConfig } = require('vite');
const reactRefresh = require('@vitejs/plugin-react-refresh');
const open = require('open');

dev();

async function dev() {
  const viteConfig = getViteConfig();
  const server = await createServer(viteConfig)
  await server.listen()
  server.printUrls();
  const { port, host = '127.0.0.1' } = server.config?.server || {}
  const targetPage = `http://${host}:${port}/index.html`;
  console.log(
    `Open: ` + targetPage
  );
  await open(targetPage);
}

function getViteConfig() {
  const viteConfig = defineConfig({
    configFile: false,
    root: resolve(),
    publicDir: resolve('example', 'public'),
    server: {
      port: 8080,
      host: '127.0.0.1',
    },
    plugins: [reactRefresh()],
    esbuild: {
      include: [
        /\.ts$/,
        /\.tsx$/,
        /\.js$/,
        /\.jsx$/,
      ],
      exclude: [
        /\.html$/
      ]
    },
  });
  return viteConfig;
}

function resolve(...args) {
  return path.join(__dirname, '..', ...args);
}