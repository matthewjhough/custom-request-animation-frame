import requestAnimationFrame from "../../customRequestAnimationFrame/customRequestAnimationFrame";


export function AnimationFrameWindow() {
    const exampleOnClickHandler = () => {
        const delayNumber = 0;

        for (let i = 0; i < 16; i++) {
            if (i === 3 || i === 8) {
                const delayAmount = i === 3 ? 1 : 2;
                requestAnimationFrame(timestamp => {
                    console.log("(delay) NEW", timestamp);
                }, delayAmount);
            } else {
                requestAnimationFrame(timestamp => {
                    console.log("(non delay) NEW: ", timestamp);
                }, delayNumber);
            }
        }
    };

    return (<div onClick={exampleOnClickHandler.bind(this)}>
        AnimationFrameWindow
    </div>)
}