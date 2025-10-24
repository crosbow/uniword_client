/* eslint-disable no-undef */
import { Activity, useEffect, useState } from "react";
import Definition from "./components/Definition";
import { checkSingleWord } from "./utils/checkSingleWord";

function App() {
  const [selected, setSelected] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (chrome.runtime) {
      chrome.runtime.sendMessage(
        {
          type: "GET_LAST_SELECTED_TEXT",
        },
        (res) => {
          if (res && res.text) {
            const isSingleWord = checkSingleWord(res.text);
            setSelected(!isSingleWord.message ? null : isSingleWord.word);
          }
        }
      );
    }

    return () => {
      setShow(false);
    };
  }, []);

  return (
    <div className="w-[380px] h-[500px] bg-white p-8 font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Vocabo
        </h1>
        <p className="text-sm text-gray-500 mt-1">Quick word lookup</p>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Selected Word Display */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 block">
            Word
          </label>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-xl font-semibold text-gray-900 break-words mb-2">
              {selected}
            </p>
          </div>
          {selected === null && (
            <span className="text-amber-500 text-xs">
              Multiple word not supported!
            </span>
          )}
        </div>

        {/* Action Button */}
        <button
          disabled={show || !selected}
          onClick={() => setShow(true)}
          className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 text-white disabled:text-gray-500 font-semibold rounded-lg transition-colors duration-150 disabled:cursor-not-allowed"
        >
          {show ? "Definition shown" : "Show definition"}
        </button>

        {/* Definition Display */}
        <Activity mode={show ? "visible" : "hidden"}>
          <Definition selected={selected} />
        </Activity>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
