import { Toaster } from "react-hot-toast";

import { Spotify } from "./components/Spotify";
import { Navbar } from "./components/Navbar";
import { Pomodoro } from "./components/Pomodoro";
import { TodoList } from "./components/TodoList";
import { ModalOptions } from "./components/ModalOptions";
import { BackgroundColorProvider } from "./providers/BackgroundColorProvider";

import "./App.css";
import { ProgressComponent } from "./components/ProgressComponent";

function App() {
  return (
    <main>
      <Toaster />
      <BackgroundColorProvider>
        <ModalOptions />
        <div className="max-w-lg md:max-w-3xl mx-auto space-y-5">
          <Navbar />
          <ProgressComponent />
          <Pomodoro />
          {/* <Spotify /> */}
          <TodoList />
        </div>
      </BackgroundColorProvider>
    </main>
  );
}

export default App;
