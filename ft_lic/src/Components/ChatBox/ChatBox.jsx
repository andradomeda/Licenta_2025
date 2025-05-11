import React, { useState } from 'react';
import './ChatBox.css';

const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const chatSteps = [
        {
            question: "How can I help you?",
            options: [
                "I want to volunteer",
                "I need help as an elder",
                "I want to donate",
                "I have a question"
            ]
        },
        {
            question: "What type of volunteering are you interested in?",
            options: [
                "Regular visits to elders",
                "Event organization",
                "Transportation help",
                "Technical support"
            ]
        },
        {
            question: "How often can you volunteer?",
            options: [
                "Once a week",
                "Twice a week",
                "Once a month",
                "On special occasions"
            ]
        },
        {
            question: "Thank you for your interest! Would you like to:",
            options: [
                "Create an account",
                "Learn more about volunteering",
                "Contact us directly"
            ]
        }
    ];

    const handleOptionClick = (option) => {
        setSelectedOptions([...selectedOptions, option]);
        if (currentStep < chatSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setCurrentStep(0);
            setSelectedOptions([]);
        }
    };

    return (
        <div className={`chat-box ${isOpen ? 'open' : ''}`}>
            <button 
                className="btn btn-circle btn-primary btn-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? '×' : '💬'}
            </button>
            
            {isOpen && (
                <div className="card w-96 bg-base-100 shadow-xl absolute bottom-20 right-0">
                    <div className="card-body p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="card-title">How can we help?</h3>
                            <button 
                                className="btn btn-ghost btn-sm btn-circle"
                                onClick={() => setIsOpen(false)}
                            >
                                ×
                            </button>
                        </div>
                        
                        <div className="chat-messages space-y-4 max-h-96 overflow-y-auto">
                            {selectedOptions.map((option, index) => (
                                <div key={index} className="chat chat-start">
                                    <div className="chat-bubble chat-bubble-primary">{option}</div>
                                    <div className="chat-bubble chat-bubble-secondary">{chatSteps[index].question}</div>
                                </div>
                            ))}
                            
                            {currentStep < chatSteps.length && (
                                <div className="space-y-4">
                                    <div className="chat chat-start">
                                        <div className="chat-bubble chat-bubble-secondary">
                                            {chatSteps[currentStep].question}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {chatSteps[currentStep].options.map((option, index) => (
                                            <button
                                                key={index}
                                                className="btn btn-outline btn-primary btn-sm"
                                                onClick={() => handleOptionClick(option)}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBox; 