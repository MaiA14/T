import App from "./app";
import config from "./config";
import QueuesController from "./controllers/queues";

const controllers =
{
    [QueuesController.controllerName]: new QueuesController() 
};


const app = new App(controllers, config.server.port);
app.listen(async () => {});


// handle disconnect 
function notifyExit() {
    return new Promise(async function (resolve, reject) {
        try {
            resolve('EXIT ');
        } catch (notifyExitError: any) {
            console.log(notifyExitError.stack);
            reject();
        }
    });
}

process.on("uncaughtException", async function (err: any) {
    console.log("uncaughtException...", err.stack);
    if (err.code != "EADDRNOTAVAIL" && err.code != "EADDRINUSE") {
        try {
        } catch (e) {
            console.log(e);
        }
    }
});

process.on('SIGINT', function () {
    console.log("SIGINT...");
    notifyExit()
        .then(function () {
            process.exit(1);
        })
        .catch(function () {
            process.exit(1);
        });
});

process.on('SIGTERM', function () {
    console.log("SIGTERM...");
    notifyExit()
        .then(function () {
            process.exit(1);
        })
        .catch(function () {
            process.exit(1);
        });
});

process.on('SIGQUIT', function () {
    console.log("SIGQUIT...");
    notifyExit()
        .then(function () {
            process.exit(1);
        })
        .catch(function () {
            process.exit(1);
        });
});

process.on('exit', function (code) {
    console.log("exit...", code);
});