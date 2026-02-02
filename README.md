# CSE Department Standalone Page

This is a standalone, runnable Vite + React + TypeScript project that displays only the CSE Department page.

## Features

- ✅ Displays the complete CSE Department page
- ✅ No Navbar/Header/Footer (only the department content)
- ✅ Fully standalone and portable
- ✅ All dependencies included in package.json
- ✅ All required assets and data files included

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start on `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
department-cse-standalone/
├── public/                 # Static assets (images, PDFs, etc.)
├── src/
│   ├── components/         # React components
│   │   ├── layout/        # Layout components
│   │   └── navigation/    # Navigation components
│   ├── data/              # JSON data files
│   │   └── labs/          # Lab-specific data
│   ├── pages/             # Page components
│   ├── App.tsx            # Main app component (renders DepartmentPage only)
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles with Tailwind
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── postcss.config.js      # PostCSS configuration
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router DOM** - Routing (used internally by components)
- **Lucide React** - Icon library
- **React Helmet Async** - Document head management

## Notes

- This project is completely standalone and can be moved to any location
- All imports use relative paths within the project
- The `public/` folder contains all required images and assets
- The department is hardcoded to "cse" in the DepartmentPage component
