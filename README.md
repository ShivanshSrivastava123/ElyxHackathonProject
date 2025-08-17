# Elyx Member Journey Visualizer

The **Elyx Member Journey Visualizer** is a full-stack web application designed to transform unstructured PDF chat logs into a dynamic, multi-page dashboard for visualizing a member's health and wellness journey. This tool leverages a GenAI backend (Google's Gemini) to parse and structure complex health conversations, storing the results in a MongoDB database. The frontend, built with React, provides an intuitive and interactive console for health coaches and clinicians to gain deep insights into member progress.

This project was developed to solve the challenge of extracting actionable intelligence from lengthy, unstructured communication, enabling a clear, data-driven understanding of a member's health over time.



---

## Key Features

* **🤖 AI-Powered PDF Processing**: Extracts member personas, KPIs, event timelines, and the rationale behind interventions from raw text using the Google Gemini API.
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
* A MongoDB database instance (local or via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
* A Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name
```

### 2. Backend Setup

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

### 3. Frontend Setup

1.  **Navigate to the frontend folder** from the root directory:
    ```bash
    cd my-react-app
    ```

2.  **Install frontend dependencies**:
    ```bash
    npm install
    ```

### 4. Running the Application

1.  **Navigate back to the root project folder**.
2.  If you have configured the `concurrently` script in the root `package.json`, run both the frontend and backend servers with a single command:
    ```bash
    npm run dev
    ```
    Otherwise, you will need to open two separate terminals to run the backend (`npm run dev` in `my-app-backend`) and frontend (`npm start` in `my-react-app`).

The application will be available at `http://localhost:3000`.
