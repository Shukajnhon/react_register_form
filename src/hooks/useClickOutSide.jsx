import React, {useState, useRef, useEffect} from "react";
export default function useClickOutSide() {
  const [show, setShow] = useState(false);
  const nodeRef = useRef(null);
  // console.log(dropdownRef.current);

  useEffect((dom = "button") => {
    function handleClickOutSide(e) {
      // console.log(e.target);
      if (
        nodeRef.current &&
        !nodeRef.current.contains(e.target) &&
        !e.target.matches(dom)
      ) {
        // console.log('click outside dropdown');
        setShow(false);
      } else {
        // console.log("click inside");
      }
    }

    document.addEventListener("click", handleClickOutSide);

    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  return {
    show,
    setShow,
    nodeRef,
  };
}
