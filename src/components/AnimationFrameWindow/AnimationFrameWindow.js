import requestAnimationFrame from "../../customRequestAnimationFrame/customRequestAnimationFrame";


export function AnimationFrameWindow() {
    return (<div onClick={() => {
        const firstDelayValue = 100;
        const secondDelayValue = 2500;
        const firstConsoleLogText = `[delay ${firstDelayValue}] timestamp`;
        const secondConsoleLogText = `[delay ${secondDelayValue}] timestamp`;

        requestAnimationFrame(timestamp => console.log(firstConsoleLogText, timestamp), firstDelayValue);
        requestAnimationFrame(timestamp => console.log(secondConsoleLogText, timestamp), secondDelayValue)
    }}>
        AnimationFrameWindow
    </div>)
}