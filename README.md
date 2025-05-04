# Image Reactions App

A simple React Native app with a backend service that lets users react to images (e.g., ❤️, 🔥, 👏, 🤩). Reactions are stored and fetched via a REST API, and the frontend uses React Query for data fetching, caching, and optimistic updates.

## Prerequisites

- Node.js v16+
- npm or yarn
- Expo CLI installed globally (if using Expo)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nawzneen/ImgReaction.git
   cd ImgReaction
   ```

2. **Install dependencies**

   ```bash
   # using npm
   npm install

   # or using yarn
   yarn install
   ```

## Configuration

- The frontend expects the backend API to run at `http://localhost:3000`. you can update the `baseURL` in `api/reactions.ts`.

## Running the Project

### 1. Start the backend via Docker

The docker image has not been included for security reasons.

This will launch the API on `http://localhost:3000`.

### 2. Start the React Native app

```bash
# from the project root
yarn start
# or
npm start
```

- Use the Expo Go app on your phone or an emulator to load the project.

## Directory Structure

```
├── server/             # Backend API (Express or similar)
├── src/                # React Native frontend
│   ├── api/            # Axios API client for reactions
│   ├── components/     # UI components (AuthPanel, ImageCard)
│   ├── hooks/          # React Query hooks (useReactions)
│   └── constants/      # Static data (image list)
└── README.md           # This file
```

## Key Features

- **Optimistic UI**: Immediate feedback when adding/removing reactions
- **React Query**: Caching, background refetching, and mutation handling
- **Modular API client**: Centralized axios setup and type-safe helpers

---
