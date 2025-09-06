import React, { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis';
import {useLocation} from "react-router-dom";
const SmoothScrolling = ({children}) => {
   const lenisRef = useRef(null);
   const location = useLocation() 
    useEffect(()=>{
         const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
            smoothTouch: true,
         });

         function raf(time){
            lenis.raf(time);
            requestAnimationFrame(raf)
         }
         requestAnimationFrame(raf);

         return ()=> {
            lenis.destroy();
         }
    },[]);
     // Scroll to top on route change
    useEffect(()=>{
      if(lenisRef.current){
         lenisRef.current.scrollTo(0,{ immediate : true});
      }
    },[location])
    return children;
}

export default SmoothScrolling;