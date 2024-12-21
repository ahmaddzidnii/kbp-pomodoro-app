import { Toaster } from "react-hot-toast";

import { Navbar } from "./components/Navbar";
import { Spotify } from "./components/Spotify";
import { TodoList } from "./components/TodoList";
import { Pomodoro } from "./components/Pomodoro";
import { BackgroundColorProvider } from "./providers/BackgroundColorProvider";

import "./App.css";

function App() {
  console.log("main render");
  return (
    <main>
      <Toaster />
      <BackgroundColorProvider>
        <div className="max-w-lg md:max-w-3xl mx-auto space-y-5">
          <Navbar />
          <Pomodoro />
          {/* <Spotify /> */}
          <TodoList />
        </div>
      </BackgroundColorProvider>
    </main>
  );
}

export default App;
