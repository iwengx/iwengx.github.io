// * 函数节流
export const throttle = (codeback: () => void, time?: number) => {
   let temp: ReturnType<typeof setTimeout> | null = null;

   return function () {
      if (temp) return;

      temp = setTimeout(() => {
         codeback();
         temp = null;
      }, time);
   };
};
