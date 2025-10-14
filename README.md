# EmotionAI: Emotion Classifier with XLNet and Next.js

**EmotionAI** is a full-stack web application that uses a fine-tuned XLNet model to perform real-time emotion classification on user-provided text. The project demonstrates an end-to-end MLOps workflow, from data preprocessing and model training to building a REST API and creating an interactive, modern user interface.

## 📋 Key Features

  * **Intelligent Backend:** A REST API built with **FastAPI** that serves a fine-tuned **XLNet** model for text classification into 4 emotion classes (joy, sadness, anger, fear).
  * **Interactive Frontend:** A modern and responsive user interface built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**, using components from [Shadcn/ui](https://ui.shadcn.com/).
  * **Real-Time Analysis:** Users can input text and receive a full breakdown of emotion predictions, with smooth animations powered by **Framer Motion**.
  * **Complete ML Workflow:** The project includes the notebook and scripts for data preprocessing, class balancing, tokenization, and model training using the **Hugging Face (`transformers`, `datasets`)** ecosystem.

## 🛠️ Tech Stack

| Backend (API & Model)         | Frontend (User Interface) |
| ----------------------------- | ------------------------- |
| Python                        | Next.js                   |
| FastAPI                       | React                     |
| Hugging Face Transformers     | TypeScript                |
| PyTorch                       | Tailwind CSS              |
| Uvicorn                       | Shadcn/ui                 |
|                               | Framer Motion             |

## 📂 Project Structure

The repository is organized into two main folders, decoupling the backend from the frontend.

```
emotion-classifier/
├── 📂 backend/
│   ├── 📂 fine_tuned_model/   # The fine-tuned model is downloaded here
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
git clone https://github.com/matiasrodriguezc/emotionAI.git
cd emotionAI
```

### 2\. Set up the Backend

**Important\!** The backend requires the fine-tuned model to run. Since the model files are too large for this GitHub repository, you'll need to download them from the Hugging Face Hub.

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
pip3 install -r requirements.txt
```

**Now, download the model from Hugging Face:**
The easiest way is to create a small Python script. Create a file named `download_model.py` inside the `backend/` folder and paste the following content:

```python
# backend/download_model.py
from huggingface_hub import snapshot_download

# The ID of your model on the Hub
repo_id = "matiasrodriguezc/xlnet-emotion-classifier-es"

print(f"Downloading model '{repo_id}' from Hugging Face Hub...")

# Downloads the files and saves them to a local folder named 'fine_tuned_model'
snapshot_download(
    repo_id=repo_id,
    local_dir="fine_tuned_model",
    local_dir_use_symlinks=False # Recommended for compatibility
)

print("Model downloaded successfully to the 'fine_tuned_model' folder!")
```

Now, run this script from your terminal (make sure you are in the `backend` folder with the `venv` activated):

```bash
python3 download_model.py
```

This will create the `fine_tuned_model` folder with all the necessary files.

### 3\. Set up the Frontend

Open a **new terminal window** (leave the backend terminal open) and run:

```bash
# Navigate to the frontend folder from the project root
cd frontend

# Install the JavaScript dependencies
# (Use pnpm install if you have pnpm, as suggested by the project setup)
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
python3 -m uvicorn main:app --reload
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

  * **Frontend (Next.js):** This project is ready to be deployed to **Vercel**. Simply connect your GitHub repository to Vercel and set the "Root Directory" to `frontend` in the project settings.
  * **Backend (FastAPI):** For deploying the Python API, platforms like **Render** are recommended. When deploying, set the "Root Directory" to `backend`. Once the backend is deployed, remember to update the `NEXT_PUBLIC_API_URL` environment variable in your Vercel project with the public URL of your new API.

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

The training script expects the data to be in a folder named `emotions_data` with the following files:

  * `emotion-labels-train.csv`
  * `emotion-labels-test.csv`
  * `emotion-labels-val.csv`

\</details\>
