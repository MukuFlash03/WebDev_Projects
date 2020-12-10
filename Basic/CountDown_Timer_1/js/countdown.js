class CountDown {
    constructor(expiredDate, onRender, onComplete) {
        this.onRender = onRender;
        this.onComplete = onComplete;
    }

    setExpiredDate(expiredDate) {
        const currentTime = new Date().getTime();
        this.timeRemaining = expiredDate.getTime() - currentTime;

        this.timeRemaining > 0? this.start() : this.onComplete();
    }

    complete() {
        if (typeof this.onComplete === 'function') {
            onComplete();
        }
    }

    

    start() {
        const intervalId = setInterval( () => {
            this.timeRemaining -= 1000;

            if (this.timeRemaining < 0) {
                complete();
                clearInterval(intervalId);
            }
        }, 1000);
    }
}