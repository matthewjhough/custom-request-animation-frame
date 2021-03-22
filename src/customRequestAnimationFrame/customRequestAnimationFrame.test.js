import customRequestAnimationFrame from "./customRequestAnimationFrame";

describe("customRequestAnimationFrame", () => {
   it("invokes callback that specifies delay after non-delay callback", () => {
      const methodResults = [];
      const delayText = "delay";
      const nonDelayText = "no-delay";
      const nonDelayCallback = () => {
         methodResults.push(delayText);
      };
      const delayCallback = () => {
         methodResults.push(nonDelayText);

         expect(methodResults[0]).toBe(nonDelayText);
      };

      customRequestAnimationFrame(delayCallback, 5);
      customRequestAnimationFrame(nonDelayCallback);
   });
});