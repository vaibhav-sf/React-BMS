# 📚 Book Management System (React-BMS)

A modern, responsive, and robust **Book Management System** built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Vitest + React Testing Library**.

---

## 🌟 Features

- 📖 **Book Management**: Create, view, edit, and delete books seamlessly.
- 🔍 **Filtering & Search**: Live search by title/author and filter by genre.
- ⚡ **React Context State**: Global management of book records with pre-loaded sample data.
- 🛡️ **Form Validation**: Full field validation (required inputs, unique ISBN validation, publication date constraints).
- 🧪 **Comprehensive Test Suite**: Unit tests covering components, forms, validation logic, and state handling.
- 🚀 **Automated CI/CD**: GitHub Actions workflow for continuous integration and deployment to GitHub Pages.

---

## 🏗️ Architecture & Project Structure

The codebase adheres to React best practices, modular organization, and strict TypeScript typing:

```text
src/
├── components/          # Reusable UI Components
│   ├── BookCard.tsx     # Book card display with action handlers
│   ├── BookForm.tsx     # Validated form for adding & editing books
│   ├── BookForm.test.tsx# Unit tests for form interactions & validations
│   ├── BookList.tsx     # List component for rendering filtered books
│   ├── BookList.test.tsx# Unit tests for BookList rendering & empty state
│   ├── ConfirmModal.tsx # Delete confirmation modal dialog
│   ├── GenreFilter.tsx  # Genre dropdown filter
│   ├── Navbar.tsx       # Top navigation header
│   └── SearchBar.tsx    # Live search input component
├── context/             # Global Application State
│   └── BookContext.tsx  # React Context Provider managing books state
├── layouts/             # Layout wrappers
│   └── MainLayout.tsx   # Shell layout with Header & Main content container
├── pages/               # Application Views / Pages
│   ├── Books.tsx        # All Books listing view with filter & search
│   ├── Dashboard.tsx    # Dashboard metrics & summary widgets
│   ├── AddBook.tsx      # Add New Book page wrapper
│   ├── EditBook.tsx     # Edit Book page wrapper
│   ├── BookDetails.tsx  # Individual Book details view
│   └── NotFound.tsx     # 404 Error page
├── router.tsx           # React Router configuration
├── types/               # TypeScript Definitions
│   └── book.ts          # Book data interfaces & schema definitions
└── test/                # Test utilities & environment setup
    ├── ReactTest.test.tsx
    └── setup.ts         # Testing Library cleanup & matcher extensions
```

---

## 🧪 Testing & Best Practices

### Testing Setup
- **Framework**: [Vitest](https://vitest.dev/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) & `jsdom`.
- **Globals**: `describe`, `test`, `expect`, `vi` enabled via `vitest/globals`.

### Test Coverage Highlights
- **`BookList.test.tsx`**:
  - Tests rendering of book cards with sample data.
  - Verifies empty state fallback when no books exist.
  - Tests custom `books` prop override for filtered search results.
- **`BookForm.test.tsx`**:
  - Validates required form fields submission and callback triggering.
  - Tests automatic form reset after successful creation.
  - Verifies error message triggers for duplicate ISBN entries.
  - Verifies error message triggers for future publication dates.

### How to Run Tests
```bash
# Run tests synchronously once
npm run test:run

# Run Vitest in watch mode
npm run test

# Run tests with UI interface
npm run test:ui

# Generate test coverage report
npm run coverage
```

---

## 🛠️ Best Practices Implemented

1. **Consistent Naming & Folder Conventions**: PascalCase for React components (`BookForm.tsx`), camelCase for helpers and context hooks (`useBooks`).
2. **Type Safety**: Strict TypeScript interfaces defined under `src/types/book.ts`.
3. **Performance Optimization**: Lazy routing, memoized components, and minimal rerenders.
4. **Accessible UI**: Form labels properly connected (`htmlFor`), ARIA attributes, semantic HTML elements.

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/your-username/React-BMS.git

# 2. Navigate to project directory
cd React-BMS

# 3. Install dependencies
npm install

# 4. Start local dev server
npm run dev
```

---

## 🌐 Deploying to GitHub Pages

### Automatic Deployment (GitHub Actions)
A GitHub Actions workflow is set up in `.github/workflows/deploy.yml`. Pushing changes to `main` automatically runs tests, compiles the production build, and deploys the site to GitHub Pages.

### Manual Deployment via CLI
```bash
npm run deploy
```
*(This triggers `npm run build` and publishes the `dist` directory to the `gh-pages` branch).*

---

## 📜 License
This project is open-source under the MIT License.
