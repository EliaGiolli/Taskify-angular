# ✅ Taskify – Angular 19 CRUD App

**Taskify** is a modern and reactive task management app built with **Angular 19**.  
It’s designed as a hands-on project to strengthen skills in **CRUD operations**, **Angular Services**, **Signals**, and **Local Storage**, while keeping the architecture clean and scalable.

---

## ⚙️ Tech Stack

- **Angular 19** – modular, component-driven, and reactive  
- **Angular Signals** – reactive state management and automatic DOM updates  
- **Local Storage API** – persistent client-side data  
- **Angular Services** – centralized logic for CRUD operations  
- **Font Awesome Icons** – lightweight, elegant icons  
- **Sass (SCSS)** – modern and maintainable styling  
- **Express (SSR ready)** – configured for future server-side rendering support  

---

## 🚀 Core Features

- ✏️ **Create, edit, delete, and display** todos  
- 💾 **Persistent data** with `localStorage` (survives page reloads)  
- ⚡ **Reactive UI** powered by Angular Signals  
- 🧠 **Service-based CRUD logic**, separating business logic from UI components  
- 🎨 **Clean and accessible UI** with modern SCSS design  

---

## 🧩 Project Structure

```bash
src/
│
├── app/
│ ├── components/
│ │ ├── navbar/
│ │ ├── todo-input/
│ │ ├── todo-list/
│ │ └── ...
│ ├── services/
│ │ └── todo.service.ts
│ ├── models/
│ │ └── todo.model.ts
│ ├── app.component.ts
│ ├── app.routes.ts
│ └── ...
│
├── assets/
└── styles/
```

---

## 🛠️ Setup & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/taskify.git
   cd taskify
   ```
2. **Install dependencies**
  ```bash
  npm install
  Run the development server
  ```

3. **Start the development server**

```bash
npm start
```
Then open http://localhost:4200 in your browser.

## 🧠 Key Concepts
### Signals
Taskify leverages Angular Signals to keep the UI automatically in sync with the app state.
Whenever a todo is created, edited, or removed, the signal updates all dependent components instantly — no need for EventEmitter or @Output.

### Services
All CRUD logic lives inside the TodoService, which:

- handles read/write operations to localStorage

- exposes reactive signals to manage state

- keeps the app logic decoupled from the components

## 🌗 Future Improvements
- Light & Dark theme management using Dependency Injection (DI) for scalable state handling

- RxJS integration for advanced reactive patterns (e.g., async updates, filters, or external API sync)

- Enhanced UI/UX design with animations and accessibility improvements

- Possible backend integration using Node.js, Express, and MongoDB

## 🧑‍💻 Available Scripts

Command	Description
- `npm start`:	Starts the development server
- `npm run build`:	Builds the project for production
- `npm run watch`:	Watches for file changes and rebuilds automatically
- `npm run serve:ssr:angular-demo`:	Runs the app in Server-Side Rendering mode

## 📜 License
Distributed under the MIT License.
Created by Elia as a learning and professional growth project.

