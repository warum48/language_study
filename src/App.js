import "./styles.css";
import React, { useCallback, useState, useEffect, useRef } from "react";
import Speech from "react-speech";
import Say from "react-say";
import SayButton from "react-say";
import { useSpeechSynthesis } from "react-speech-kit";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback..
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
  /*const selector = useCallback(
    (voices) => [...voices].find((v) => v.lang === "zh-HK"),
    []
  );*/
  const [counter, setCounter] = useState(0);
  const [counterLang, setCounterLang] = useState(0);
  //const [value, setValue] = useState("test speach");
  const { speak } = useSpeechSynthesis();
  const [data, setData] = useState(null);
  const data_ = [
    {
      en: "Unless",
      ru: "Пока не"
    },
    {
      en: "shallow",
      ru: "мелкий"
    },
    {
      en: "caveat",
      ru: "предостережение"
    },
    {
      en: "implicit",
      ru: "скрытый"
    },
    {
      en: "explicit",
      ru: "явный"
    },
    {
      en: "typecasting",
      ru: "приведение типов"
    },
    {
      en: "coertion",
      ru: "принуждение"
    },
    {
      en: "approximate",
      ru: "приблизительный"
    },
    {
      en: "hurdle",
      ru: "препятствие"
    }
  ];

  useEffect(() => {
    //speak({ text: value, lang: "ru-RU" });
    console.log("hi");
    //console.log(window.speechSynthesis.getVoices());
    fetch("https://jsonblob.com/api/jsonBlob/885082437441568768")
      .then((res) => res.json())
      .then(setData);
    //.then(console.log(data));

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

  useEffect(() => {
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
  }, [counterLang]);

  return (
    <div className="App">
      <h1>Hello English {counter}</h1>
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
      {/*<Speech text="Welcome to react speech" />
      <h2>Start editing to see some magdfic happen!</h2>
      <Say
        speak="A quick brown fox jumped over the lazy dogs."
        voice={selector}
        text="lala"
      />
      <SayButton
        onClick={(event) => console.log(event)}
        text="kokoko"
        speak="A quick brown fox jumped over the lazy dogs."
      >
        Tell me a story
  </SayButton>*/}
    </div>
  );
}

//https://www.robinwieruch.de/react-usestate-callback
