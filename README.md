# Bonsai App

A mobile application for tracking meals and workouts with AI-powered meal recognition.

## 🚀 Features

- 📸 AI-powered meal recognition from photos
- 🏋️‍♂️ Quick workout tracking
- 📊 Progress monitoring and analytics
- 🎯 Personalized goals and targets
- 📱 Cross-platform (iOS & Android)

## 🛠 Tech Stack

- **Frontend**: React Native (Expo) + TypeScript
- **Backend**: Python 3.12 + FastAPI
- **Database**: Supabase (PostgreSQL)
- **AI**: DeepSeek-VL2 for meal recognition
- **Auth**: Supabase Auth
- **State**: Zustand + React Query

## 🏗 Project Structure

```
bonsai_app/
├── apps/
│   ├── mobile/     # Expo React Native app
│   └── api/        # FastAPI backend
├── packages/
│   ├── ui/         # Shared UI components
│   ├── config/     # Shared configs
│   └── types/      # TypeScript types
└── infra/          # Infrastructure configs
```

## 🚦 Getting Started

1. **Prerequisites**
   - Node.js 18+
   - pnpm 8+
   - Python 3.12
   - Docker

2. **Installation**
   ```bash
   # Install dependencies
   pnpm install

   # Start development
   pnpm dev
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Fill in required environment variables

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🌳 Branching Strategy

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: New features
- `release/*`: Release preparation
- `hotfix/*`: Production fixes

### Branch Protection Rules

- All branches require pull request reviews
- Status checks must pass before merging
- Branches must be up to date with base branch
- Administrators are included in these rules

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, email [your-email] or open an issue in the repository.