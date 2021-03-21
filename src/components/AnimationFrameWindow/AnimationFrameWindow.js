import requestAnimationFrame from "../../customRequestAnimationFrame/customRequestAnimationFrame";


export function AnimationFrameWindow() {
    const onClickHandler = () => {
        const delayNumber = 0;

        for (let i = 0; i < 16; i++) {
            if (i === 3 || i === 8) {
                const delayAmount = i === 3 ? 2 : 4;
                requestAnimationFrame(timestamp => {
                    console.log("delay callback", timestamp);
                }, delayAmount);
            } else {
                requestAnimationFrame(timestamp => {
                    console.log("non delay callback", timestamp);
                },
                    delayNumber);
            }
        }
    };

    return (<div onClick={onClickHandler.bind(this)}>
        AnimationFrameWindow
    </div>)
}