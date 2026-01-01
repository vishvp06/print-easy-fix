# PrintEasy (XerService) 🖨️

PrintEasy is a premium, full-stack web application designed to simplify the process of finding local xerox shops and getting documents printed. With a modern AI-driven interface, users can upload documents, customize print settings, and pay securely via Razorpay.

---

## 🚀 Features

- **Store Discovery**: Real-time discovery of nearby xerox shops with distance, rating, and status indicators.
- **Smart Upload**: Drag-and-drop support for PDFs and Images with instant backend synchronization.
- **Granular Configuration**: Apply global or per-file print settings (Color/BW, Duplex, Paper Size, etc.).
- **Secure Payments**: Integrated Razorpay gateway for seamless transactions.
- **Privacy First**: Automatic 16-hour TTL (Time-To-Live) for all uploaded documents.
- **Premium UI**: Dark-mode enabled, glassmorphic design built with Tailwind CSS and Shadcn UI.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: JavaScript (ES6+)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+)
- **Database**: [SQLite](https://www.sqlite.org/) (File storage as `BLOB`)
- **ORM**: [SQLAlchemy](https://www.sqlalchemy.org/)
- **Payment Gateway**: [Razorpay SDK](https://razorpay.com/docs/payments/server-integration/python/install/)
- **Task Scheduling**: Python threading for auto-cleanup.

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- Razorpay API Keys ([Get them here](https://dashboard.razorpay.com/app/keys))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vishvp06/print-easy-fix.git
   cd print-easy-fix
   ```

2. **Frontend Setup**
   ```bash
   npm install
   npm run dev
   ```
   The frontend will be available at `http://localhost:8080`.

3. **Backend Setup**
   ```bash
   cd backend
   # Recommended: Create a virtual environment
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   
   pip install -r requirements.txt
   python main.py
   ```
   The API will be available at `http://localhost:8000`.
   API documentation (Swagger) will be at `http://localhost:8000/docs`.

### Configuration
Create a `.env` file in the `backend/` directory:
```env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

---

## 🛡 Security & Privacy
- **End-to-End Encryption**: Documents are encrypted during transit.
- **Transient Storage**: Files are stored in a local SQLite BLOB and are automatically purged 16 hours after upload by a dedicated background worker.

---

## 📁 Project Structure
```
print-easy-fix/
├── app/                    # Next.js app directory
│   ├── page.js            # Homepage
│   ├── shops/             # Shops listing page
│   ├── upload/            # File upload page
│   ├── about/             # About page
│   └── enterprise/        # Enterprise page
├── components/            # React components
│   ├── ui/               # UI components (Button, etc.)
│   ├── layout/           # Layout components
│   ├── home/             # Home page components
│   └── upload/           # Upload page components
├── lib/                  # Utility functions
│   ├── api.js           # API client
│   ├── utils.js         # Helper functions
│   └── razorpay.js      # Razorpay utilities
├── backend/              # FastAPI backend
│   ├── main.py          # FastAPI app
│   ├── models.py        # Database models
│   ├── crud.py          # Database operations
│   ├── schemas.py       # Pydantic schemas
│   ├── payments.py      # Razorpay integration
│   └── tasks.py         # Background tasks
└── public/              # Static assets
```

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License
Internal use only. Copyright © 2026 PrintEasy.
