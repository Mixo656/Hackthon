let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-US";
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (speechRecognition) {
    let recognition = new speechRecognition();

    recognition.onresult = (event) => {
        let currentIndex = event.resultIndex;
        let transcript = event.results[currentIndex][0].transcript;
        content.innerText = transcript;
        takeCommand(transcript.toLowerCase());
    };

    recognition.onerror = () => {
        speak("I couldn't understand. Please try again.");
        btn.style.display = "flex";
        voice.style.display = "none";
    };

    btn.addEventListener("click", () => {
        recognition.start();
        voice.style.display = "block";
        btn.style.display = "none";
    });
} else {
    speak("Your browser does not support voice recognition.");
}

function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";

    if(message.includes("hello")||message.includes("hey")){
        speak("hello sir,what can i help you?")
    
    } else if (message.includes("i love you")) {
        speak("I love you too");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Code Mavericks, my name is Mixo");
    } else if (message.includes("play")) {
        const query = message.replace("play", "").trim();
        if (query) {
            playYouTube(query);
        } else {
            speak("Please specify the name of the song or video to play.");
        }
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(`The time is ${time}`);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(`Today's date is ${date}`);
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://facebook.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://instagram.com/", "_blank");
    } else if (message.trim() !== "") {
        let sanitizedMessage = message.replace(/shipra|shifra/gi, "").trim();
        let finalText = `This is what I found on the internet regarding ${sanitizedMessage}`;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(sanitizedMessage)}`, "_blank");
    } else {
        speak("I'm sorry, I didn't catch that. Could you please repeat?");
    }
}

function playYouTube(query) {
    const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    speak(`Playing ${query} on YouTube`);
    window.open(youtubeUrl, "_blank");
}

wishMe();
