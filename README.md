# ExpenseTracker

A modern web application for tracking personal expenses and managing budgets efficiently. Try it out at [ExpenseTracker](https://expenses-track-five.vercel.app/login/)

## Features

### 💰 Core Features
- **User Authentication**
  - Email/Password registration and login
  - Social login options (Google, Apple, GitHub)
  - Secure session management

- **Expense Management**
  - Add and track expenses
  - Categorize expenses (Food, Transport, Bills, etc.)
  - Add descriptions and dates
  - View expense history

- **Financial Tasks**
  - Create and manage financial tasks
  - Set priorities and due dates
  - Track task status
  - Budget allocation for tasks

- **Dashboard Analytics**
  - Visual expense breakdowns
  - Category-wise spending analysis
  - Real-time financial insights
  - Budget tracking

### 🎨 UI/UX Features
- Modern, clean interface
- Responsive design for all devices
- Interactive charts and visualizations
- User-friendly navigation
- Toast notifications for actions

## Technology Stack

- **Frontend**
  - Next.js 13+ (App Router)
  - TypeScript
  - Tailwind CSS
  - React Context for state management

- **Authentication**
  - Custom authentication system
  - JWT tokens
  - Secure password handling

- **Storage**
  - Local Storage for data persistence
  - Cookie-based session management

- **Deployment**
  - Vercel hosting
  - Continuous deployment with GitHub Actions

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tishrash/expensesTrack.git
   cd expensesTrack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Start the production server**
   ```bash
   npm start
   ```

## Demo Account

You can try the application using the demo account:
- Email: tishanrashmika00@gmail.com
- Password: Tishan@123

## Project Structure

```
src/
├── app/                    # Next.js 13 app directory
│   ├── add-expense/       # Add expense page
│   ├── dashboard/         # Dashboard page
│   ├── financial-tasks/   # Financial tasks page
│   ├── history/          # Expense history page
│   ├── login/            # Login page
│   └── signup/           # Signup page
├── components/            # Reusable components
├── contexts/             # React contexts
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

© 2025 ExpenseTracker. All rights reserved.

## Live Demo

Visit [https://expenses-track-five.vercel.app/login/](https://expenses-track-five.vercel.app/login/) to try out the application. 
