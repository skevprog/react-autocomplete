export const debounce = (fn: (...args: any) => void, ms = 300) => {
   let timeoutId: ReturnType<typeof setTimeout>
   return function (this: unknown, ...args: unknown[]) {
     clearTimeout(timeoutId)
     timeoutId = setTimeout(() => fn.apply(this, args), ms)
   }
 }
