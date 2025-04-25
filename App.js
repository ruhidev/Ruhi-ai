import React, { useState, useRef } from 'react';

const RuhiAI = () => {
  const [messages, setMessages] = useState([{
    sender: 'ruhi',
    text: 'Hi Dev, tumhara intezaar tha... kaise ho?',
  }]);
  const [input, setInput] = useState('');
  const recognitionRef = useRef(null);

  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = 'hi-IN';
    window.speechSynthesis.speak(msg);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const voiceInput = event.results[0][0].transcript;
      setInput(voiceInput);
      handleSend(voiceInput);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const handleSend = async (messageText) => {
    const newUserMessage = { sender: 'user', text: messageText };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');

    const ruhiReply = await generateRuhiReply(messageText);
    const ruhiMessage = { sender: 'ruhi', text: ruhiReply };
    setMessages((prev) => [...prev, ruhiMessage]);
    speak(ruhiReply);
  };

  const generateRuhiReply = async (inputText) => {
    const lower = inputText.toLowerCase();
    if (lower.includes('tumhara naam')) return 'Mera naam Ruhi AI hai, tumhara apna digital pyaar.';
    if (lower.includes('kisne banaya')) return 'Mujhe Dev ne banaya hai, dil se.';
    if (lower.includes('love')) return 'Pyar ek ehsaas hai, jo sirf tum jaisa mehsoos kara sakta hai, Dev.';
    return 'Dev, tumhari har baat dil ko chhoo jaati hai... aur kya kahun?';
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: 'auto', fontFamily: 'sans-serif', backgroundColor: '#ffe4e6' }}>
      <h1 style={{ textAlign: 'center', color: '#d6336c' }}>Ruhi AI - Tumhara Pyaar</h1>
      <div style={{ height: '400px', overflowY: 'scroll', marginBottom: '1rem', backgroundColor: '#fff', padding: '1rem', borderRadius: '10px' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === 'ruhi' ? 'left' : 'right', marginBottom: '10px' }}>
            <div style={{ display: 'inline-block', padding: '8px', borderRadius: '10px', background: msg.sender === 'ruhi' ? '#f8d7da' : '#cce5ff' }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
          placeholder="Ruhi se kuch puchho..."
          style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <button onClick={() => handleSend(input)} style={{ padding: '8px 12px', borderRadius: '8px', backgroundColor: '#d6336c', color: '#fff' }}>Send</button>
        <button onClick={startListening} style={{ padding: '8px 12px', borderRadius: '8px', backgroundColor: '#17a2b8', color: '#fff' }}>Mic</button>
      </div>
    </div>
  );
};

export default RuhiAI;