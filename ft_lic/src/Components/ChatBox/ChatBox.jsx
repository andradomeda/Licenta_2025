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
            // Reset or handle completion
            setCurrentStep(0);
            setSelectedOptions([]);
        }
    };

    return (
        <div className={`chat-box ${isOpen ? 'open' : ''}`}>
            <button 
                className="chat-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? '×' : '💬'}
            </button>
            
            {isOpen && (
                <div className="chat-content">
                    <div className="chat-header">
                        <h3>How can we help?</h3>
                        <button onClick={() => setIsOpen(false)}>×</button>
                    </div>
                    
                    <div className="chat-messages">
                        {selectedOptions.map((option, index) => (
                            <div key={index} className="chat-message">
                                <p className="user-message">{option}</p>
                                <p className="bot-message">{chatSteps[index].question}</p>
                            </div>
                        ))}
                        
                        {currentStep < chatSteps.length && (
                            <div className="current-question">
                                <p className="bot-message">{chatSteps[currentStep].question}</p>
                                <div className="options">
                                    {chatSteps[currentStep].options.map((option, index) => (
                                        <button
                                            key={index}
                                            className="option-button"
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
            )}
        </div>
    );
};

export default ChatBox; 