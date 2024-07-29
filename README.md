# Real-Time Chat Application with Firebase, React, Node.js, and Tailwind CSS

## Overview

This project is a real-time chat application built using React, Node.js, and Firebase. The chat application allows users to send and receive messages in real-time. Additionally, it suggests automatic replies based on the content of received messages.

## Features

- Real-time messaging using Firebase Realtime Database
- User authentication with Google Sign-In
- Message suggestions based on received message content
- Responsive UI built with Tailwind CSS

## Project Structure

├── public
│ ├── index.html
│ └── ...
├── src
│ ├── components
│ │ ├── Chat.js
│ │ └── ...
│ ├── firebase.js
│ ├── App.js
│ ├── index.js
│ └── ...
├── .gitignore
├── package.json
├── tailwind.config.js
└── README.md

## Getting Started

### Prerequisites

- Node.js
- npm
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anshulty/react-firebase-chat-app.git
   cd react-firebase-chat-app

   ```
2. Install dependencies
   npm install
3. Set up Firebase:

    Go to the Firebase Console.
    Create a new project.
    Set up Firebase Authentication and enable Google Sign-In.
    Set up Firebase Realtime Database.
    Create a .env file in the root directory and add your Firebase configuration.

4.Running the Project
    Start the development server:

     bash
     Copy code
     npm start
     Open your browser and navigate to http://localhost:3000.
**Contributing**
Feel free to fork this project, submit issues and pull requests. Contributions are always welcome.
