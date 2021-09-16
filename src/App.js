import "./styles.css";
import React, { useCallback, useState, useEffect, useRef } from "react";
import Speech from "react-speech";
import Say from "react-say";
import SayButton from "react-say";
import { useSpeechSynthesis } from "react-speech-kit";
import useStateWithCallback from "use-state-with-callback";
import { useToggle } from "react-use";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "./redux/counter";
import { addDict, deleteAllDicts, deleteDictNum } from "./redux/dictionaries";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { IconContext } from "react-icons";
import { ImBubbles3 } from "react-icons/im";
import ReactJson from "react-json-view";

import Infohead from "./ui/Infohead";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback...
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default function App() {
  const inputArea = useRef(null);
  //const count= useSelector((state) => state.counter.counter); //test redux
  const { count } = useSelector((state) => state.counter);
  const mydicts = useSelector((state) => state.mdicts.dicts);
  const dispatch = useDispatch();
  /*const selector = useCallback(
    (voices) => [...voices].find((v) => v.lang === "zh-HK"),
    []
  );*/
  const [counter, setCounter] = useState(0);
  //const [counterLang, setCounterLang] = useState(0);
  //const [value, setValue] = useState("test speach");
  const { speak } = useSpeechSynthesis();
  const [toggleExpandHelp, setToggleExpandHelp] = useToggle();
  const [data, setData] = useState(null); //mod

  const [counterLang, setCounterLang] = useStateWithCallback(
    0,
    (counterLang) => {
      if (data) {
        if (counterLang == 0) {
          //speak({ text: data[counter].en, lang: "ru-RU" });
        } else {
          /*speak({
            text: data[counter].ru,
            voice: window.speechSynthesis.getVoices()[27]
          });*/
        }
      }
    }
  );
  /*const data_ = [
        {
      en: "implicit",
      ru: "скрытый"
    },
    {
      en: "explicit",
      ru: "явный"
    }
  ];*/

  useEffect(() => {
    //speak({ text: value, lang: "ru-RU" });
    console.log("hi");
    //console.log(window.speechSynthesis.getVoices());
    /*fetch("https://jsonblob.com/api/jsonBlob/885082437441568768")
      .then((res) => res.json())
      .then(setData);*/
    //.then(console.log(data));
    fetchNewDict("885082437441568768");
    //885129898419830784

    return function cleanup() {};
  }, []);

  useInterval(() => {
    //console.log("data", data);
    if (data) {
      if (counterLang == 0) {
        setCounterLang(counterLang + 1);
      } else {
        if (counter == data.length - 1) {
          setCounter(0);
        } else {
          setCounter(counter + 1);
        }
        setCounterLang(0);
      }
    }
  }, 1500);

  /*useEffect(() => {
    //speak({ text: data[counter].en, lang: "ru-RU" });
    if (data) {
      if (counterLang == 0) {
        speak({ text: data[counter].en, lang: "ru-RU" });
      } else {
        speak({
          text: data[counter].ru,
          voice: window.speechSynthesis.getVoices()[27]
        });
      }
    }
  }, [counterLang]);*/

  function onNewDictLoaded(data) {
    console.log("data", data);
    setData(data);
    setCounter(0);
    setCounterLang(0);
  }

  function fetchNewDict(jsonblobnum) {
    fetch("https://jsonblob.com/api/jsonBlob/" + jsonblobnum)
      .then((res) => res.json())
      //.then(setData);
      .then((res) => onNewDictLoaded(res));
  }

  function pasteNewDict(jsondata) {
    console.log("jsondata", jsondata);
    setData(JSON.parse(jsondata));
  }

  //function inputChange(val) {}

  return (
    <div className="App">
      <header>
        <IconContext.Provider
          value={{
            color: "white",
            size: "2.5em",
            className: "global-class-name"
          }}
        >
          <ImBubbles3 onClick={setToggleExpandHelp} />
        </IconContext.Provider>{" "}
        &nbsp;&nbsp;&nbsp;
        <h1>Hello English </h1>
        <div className="quote">Repetition is the key to learning</div>
      </header>
      {/*<
      
      {counter}
      
      h1> The count is: {count}</h1>
      <button onClick={() => dispatch(increment())}>increment</button>
      <button onClick={() => dispatch(decrement())}>decrement</button>
      <button onClick={() => dispatch(incrementByAmount(33))}>33</button>
  */}
      <div className="gridcont">
        <div className="settings">
          <Infohead
            text="How to paste dictonary"
            clickfunc={setToggleExpandHelp}
          />

          <div className={`expandableHelp ${toggleExpandHelp ? "hidden" : ""}`}>
            <ul>
              <li>Export table from google sheets as CSV</li>
              <li>
                Convert to JSON on
                <a href="https://csvjson.com/csv2json">csvjson.com/csv2json</a>
              </li>
              <li>
                Paste JSON to <a href="https://jsonblob.com/">jsonblob.com</a>{" "}
                and save
              </li>
              <li>Paste blob number from the URL here:</li>
            </ul>
            {/*
            <input onChange={(event) => fetchNewDict(event.target.value)} />*/}
            <textarea
              ref={inputArea}
              //onChange={(event) => pasteNewDict(event.target.value)}
              placeholder="paste dict here"
            />
            <button
              onClick={() =>
                dispatch(
                  addDict({
                    date: new Date()
                      .toISOString()
                      .slice(0, 19)
                      .split("T")
                      .join("_"),
                    dict: JSON.parse(inputArea.current.value)
                  })
                )
              }
            >
              add dict
            </button>
            <button onClick={() => dispatch(deleteAllDicts())}>
              delete all
            </button>
            <button onClick={() => dispatch(deleteDictNum(1))}>
              delete by num
            </button>
            <ReactJson src={mydicts[0]} />
          </div>

          <Infohead text="My dictionaries" clickfunc={setToggleExpandHelp} />
          {/*mydicts*/}
          {mydicts.map((el, index) => (
            <div key={index}>{el.date}</div>
          ))}
        </div>
        <div className="langtab">
          <table>
            <tbody>
              {data?.map((el, index) => (
                <tr key={index}>
                  <td className={index == counter ? "active" : ""}>{el.en}</td>
                  <td>{el.ru}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {counter}
        </div>
      </div>
    </div>
  );
}

//https://www.robinwieruch.de/react-usestate-callback
