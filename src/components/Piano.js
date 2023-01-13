import React, { useState, useEffect, useRef } from "react";

import styles from "./Piano.module.css";

import Keyboard from "./Keyboard";

import * as Tone from "tone";

const synth = new Tone.PolySynth(Tone.Synth).toDestination();

synth.set({ detune: 0 });

console.log(Tone.Destination.blockTime);

export default function Piano() {
  const ref = useRef();

  const [code, setCode] = useState("C4");

  const [keyState, setKeyState] = useState([false, false, false, false, false, false, false, false]);
  const [notes] = useState(["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"]);
  const [names] = useState(["도", "레", "미", "파", "솔", "라", "시", "도"]);
  const [noteKeys] = useState(["A", "S", "D", "F", "G", "H", "J", "K"]);

  const [bg, setBG] = useState("#bdbdbd");

  useEffect(() => {
    // console.log("componentDidMount");

    ref.current.focus();

    return () => {
      // console.log("componentWillUnmount");
    };
  }, []);

  useEffect(() => {
    // console.log("componentDidUpdate");
  });

  useEffect(() => {
    console.log("play", code);
  }, [code]);

  const play = (index) => {
    if (!keyState[index]) {
      // synth.triggerAttack(notes[index]);

      synth.triggerAttack(notes[index], Tone.now());

      // setCode(notes[index]);

      setCode((previousState) => {
        // console.log("play", index, previousState, code);

        return notes[index];
      });

      setKeyState(
        keyState.map((item, idx) => {
          return idx === index ? true : item;
        })
      );
    }
  };

  const pause = (index) => {
    setKeyState(
      keyState.map((item, idx) => {
        if (idx === index) {
          if (item) {
            synth.triggerRelease(notes[index]); // synth.triggerRelease(notes[index], Tone.now());

            // synth.triggerRelease(notes[index], Tone.now() + 1);

            console.log("pause", code);
          }

          return false;
        } else {
          return item;
        }
      })
    );
  };

  const press = (handler, key) => {
    switch (key) {
      case "A":
        handler(0);
        break;
      case "S":
        handler(1);
        break;
      case "D":
        handler(2);
        break;
      case "F":
        handler(3);
        break;
      case "G":
        handler(4);
        break;
      case "H":
        handler(5);
        break;
      case "J":
        handler(6);
        break;
      case "K":
        handler(7);
        break;
      default:
        break;
    }
  };

  const flush = () => {
    synth.releaseAll();

    setKeyState(
      keyState.map((item, idx) => {
        return false;
      })
    );
  };

  const handleKeyDown = (e) => {
    press(play, e.key.toUpperCase());
  };

  const handleKeyUp = (e) => {
    press(pause, e.key.toUpperCase());
  };

  const handleMouseEnter = (e) => {
    ref.current.focus();
  };

  const handleMouseLeave = (e) => {};

  const handleFocus = (e) => {
    setBG("#1c313a");
  };

  const handleBlur = (e) => {
    setBG("#bdbdbd");

    flush();
  };

  return (
    <div ref={ref} tabIndex={0} className={styles.outline} style={{ backgroundColor: bg }} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onFocus={handleFocus} onBlur={handleBlur}>
      {notes.map((note, index) => {
        return <Keyboard key={index} index={index} note={note} name={names[index]} noteKey={noteKeys[index]} pressed={keyState[index]} play={play} pause={pause} />;
      })}
    </div>
  );
}
