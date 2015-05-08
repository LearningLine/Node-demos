# Deploying on Windows

- install URL rewrite into IIS
- configure URL rewrite to reverse proxy to your Node.js server and port
- configure a Windows service to manage Node.js app
   - use NSSM
   - write batch file that launches NSSM
   - pointed at /path/to/node.exe server.js
