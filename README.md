# EmotionAI: Emotion Classifier with XLNet and Next.js

[](https://www.google.com/search?q=https://your-deployment-url.vercel.app)

**EmotionAI** is a full-stack web application that uses a fine-tuned XLNet model to perform real-time emotion classification on user-provided text. The project demonstrates an end-to-end MLOps workflow, from data preprocessing and model training to building a REST API and creating an interactive, modern user interface.

## 

## 📋 Key Features

  * **Intelligent Backend:** A REST API built with **FastAPI** that serves a fine-tuned **XLNet** model for text classification into 4 emotion classes (joy, sadness, anger, fear).
  * **Interactive Frontend:** A modern and responsive user interface built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**, using components from [Shadcn/ui](https://ui.shadcn.com/).
  * **Real-Time Analysis:** Users can input text and receive a full breakdown of emotion predictions, with smooth animations powered by **Framer Motion**.
  * **Complete ML Workflow:** The project includes the notebook and scripts for data preprocessing, class balancing, tokenization, and model training using the **Hugging Face (`transformers`, `datasets`)** ecosystem.

-----

## 🛠️ Tech Stack

\<div style="display: flex; gap: 50px;"\>
\<div\>

**Backend (API & Model)**

  * Python
  * FastAPI
  * Hugging Face Transformers
  * PyTorch
  * Uvicorn

\</div\>
\<div\>

**Frontend (User Interface)**

  * Next.js
  * React
  * TypeScript
  * Tailwind CSS
  * Shadcn/ui
  * Framer Motion

\</div\>
\</div\>

-----

## 📂 Project Structure

The repository is organized into two main folders, decoupling the backend from the frontend.

```
emotion-classifier/
├── 📂 backend/
│   ├── 📂 fine_tuned_model/   # Fine-tuned model and tokenizer
│   │   ├── config.json
│   │   ├── model.safetensors
│   │   └── ...
│   ├── main.py                # FastAPI API code
│   └── requirements.txt       # Python dependencies
│
├── 📂 frontend/
│   ├── app/                   # Next.js pages and layout
│   ├── components/            # React components
│   ├── package.json           # Node.js dependencies
│   └── ...                    # Other Next.js config files
│
└── README.md                  # This file
```

-----

## 🚀 Getting Started

Follow these steps to run the full project on your local machine.

### Prerequisites

Ensure you have the following installed:

  * [Node.js](https://nodejs.org/) (v18 or higher)
  * [Python](https://www.python.org/) (v3.9 or higher) and `pip`
  * [Git](https://git-scm.com/)

### 1\. Clone the Repository

```bash
git clone https://github.com/your-username/emotion-classifier.git
cd emotion-classifier
```

### 2\. Set up the Backend

In a terminal, run the following commands:

```bash
# Navigate to the backend folder
cd backend

# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install the Python dependencies
pip install -r requirements.txt
```

**Important:** Make sure your `fine_tuned_model` folder with all its files (`model.safetensors`, `config.json`, `spiece.model`, etc.) is located inside the `backend/` directory.

### 3\. Set up the Frontend

Open a **new terminal window** (leave the backend terminal open) and run:

```bash
# Navigate to the frontend folder from the project root
cd frontend

# Install the JavaScript dependencies
# (Use pnpm install if you have pnpm, which seems to be the case for your project)
pnpm install
# Or if you prefer npm:
# npm install
```

-----

## ▶️ Running the Application Locally

You will need to have **two terminal windows open simultaneously**.

**Terminal 1: Start the Backend**

```bash
# Make sure you are in the 'backend' folder with the virtual environment activated
uvicorn main:app --reload
```

Your API will now be running at `http://127.0.0.1:8000`.

**Terminal 2: Start the Frontend**

```bash
# Make sure you are in the 'frontend' folder
pnpm dev
# or if you use npm:
# npm run dev
```

Your Next.js application will now be running at `http://localhost:3000`.

Open `http://localhost:3000` in your browser to see and use the demo\!

-----

## ☁️ Deployment

  * **Frontend (Next.js):** This project is ready to be deployed to **Vercel**. Simply connect your GitHub repository to Vercel, and it will handle the rest.
  * **Backend (FastAPI):** For deploying the Python API, platforms like **Render** or **Hugging Face Spaces** are recommended, as they have excellent support for Python servers. Once the backend is deployed, remember to update the `backendUrl` variable in `frontend/app/page.tsx` with the public URL of your API.

-----

\<details\>
\<summary\>📖 Details on Model Training (Optional)\</summary\>

This project uses a fine-tuned XLNet model. The original training process is detailed below and can be replicated using a Jupyter Notebook.

### Training Workflow

1.  **Data Loading & Preprocessing:** Loads raw text data from CSV files, cleans it by removing emojis and user mentions, and prepares it for the model.
2.  **Dataset Balancing:** Addresses class imbalance in the dataset by downsampling all classes to the size of the smallest class, ensuring the model doesn't develop a bias towards more frequent labels.
3.  **Data Preparation:** Splits the data into training, testing, and validation sets and converts them into the Hugging Face `Dataset` format.
4.  **Tokenization:** Uses a pre-trained `XLNetTokenizer` to convert the text data into numerical inputs (input IDs, attention masks) that the model can understand.
5.  **Fine-Tuning:** Initializes `XLNetForSequenceClassification` with a new classification head and uses the `Trainer` API to fine-tune the model on the emotion dataset.
6.  **Evaluation:** Measures the performance of the fine-tuned model on the test set using the accuracy metric.
7.  **Inference:** The fine-tuned model is saved locally and can be loaded into a `pipeline` to make predictions.

### 📂 Dataset for Training

The data is expected to be in a folder named `emotions_data` with the following files:

  * `emotion-labels-train.csv`
  * `emotion-labels-test.csv`
  * `emotion-labels-val.csv`

\</details\>