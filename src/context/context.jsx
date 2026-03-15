import { createContext, useState } from "react";

export const Context = createContext();
import run from "../config/gemini";
import toast from "react-hot-toast";
import { WIP } from "../constants/constants";

// eslint-disable-next-line react/prop-types
const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isNewUser, setNewUser] = useState(true);

  const handleWIP = () => {
    toast(WIP, {
      icon: "⚠️",
    });
  };
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;
    // const currentInput = prompt || input;

    if (prompt) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }

    let formattedResponse = response
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/^\* (.*$)/gim, '<li>$1</li>')
      .replace(/\n/g, '<br/>');

    if (formattedResponse.includes('<li>')) {
      formattedResponse = formattedResponse.replace(/(<li>.*<\/li>)/gms, '<ul>$1</ul>');
    }

    let responseArray = formattedResponse.split(" ");

    for (let i = 0; i < responseArray.length; i++) {
      const nextWord = responseArray[i];
      delayPara(i, nextWord + " ");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    WIP,
    isLoggedIn,
    setLoggedIn,
    isNewUser,
    setNewUser,
    handleWIP,
  };
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
