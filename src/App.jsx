import "./App.css";

import { Navbar } from "./components/Navbar";
import { Pomodoro } from "./components/Pomodoro";
import { TodoList } from "./components/TodoList";
import { BackgroundColorProvider } from "./providers/BackgroundColorProvider";

function App() {
  console.log("main render");
  return (
    <main>
      <BackgroundColorProvider>
        <div className="max-w-lg mx-auto space-y-5">
          <Navbar />
          <Pomodoro />
          <TodoList />
        </div>
      </BackgroundColorProvider>
    </main>
  );
}

export default App;
