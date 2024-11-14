import { HTTPServer } from '@mikosoft/spa-server';

const httpOpts = {
  staticDir: 'dist',
  indexFile: 'index.html',
  urlRewrite: {}, // map URLs to directory: {url1: dir1, url2:dir2} NOTICE:The url i.e. the object key can contain regex chars like ^ $ * ...
  port: process.env.PORT || 3238,
  timeout: 5 * 60 * 1000, // if 0 never timeout
  acceptEncoding: 'gzip', // gzip, deflate or ''
  headers: {
    // CORS Response Headers
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Methods': 'OPTIONS, GET',
    'Access-Control-Max-Age': '3600'
  },
  ssr: 'none', // none, all, botsonly
  ssrConsole: false, // frontend JS logs in the backend
  ssrModifier: null,
  debug: false,
  debugHTML: false
};

const httpServer = new HTTPServer(httpOpts);
httpServer.start();
