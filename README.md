# Elyx Member Journey Visualizer

The **Elyx Member Journey Visualizer** is a full-stack web application designed to transform unstructured PDF chat logs into a dynamic, multi-page dashboard for visualizing a member's health and wellness journey. This tool leverages a GenAI backend (Google's Gemini) to parse and structure complex health conversations, storing the results in a MongoDB database. The frontend, built with React, provides an intuitive and interactive console for health coaches and clinicians to gain deep insights into member progress.

This project was developed to solve the challenge of extracting actionable intelligence from lengthy, unstructured communication, enabling a clear, data-driven understanding of a member's health over time.

---

## Key Features

* **🤖 AI-Powered PDF Processing**: Extracts member personas, KPIs, event timelines, and rationale from raw text using the Google Gemini API.
* **👥 Multi-Member Database**: Supports multiple member profiles with data persistence in MongoDB, allowing users to switch between different member dashboards seamlessly.
* **📊 Comprehensive Visualization Suite**:
    * **Dashboard**: Displays the member's persona, key health KPIs, and trend charts.
    * **Journey**: An interactive, chronological timeline of key events with clickable details.
    * **Decisions**: A log that details the "why" behind each intervention and tracks internal team metrics.
    * **Chats**: A view of the full, raw text from the original uploaded PDF for complete context.
* **🚀 Dynamic & Interactive UI**: A clean, multi-page interface built with React and styled with Tailwind CSS. It uses Zustand for state management and Framer Motion for smooth, subtle animations.

---

## Technology Stack

* **Frontend**: React, React Router, Zustand, Framer Motion, Tailwind CSS, Recharts
* **Backend**: Node.js, Express.js
* **Database**: MongoDB with Mongoose
* **AI**: Google Gemini API

---

## Local Setup and Installation

Follow these steps to get the project running on your local machine.

### Prerequisites

* Node.js and npm installed
* Git installed
* A MongoDB Atlas account and a free cluster
* A Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name
```

### 2. Setup MongoDB

1.  Log in to your [MongoDB Atlas](https://cloud.mongodb.com/) account.
2.  Create a new project and a new free-tier cluster.
3.  Under your cluster's "Security" tab, go to **Network Access** and click **"Add IP Address"**. Choose **"Allow Access From Anywhere"** (for development purposes).
4.  Go to **Database Access** and create a new database user with a secure password.
5.  Navigate back to your cluster's main page and click the **"Connect"** button.
6.  Select **"Drivers"**, and under "View connection string", copy the URI.
7.  Replace `<password>` in the connection string with the password you created for your database user.

### 3. Backend Setup

1.  **Navigate to the backend folder**:
    ```bash
    cd my-app-backend
    ```
2.  **Install backend dependencies**:
    ```bash
    npm install
    ```
3.  **Create an environment file**:
    Create a file named `.env` in the `my-app-backend` directory and add your secret keys:
    ```env
    MONGODB_URI="your_mongodb_connection_string_here"
    GEMINI_API_KEY="your_google_gemini_api_key_here"
    ```

### 4. Frontend Setup

1.  **Navigate to the frontend folder** from the root directory:
    ```bash
    cd my-react-app
    ```
2.  **Install frontend dependencies**:
    ```bash
    npm install
    ```

---

## Running the Application

You will need two separate terminals to run the application.

### Terminal 1: Start the Backend Server

```bash
# Navigate to the backend directory
cd path/to/my-app-backend

# Start the server using nodemon
nodemon server.js
```
You should see "Server is running..." and "MongoDB connected successfully."

### Terminal 2: Start the Frontend App

```bash
# Navigate to the frontend directory
cd path/to/my-react-app

# Start the React development server
npm start
```
Your browser will open to `http://localhost:3000`, and the application will be running.
