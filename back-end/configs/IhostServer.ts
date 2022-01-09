const APP = {
    //
    // Cycle
    //
    cycle: (cb, timeout = 1e3, times = false) => {
        const start = Date.now();
        let i = 0;
        // Set delay method
        const delay = (ms) => {
            i++;
            // Check if stop enabled, then return immediately && i > times
            if (delay.cancelationToken) return true;
            // Run function
            const now = Date.now();
            const diff = now - start - i * timeout;
            // Run callback
            cb(now);
            // Set new timeout
            setTimeout(() => {
                // Compensate diff
                // We will compensate delay to
                // make it more accurate
                delay(timeout - diff);
            }, ms);
        };
        // Set stop method
        delay.cancelationToken = false;
        delay.stop = () => (delay.cancelationToken = true);
        // Run cycle with timeout
        setTimeout(delay, timeout, timeout);
        // Return delay object
        return delay;
    },

    //
    // Sync timeout function
    //
    timeout: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),

    //
    // !!!
    //
    // Your logic
    //
    init: async (application) => {
        const getNextTask = async () => {
            const repository = new application.app.repositories.Tasks(application);
            const nexNotification = await repository.Notification();
            return nexNotification;
        };
        let nextNotification = await getNextTask();

        const delay = async (ms) => {
            if (delay.cancelationToken) return true;
            console.log('xau');

            if (nextNotification[0]) {
                const prazoMs = Date.parse(nextNotification[0].prazo); //238
                const nowMs = Date.parse(new Date().toDateString()); //28
                console.log(prazoMs);
                console.log(nowMs);
                console.log(nextNotification[0]);
                if (prazoMs === nowMs) {
                    console.log('notifier!');
                    //notifier
                    nextNotification = null;
                }
            } else {
                nextNotification = await getNextTask();
            }

            setTimeout(() => {
                // Compensate diff
                // We will compensate delay to
                // make it more accurate
                delay(1000);
            }, ms);
        };

        setTimeout(delay, 1000, 1000);
        delay.cancelationToken = false;
        return delay;

        // Run cycle with timeout

        // // Start some cycle task for 500ms
        // // First param is your function,
        // // Second (optional/1000ms) - the delay amount in ms,
        // // Third (optional/infinite) - cycles number
        // const task = APP.cycle((now) => {
        //     // Lets print something in a loop
        //     console.log(`Cycle task ${now}`);
        // }, 500);
        // // Now task holds stop method so we
        // // can stop our cycle from this scope
        // // But for now lets do some sync work
        // // Sleep for 3 sec
        // await APP.timeout(3000);
        // // Print something
        // console.log(`Hello from caller!`);
        // // Sleep for 3 sec
        // await APP.timeout(3000);
        // // Print something and stop cycle
        // console.log(`Hello from caller again and stop cycle now!`);
        // task.stop();
        // // Sleep for 3 sec
        // await APP.timeout(3000);
        // // Print something at the end
        // console.log(`Hello from caller! All work done, exit now ;)`);
    }
};

module.exports = APP;
