// import React, { memo, useState, useMemo, useRef, useEffect } from "react"
// import "./Slider.css"
// import PropTypes from "prop-types"
// import leftPad from "left-pad"
// import useWinsize from "../common/useWinsize"
// const Slider = memo(function Slider(props) {
//   const {
//     title,
//     currentStartHours,
//     currentEndHours,
//     onStartChanged,
//     onEndChanged,
//   } = props
//   const startHandle = useRef()
//   const endHandle = useRef()
//   let lastStartX = useRef()
//   let lastEndX = useRef()
//   const range = useRef() // 为了获取滑动轨道线的dom
//   const rangeWidth = useRef() // 保存滑动轨道线的宽度
//   const winSize = useWinsize()

//   const prevCurrentStartHours = useRef(currentStartHours);
//   const prevCurrentEndHours = useRef(currentEndHours);
//   const [start, setStart] = useState(() => (currentStartHours / 24) * 100)
//   const [end, setEnd] = useState(() => (currentEndHours / 24) * 100)
//   if (prevCurrentStartHours.current !== currentStartHours) {
//     setStart((currentStartHours / 24) * 100);
//     prevCurrentStartHours.current = currentStartHours;
// }

// if (prevCurrentEndHours.current !== currentEndHours) {
//     setEnd((currentEndHours / 24) * 100);
//     prevCurrentEndHours.current = currentEndHours;
// }


//   const startPercent = useMemo(() => {
//     if (start > 100) {
//       return 100
//     }

//     if (start < 0) {
//       return 0
//     }

//     return start
//   }, [start])

//   const endPercent = useMemo(() => {
//     if (end > 100) {
//       return 100
//     }

//     if (end < 0) {
//       return 0
//     }
//     return end
//   }, [end])
//   const startHours = useMemo(() => {
//     return Math.round((startPercent * 24) / 100)
//   }, [startPercent])

//   const endHours = useMemo(() => {
//     return Math.round((endPercent * 24) / 100)
//   }, [endPercent])

//   const startText = useMemo(() => {
//     return leftPad(startHours, 2, "0") + ":00"
//   }, [startHours])

//   const endText = useMemo(() => {
//     return leftPad(endHours, 2, "0") + ":00"
//   }, [endHours])


//   function onStartTouchBegin(e) {
//     const touch = e.targetTouches[0]
//     lastStartX.current = touch.pageX
//   }

//   function onEndTouchBegin(e) {
//     const touch = e.targetTouches[0]
//     lastEndX.current = touch.pageX
//   }

//   function onStartTouchMove(e) {
//     const touch = e.targetTouches[0]
//     const distance = touch.pageX - lastStartX.current
//     lastStartX.current = touch.pageX

//     setStart((start) => start + (distance / rangeWidth.current) * 100)
//   }

//   function onEndTouchMove(e) {
//     const touch = e.targetTouches[0]
//     const distance = touch.pageX - lastEndX.current
//     lastEndX.current = touch.pageX

//     setEnd((end) => end + (distance / rangeWidth.current) * 100)
//   }
//   useEffect(() => {
//     rangeWidth.current = parseFloat(
//       window.getComputedStyle(range.current).width
//     )
//   }, [winSize.width])
//   useEffect(() => {
//     const startHandleDom = startHandle.current
//     const endHandleDom = endHandle.current
//     startHandleDom.addEventListener("touchstart", onStartTouchBegin, false)
//     startHandleDom.addEventListener("touchmove", onStartTouchMove, false)
//     endHandleDom.addEventListener("touchstart", onEndTouchBegin, false)
//     endHandleDom.addEventListener("touchmove", onEndTouchMove, false)
//     return () => {
//       startHandleDom.removeEventListener("touchstart", onStartTouchBegin, false)
//       startHandleDom.removeEventListener("touchmove", onStartTouchMove, false)
//       endHandleDom.removeEventListener("touchstart", onEndTouchBegin, false)
//       endHandleDom.removeEventListener("touchmove", onEndTouchMove, false)
//     }
//   })
//   useEffect(() => {
//     onStartChanged(startHours)
//   }, [startHours, onStartChanged])

//   useEffect(() => {
//     onEndChanged(endHours)
//   }, [endHours, onEndChanged])

//   return (
//     <div className="option">
//       <h3>{title}</h3>
//       <div className="range-slider">
//         <div className="slider" ref={range}>
//           <div
//             className="slider-range"
//             style={{
//               left: startPercent + "%",
//               width: endPercent - startPercent + "%",
//             }}
//           ></div>
//           <i
//             ref={startHandle}
//             className="slider-handle"
//             style={{
//               left: startPercent + "%",
//             }}
//           >
//             <span>{startText}</span>
//           </i>
//           <i
//             ref={endHandle}
//             className="slider-handle"
//             style={{
//               left: endPercent + "%",
//             }}
//           >
//             <span>{endText}</span>
//           </i>
//         </div>
//       </div>
//     </div>
//   )
// })

// Slider.propTypes = {
//   title: PropTypes.string.isRequired,
//   currentStartHours: PropTypes.number.isRequired,
//   currentEndHours: PropTypes.number.isRequired,
//   onStartChanged: PropTypes.func.isRequired,
//   onEndChanged: PropTypes.func.isRequired,
// }

// export default Slider
import React, { memo, useState, useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import leftPad from 'left-pad';
import useWinSize from '../common/useWinSize';
import './Slider.css';


const Slider = memo(function Slider(props) {
    const {
        title,
        currentStartHours,
        currentEndHours,
        onStartChanged,
        onEndChanged,
    } = props;

    const winSize = useWinSize();

    const startHandle = useRef();
    const endHandle = useRef();

    const lastStartX = useRef();
    const lastEndX = useRef();

    const range = useRef();
    const rangeWidth = useRef();

    const prevCurrentStartHours = useRef(currentStartHours);
    const prevCurrentEndHours = useRef(currentEndHours);
  

    const [start, setStart] = useState(() => (currentStartHours / 24) * 100);
    const [end, setEnd] = useState(() => (currentEndHours / 24) * 100);

    if (prevCurrentStartHours.current !== currentStartHours) {
        setStart((currentStartHours / 24) * 100); // setStart没有起作用
        prevCurrentStartHours.current = currentStartHours;
    }

    if (prevCurrentEndHours.current !== currentEndHours) {
        setEnd((currentEndHours / 24) * 100);
        prevCurrentEndHours.current = currentEndHours;
    }

    const startPercent = useMemo(() => {
        if (start > 100) {
            return 100;
        }

        if (start < 0) {
            return 0;
        }

        return start;
    }, [start]);

    const endPercent = useMemo(() => {
        if (end > 100) {
            return 100;
        }

        if (end < 0) {
            return 0;
        }

        return end;
    }, [end]);

    const startHours = useMemo(() => {
        return Math.round((startPercent * 24) / 100);
    }, [startPercent]);

    const endHours = useMemo(() => {
        return Math.round((endPercent * 24) / 100);
    }, [endPercent]);

    const startText = useMemo(() => {
        return leftPad(startHours, 2, '0') + ':00';
    }, [startHours]);

    const endText = useMemo(() => {
        return leftPad(endHours, 2, '0') + ':00';
    }, [endHours]);

    function onStartTouchBegin(e) {
        const touch = e.targetTouches[0];
        lastStartX.current = touch.pageX;
    }

    function onEndTouchBegin(e) {
        const touch = e.targetTouches[0];
        lastEndX.current = touch.pageX;
    }

    function onStartTouchMove(e) {
        const touch = e.targetTouches[0];
        const distance = touch.pageX - lastStartX.current;
        lastStartX.current = touch.pageX;

        setStart(start => start + (distance / rangeWidth.current) * 100);
    }

    function onEndTouchMove(e) {
        const touch = e.targetTouches[0];
        const distance = touch.pageX - lastEndX.current;
        lastEndX.current = touch.pageX;

        setEnd(end => end + (distance / rangeWidth.current) * 100);
    }

    useEffect(() => {
        rangeWidth.current = parseFloat(
            window.getComputedStyle(range.current).width
        );
    }, [winSize.width]);

    useEffect(() => {
    const startHandleDom = startHandle.current
    const endHandleDom = endHandle.current
    startHandleDom.addEventListener(
            'touchstart',
            onStartTouchBegin,
            false
        );
        startHandleDom.addEventListener(
            'touchmove',
            onStartTouchMove,
            false
        );
        endHandleDom.addEventListener(
            'touchstart',
            onEndTouchBegin,
            false
        );
        endHandleDom.addEventListener('touchmove', onEndTouchMove, false);

        return () => {
            startHandleDom.removeEventListener(
                'touchstart',
                onStartTouchBegin,
                false
            );
            startHandleDom.removeEventListener(
                'touchmove',
                onStartTouchMove,
                false
            );
            endHandleDom.removeEventListener(
                'touchstart',
                onEndTouchBegin,
                false
            );
            endHandleDom.removeEventListener(
                'touchmove',
                onEndTouchMove,
                false
            );
        };
    });

    useEffect(() => {
        onStartChanged(startHours);
    }, [startHours,onStartChanged]);

    useEffect(() => {
        onEndChanged(endHours);
    }, [endHours,onEndChanged]);

    return (
        <div className="option">
            <h3>{title}</h3>
            <div className="range-slider">
                <div className="slider" ref={range}>
                    <div
                        className="slider-range"
                        style={{
                            left: startPercent + '%',
                            width: endPercent - startPercent + '%',
                        }}
                    ></div>
                    <i
                        ref={startHandle}
                        className="slider-handle"
                        style={{
                            left: startPercent + '%',
                        }}
                    >
                        <span>{startText}</span>
                    </i>
                    <i
                        ref={endHandle}
                        className="slider-handle"
                        style={{
                            left: endPercent + '%',
                        }}
                    >
                        <span>{endText}</span>
                    </i>
                </div>
            </div>
        </div>
    );
});

Slider.propTypes = {
    title: PropTypes.string.isRequired,
    currentStartHours: PropTypes.number.isRequired,
    currentEndHours: PropTypes.number.isRequired,
    onStartChanged: PropTypes.func.isRequired,
    onEndChanged: PropTypes.func.isRequired,
};

export default Slider;
