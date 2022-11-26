import { useEffect, RefObject } from 'react';

function useClickOutsideHandler(ref: RefObject<HTMLElement | null>, cb: () => void) {
   useEffect(() => {
     function handleClickOutside(e: MouseEvent) {
       if (ref.current && !ref.current.contains(e.target as HTMLElement )) {
         cb();
       }
     }
     document.addEventListener("mousedown", handleClickOutside);
     return () => {
       document.removeEventListener("mousedown", handleClickOutside);
     };
   }, [ref]);
 }

 export default useClickOutsideHandler;
