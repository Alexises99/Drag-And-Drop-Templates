# 🖥️ Technical Test - Inditex Templates

This project is a technical assessment for Inditex, built using **React** and **TypeScript** with **Vite**.

## 🎯 Objective

The goal is to build a template builder application with the following features:

- Display a list of rows, each containing a **name**, a **template aligment**, and **1 to 3 products**.
- Allow **reordering of rows**.
- Enable **drag-and-drop functionality** for moving products within a row and between different rows.
- **Create new products** and add products to existing rows.
- **Delete products** from rows.
- **Zoom feature** in the template area.

This application is designed with usability, performance, and scalability in mind. 🚀

## 🛠️ Technologies Used

- [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/) **v19**
- [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
- [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
- [![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
- [![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
- [![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)](https://storybook.js.org/)

### Why Vite?

Vite was chosen as the **best option** for this project because it offers:

- ✅ **Fast build times** due to native **ES module support**.
- ✅ **Flexibility**—since this application does not benefit from **React Server Components** or **traditional Server-Side Rendering (SSR)**, using **Vite** ensures a simpler, more efficient setup with a client-based SPA.

## 📦 Installation

1. Clone the repository:

```sh
git clone https://github.com/Alexises99/Inditex-Templates.git
```

2. Enter in the project:

```sh
cd inditex-templates
```

3. Install dependencies:

```sh
pnpm install
```

4. Start development server:

```sh
pnpm dev
```

## 📂 Project Structure

```bash
/src
  ├── assets        # Static assets (images, icons, etc.)
  ├── components    # Reusable UI components
  ├── context       # Global state management
  ├── hooks         # Custom Hooks
  ├── locales       # Translations (i18n)
  ├── tests         # Test Suites
  ├── utils         # Utility functions and helper methods
  ├── App.tsx       # Root component
  ├── main.tsx      # Entry point
  ├── types.ts      # General types definitions
```

## 🧪 Tests

Run the test suite with:

```sh
pnpm test
```

Generate a test coverage report with:

```sh
pnpm coverage
```

## 📜 Scripts

- **`pnpm dev`** → Starts the development server.
- **`pnpm build`** → Builds the project for production.
- **`pnpm lint`** → Runs ESLint to check for code quality issues.
- **`pnpm preview`** → Serves the production build locally.
- **`pnpm test`** → Runs the test suite.
- **`pnpm coverage`** → Generates a test coverage report.
- **`pnpm storybook`** → Execute Storybook
