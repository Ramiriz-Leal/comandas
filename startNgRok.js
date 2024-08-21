const { exec } = require('child_process');
const ngrok = require("@ngrok/ngrok");

// Function to start the React server
function startReact() {
    return new Promise((resolve, reject) => {
        const reactProcess = exec('npm start', (error, stdout, stderr) => {
            if (error) {
                reject(`Error starting React: ${error}`);
                return;
            }
            console.log(`React stdout: ${stdout}`);
            console.error(`React stderr: ${stderr}`);
        });

        reactProcess.stdout.on('data', (data) => {
            if (data.includes('Compiled successfully')) {
                resolve();
            }
        });

        reactProcess.on('error', (error) => {
            reject(`React process error: ${error}`);
        });

        reactProcess.on('exit', (code) => {
            if (code !== 0) {
                reject(`React process exited with code ${code}`);
            }
        });
    });
}

// Function to start ngrok
async function startNgrok() {
    const listener = await ngrok.forward({ addr: 3000, authtoken: '2jkZ7svQ5xyOxSwGO5phquELSst_4Pfy6oKUf9N1pk6odnE9N' });

    console.log(`Conexão estabelecida: ${listener.url()}`);
}

// Main function to start both React and ngrok
async function start() {
    try {
        console.log('Starting React...');
        await startReact();
        console.log('Starting NgRok...');
        await startNgrok();
    } catch (error) {
        console.error(error);
    }
}

start();