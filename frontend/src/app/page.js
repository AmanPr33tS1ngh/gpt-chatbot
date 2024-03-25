"use client";
import "regenerator-runtime/runtime";
import axios from "axios";
import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [botResponse, setBotResponse] = useState(null);
  const [responseType, setResponseType] = useState("Text");
  const [loading, setLoading] = useState(false);

  const submitResponse = (e) => {
    e.preventDefault();
    console.log("userinput", userInput, "transcript", transcript);
    setLoading(true);
    axios
      .post("http://localhost:8000/chatbot/", {
        userInput: userInput ? userInput : transcript,
      })
      .then((res) => {
        console.log("response", res);
        setBotResponse(res.data.message);
        if (responseType !== "Text") {
          speak();
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log("errrr", e);
      });
  };
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(botResponse);
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find(
      (voice) => voice.name === "Google UK English Female"
    );
    utterance.voice = selectedVoice;
    // window.speechSynthesis.speak(new SpeechSynthesisUtterance(botResponse));
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center">
        <label htmlFor="responseType" className="mr-2">
          Response type:
        </label>
        <select
          onChange={(e) => setResponseType(e.target.value)}
          id="responseType"
          className="border border-gray-300 rounded-md px-2 py-1"
        >
          <option value="Text">Text</option>
          <option value="Voice">Voice</option>
        </select>
      </div>
      {loading ? (
        <div class="flex space-x-2 justify-center items-center  dark:invert">
          <span class="sr-only">Loading...</span>
          <div class="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div class="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div class="h-8 w-8 bg-black rounded-full animate-bounce"></div>
        </div>
      ) : botResponse ? (
        botResponse
      ) : (
        "Start chat"
      )}
      <div className=" w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="w-full">
          {(listening || transcript) && (
            <div className="w-1/4 m-auto rounded-md border p-4 bg-white">
              <div className="flex-1 flex w-full justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {!listening ? "Recorded" : "Recording"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {!listening ? "Thanks for talking." : "Start speaking..."}
                  </p>
                </div>
                {listening && (
                  <div className="rounded-full w-4 h-4 bg-red-400 animate-pulse" />
                )}
              </div>

              {transcript && (
                <div className="border rounded-md p-2 h-fullm mt-4">
                  <p className="mb-0">{transcript}</p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="absolute bottom-5">
          <form className="flex items-center" onSubmit={submitResponse}>
            <input
              className="border border-gray-300 rounded bg-gray-100 bg-opacity-25 w-[70vw] h-12 p-2"
              value={userInput}
              placeholder="Start chatting..."
              onChange={(e) => {
                resetTranscript();
                setUserInput(e.target.value);
              }}
            />
            <div className="absolute right-5 flex justify-between w-24 items-center">
              <div
                onClick={SpeechRecognition.startListening}
                className={`flex items-center justify-center cursor-pointer ${
                  listening
                    ? "bg-red-400 hover:bg-red-500"
                    : "bg-green-400 hover:bg-green-500"
                } rounded-full focus:outline-none h-10 w-10`}
              >
                {listening ? (
                  <svg
                    className="h-12 w-12 "
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 256 256"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-white"
                  >
                    <path
                      fill="currentColor"
                      d="M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48ZM96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V232a8 8 0 0 1-16 0v-24.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6Z"
                    />
                  </svg>
                )}
              </div>
              <button
                type={"submit"}
                className={`flex items-center justify-center w-8 h-8 focus:outline-none`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  width="535.5px"
                  height="535.5px"
                  viewBox="0 0 535.5 535.5"
                >
                  <g>
                    <g id="send">
                      <polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75   " />
                    </g>
                  </g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
export default Home;
