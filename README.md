# PEC Papers 📚

A modern platform for PEC students to access and share previous year question papers.

## 🌟 Features

- **Easy Paper Search**: Find papers by department, semester, subject, and exam type
- **Quick Upload**: Share papers with your fellow students in just a few clicks
- **Clean Interface**: Modern, responsive design for the best user experience
- **Secure Access**: Protected by Clerk authentication
- **Cloud Storage**: Papers stored securely on Cloudinary

## 🚀 Tech Stack

- **Frontend**: React + Vite
- **UI Framework**: Material-UI + Tailwind CSS
- **Animations**: Framer Motion
- **Authentication**: Clerk
- **Storage**: Cloudinary
- **Backend**: FastAPI + Firebase

## 🛠️ Setup & Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd frontend && npm install
   cd ../backend && pip install -r requirements.txt
   ```
3. Set up environment variables:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
   VITE_APP_CLOUDINARY_URL=your_cloudinary_url
   VITE_APP_UPLOAD_PRESET=your_upload_preset
   VITE_APP_CLOUD_NAME=your_cloud_name
   VITE_BACKEND_URL=your_backend_url
   ```

4. Start the development servers:
   ```bash
   # Frontend
   cd frontend && npm run dev

   # Backend
   cd backend && uvicorn app.main:app --reload
   ```

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- PEC-CSS Repository
- PEC Old Papers Community
- All the students who contribute papers

## 📬 Contact

For any queries or suggestions, please open an issue or contact the maintainers.

---
Made with ❤️ for PEC Students