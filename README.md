# PrintEasy (XerService) 🖨️

PrintEasy is a premium, full-stack web application designed to simplify the process of finding local xerox shops and getting documents printed. With a modern AI-driven interface, users can upload documents, customize print settings, and pay securely via Razorpay.

---

## 🚀 Features

- **Store Discovery**: Real-time discovery of nearby xerox shops with distance, rating, and status indicators.
- **Smart Upload**: Drag-and-drop support for PDFs and Images with instant backend synchronization.
- **Granular Configuration**: Apply global or per-file print settings (Color/BW, Duplex, Paper Size, etc.).
- **Secure Payments**: Integrated Razorpay gateway for seamless transactions.
- **Privacy First**: Automatic 16-hour TTL (Time-To-Live) for all uploaded documents.
- **Premium UI**: Dark-mode enabled, glassmorphic design built with Framer Motion and Shadcn UI.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

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

3. **Backend Setup**
   ```bash
   cd backend
   # Recommended: Create a virtual environment
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   
   pip install -r requirements.txt
   ```

### Configuration
Create a `.env` file in the `backend/` directory:
```env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

### Running the Application
1. Start the backend:
   ```bash
   cd backend
   python main.py
   ```
2. The frontend will be available at `http://localhost:8080`.
3. The API documentation (Swagger) will be available at `http://localhost:8000/docs`.

---

## 🛡 Security & Privacy
- **End-to-End Encryption**: Documents are encrypted during transit.
- **Transient Storage**: Files are stored in a local SQLite BLOB and are automatically purged 16 hours after upload by a dedicated background worker.

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License
Internal use only. Copyright © 2025 PrintEasy.
