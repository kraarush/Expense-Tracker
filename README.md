# 💸 Expensio

🔗 **Live Demo**: [Expensio Website](https://exprensio.netlify.app/)

🧪 **Demo Credentials**:

* **Email**: aarushkumar8585@gmail.com
* **Password**: aarushAa@

Expensio is a **full-stack expense management application** developed using the **MERN stack**. It empowers users to track their incomes, expenses, and visualize spending patterns with interactive charts. Built with modern UI using **ShadCN** and **TailwindCSS**, Expensio is simple, secure, and user-friendly.


## 💡 Key Highlights

- 📊 **Dashboard**: Insightful visual charts and summary cards for income, expenses, and balance.
- ✍️ **Expense CRUD**: Add, edit, or delete expenses with real-time UI updates.
- 🔍 **Data Visualizations**: Bar and pie charts to analyze spending patterns.
- 📅 **Date Picker**: Record expenses by accurate transaction date.
- 🔐 **Authentication**: Secure login with JWT & cookies
- 🌐 **Responsive Design**: Seamless user experience across devices.



## 📌 Features

- 🧾 Add / Edit / Delete Expense Entries
- 📅 View Recent Transactions
- 📊 Expenses Charts
- 🔒 JWT-Based Auth System
- 🛠️ Redux-Powered Global State
- 🚀 Form Validation & Toast Feedback
- 🖥️ Mobile-Friendly Sidebar & Navigation



## 🛠️ Technologies Used

### 🎨 **Frontend**

* ⚛️ React (Vite)
* 🧠 Redux Toolkit (State Management)
* 💅 Tailwind CSS (Styling)
* 🚦 React Router DOM (Routing)
* 🧩 ShadCN UI
* 🎨 Lucide React & React Icons (Icons)
* 🍞 Sonner (Toast Notifications)

### 🏗️ **Backend**

* 🟢 Node.js + Express.js
* 🗃️ MongoDB (Atlas)
* 🔐 JWT & Cookies *(for future auth)*
* 🔏 Validator (Input Validation)

### 🔧 **Utilities & Tools**

* 🧪 Postman (API Testing)
* 🔗 Git & GitHub (Version Control)




## 🗂️ Project Structure

```
Expensio/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── shared/
│   │   │   ├── ui/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── public/
├── .env
├── README.md
└── package.json
```


## 🏗️ Setup & Installation

1. 📥 Clone the repository:

   ```bash
   git clone https://github.com/kraarush/Expense-Tracker.git
   ```

2. 📂 Navigate into project:

   ```bash
   cd Expense-Tracker
   ```

3. 🔧 Setup Backend:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. 💻 Setup Frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```


## 🔐 Environment Variables

Create a `.env` file in the backend folder with:

```
PORT=3000
DB_URL=your_mongodb_uri
SECRET_KEY=your_secret
NODE_ENV=development
```

Create a `.env` file in the frontend folder with:

```
VITE_BACKEND_URL=http://localhost:3000/api/v1
```

## 📈 Future Improvements

* 🔐 google OAuth integration
* 🐳 Docker Compose full stack deployment



## 🤝 Contribution

Have a suggestion or bug fix? Feel free to open issues or submit pull requests. Every contribution is welcome!

