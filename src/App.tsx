import { useEffect, useState } from "react"
import parse from "./assets/parse2.png"
import { encoding_for_model } from "@dqbd/tiktoken";

function App() {
    const modelList = [
        // GPT-4 Series
        { name: "GPT-4o", value: "gpt-4o" },
        { name: "GPT-4 Turbo", value: "gpt-4-turbo" },
        { name: "GPT-4", value: "gpt-4" }, // 

        // GPT-3.5 Series
        { name: "GPT-3.5 Turbo", value: "gpt-3.5-turbo" },
        { name: "GPT-3.5 Turbo-0125", value: "gpt-3.5-turbo-0125" },
        { name: "GPT-3.5 Turbo-1106", value: "gpt-3.5-turbo-1106" },
        { name: "GPT-3.5 Turbo-16k", value: "gpt-3.5-turbo-16k" },

        // GPT-3 Text Completion Models
        { name: "Text-Davinci-003", value: "text-davinci-003" },
        { name: "Text-Davinci-002", value: "text-davinci-002" },
        { name: "Text-Curie-001", value: "text-curie-001" },
        { name: "Text-Babbage-001", value: "text-babbage-001" },
        { name: "Text-Ada-001", value: "text-ada-001" },

        // Code Completion Models
        { name: "Code-Davinci-002", value: "code-davinci-002" },
        { name: "Code-Cushman-001", value: "code-cushman-001" },
    ];

    const [darkmode, setDarkmode] = useState(false);
    const [model, setModel] = useState(false);
    const [selectedModel, setSelectedModel] = useState("GPT-4o");
    const [selectedModelBackend, setSelectedModelBackend] = useState("gpt-4o")

    const [input, setInput] = useState("");
    const [totaltokens, setTotaltokens] = useState(0);
    const [decoded, setDecoded] = useState<string[]>([]);
    const [nums, setNums] = useState<number[]>([]);

    useEffect(() => {
        function fun(modelname: any) {
            const encoder = encoding_for_model(modelname);
            const tokens = encoder.encode(input);
            setNums(Array.from(tokens));
            setTotaltokens(tokens.length);

            const arr: string[] = [];
            const textDecoder = new TextDecoder();

            for (let i = 0; i < tokens.length; i++) {
                const tokenId = tokens[i];
                const tokenBytes = encoder.decode(new Uint32Array([tokenId]));
                const tokenStr = textDecoder.decode(tokenBytes);
                arr.push(tokenStr);
            }

            setDecoded(arr);
        }
        fun(selectedModelBackend);
    }, [input, selectedModelBackend]);

    return (
        <div className={`w-screen md:h-screen ${darkmode ? "bg-neutral-900" : "bg-white"}`}>
            {/* Navbar */}
            <div className={`h-[10%] w-screen border-b-[2px] ${darkmode ? "border-neutral-700/70" : "border-gray-300"} px-[10px] md:px-[50px] lg:px-[120px] flex items-center justify-between`}>
                <div className="md:h-full py-3 flex items-center gap-x-2 font-semibold text-3xl font-montserrat">
                    <img className="w-full md:h-full select-none h-10" src={parse} alt="" />
                    <div className={`hidden md:block ${darkmode ? "text-white" : "text-black"}`}>Parse</div>
                </div>
                <div className="md:h-full h-16 py-3 flex items-center gap-x-[20px]">
                    <div onClick={() => setModel(true)} className={`text-sm  cursor-pointer w-[200px] md:w-[300px] h-full border-[2px] ${darkmode ? "border-neutral-700/70" : "border-gray-300"} ${darkmode ? "text-white" : "text-black"} rounded-lg flex items-center justify-center font-montserrat font-semibold overflow-hidden`}> <div>{selectedModel}</div> </div>
                    <div className={`${model ? "block" : "hidden"} absolute top-16 border-2 font-montserrat ${darkmode ? "bg-neutral-900" : "bg-white"} rounded-lg w-[300px] ${darkmode ? "text-white" : "text-black"} ${darkmode ? "border-neutral-700/70" : "border-gray-300"}`}>
                        {modelList.map((m) => (
                            <option onClick={() => { setModel(false); setSelectedModel(m.name); setSelectedModelBackend(m.value) }} className={`text-sm pl-4 p-2 ${darkmode ? "hover:text-black" : "hover:text-black"} ${darkmode ? "hover:bg-white" : "hover:bg-gray-200"} ${darkmode ? "text-white" : "text-black"} cursor-pointer`} key={m.value} value={m.value}>{m.name}</option>
                        ))}
                    </div>

                    {
                        darkmode ? (
                            <svg onClick={() => setDarkmode(!darkmode)} className="cursor-pointer size-6 text-neutral-600/100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                            </svg>

                        ) : (
                            <svg onClick={() => setDarkmode(!darkmode)} className="cursor-pointer size-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                        )
                    }
                </div>
            </div>
            {/* Body */}
            <div className="h-[90%] w-full flex flex-col md:flex-row gap-4 px-[10px] md:px-[50px] lg:px-[120px] py-4 pb-[100px] md:pb-0">
                <div className={`h-1/2 w-full md:w-1/2 flex flex-col gap-y-3`}>
                    <div className={`text-xl font-montserrat font-semibold ${darkmode ? "text-white" : "text-black"}`}>User Query </div>
                    <textarea onChange={(e) => setInput(e.target.value)} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} className={`bg-transparent px-3 py-2 outline-none font-montserrat min-h-[280px] max-h-[280px] w-full rounded-lg border-[2px] ${darkmode ? "text-white" : "text-black"} ${darkmode ? "border-neutral-700/70" : "border-gray-300"}`}></textarea>
                </div>

                <div className={`h-full w-full md:w-1/2`}>
                    <div className={`text-xl font-montserrat font-semibold mb-3 ${darkmode ? "text-white" : "text-black"}`}>Token count - {totaltokens}</div>
                    <div className="w-full flex flex-col gap-4">
                        <div
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            className={`${darkmode ? "text-white" : "text-black"} 
                                overflow-auto 
                                px-3 py-2 
                                h-[580px] w-full 
                                rounded-lg border-[2px] 
                                ${darkmode ? "border-neutral-700/70" : "border-gray-300"}
                                font-mono text-sm`}
                            >
                            {nums.map((num, i) => (
                                <div key={i} className="px-1 py-0.5 font-semibold">
                                    <span>{num}</span> - <span>{decoded[i]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App