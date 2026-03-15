# 🚀 Taskify – Angular 19 Reactive Task Manager

Taskify is a **modern task management application** built with **Angular 19**.

The project explores modern Angular patterns, combining:

- Signals for reactive state

- RxJS streams for controlled state mutations

- Zod schemas for runtime validation

The goal is to build a clean, scalable CRUD architecture while experimenting with the latest Angular ecosystem features.

## 🌐 Live Demo

`https://taskify-demo.vercel.app`

## 📸 Preview

Add screenshots here once deployed.
```
/docs/screenshot-light.png
/docs/screenshot-dark.png
```
### Example:

`![Taskify UI](docs/screenshot-light.png)`

## ⚙️ Tech Stack

Core technologies used in this project:

- Angular 19

- RxJS

- Zod

- Angular Signals

- Angular Forms

- Local Storage API

- SCSS architecture

- Express (SSR-ready setup)

- Lucide icons via lucide-angular

## ✨ Features

### Taskify includes:

- CRUD Operations

    - Create tasks

    - Delete tasks

    - Display task list

- Reactive UI

- Powered by Angular Signals — UI updates automatically when the state changes.

### RxJS Mutation Pipeline

State updates are handled using a stream-based mutation pattern.
```ts
mutation$ → scan() → signal state → UI
```
This keeps state transitions predictable and testable.

### Schema Validation

Tasks are validated using **Zod schemas**, which also generate **TypeScript types**.

### Persistent Storage

Tasks are stored in **localStorage**, so they persist after page reload.

### Reusable UI Components

**Custom directives** and components provide a modular UI system.

## 🧠 Architecture Overview

The application follows a separation-of-concerns architecture.
```bash
Components
    ↓
Services (business logic)
    ↓
Signals (state)
    ↓
RxJS Streams (mutations)
    ↓
Local Storage
```
### Key principles:

- UI components remain stateless

- services handle data mutations

- signals represent application state

## 🧩 Project Structure
```bash
src/
│
├── app/
│
│ ├── components/
│ │ ├── navbar/
│ │ ├── todo-input/
│ │ ├── todo-list/
│ │ └── button/
│ │
│ ├── directives/
│ │ └── card.directive.ts
│ │
│ ├── services/
│ │ └── tasks.service.ts
│ │
│ ├── models/
│ │ └── tasks.model.ts
│ │
│ ├── app.component.ts
│ ├── app.routes.ts
│
├── assets/
├── styles/
```
## 🛠️ Installation

Clone the repository:
```bash
git clone https://github.com/your-username/taskify.git
cd taskify
```
Install dependencies:
```bash
npm install
```
Run the development server:
```bash
npm start
```
Open:
```bash
http://localhost:4200
```
## 🏗️ Build for Production

To create an optimized production build with Angular:
```bash
ng build
```
Angular will generate an optimized bundle inside:
```bash
dist/
```
This build includes:

- code minification

- tree-shaking

- optimized bundles

- production configuration

## 🧪 Testing the Production Build Locally

You can serve the production build using **serve**:
```bash
npx serve dist/taskify/browser
```
This simulates how the application behaves in production.

## 🚀 Deployment

The application can be deployed as a static SPA on platforms such as:

- Vercel

- Netlify

- Cloudflare

### Typical deployment steps:

1️⃣ Build the project
```bash
ng build
```
2️⃣ Upload the dist folder
```bash
dist/taskify/browser
```
3️⃣ Configure SPA routing if needed.

After deployment the app will be accessible via a public URL.

## 📦 Data Model

Task structure defined using Zod schemas:
```bash
Todo
 ├─ id: number
 ├─ title: string
 ├─ completed: boolean
 ├─ priority: low | medium | high
 ├─ category: string
 ├─ dueDate: Date | null
 ├─ createdAt: Date
 └─ tags: string[]
```
Both validation and TypeScript types are derived from the same schema.

## 🔮 Future Improvements

Planned improvements include:

- Advanced filtering with RxJS streams

- UI animations

- Backend integration with

    - Node.js

    - Express

    - MongoDB

- Authentication and user accounts

- CI/CD pipeline integration

- Testing (unit testing and e2e testing)

## 👨‍💻 Author

Created by Elia as a learning and professional growth project.

## 📜 License

MIT License.