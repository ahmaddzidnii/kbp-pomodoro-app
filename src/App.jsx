import { Toaster } from "react-hot-toast";

import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Spotify } from "./components/Spotify";
import { TodoList } from "./components/TodoList";
import { Pomodoro } from "./components/Pomodoro";
import { ModalStats } from "./components/ModalStats";
import { Motivation } from "./components/Motivation";
import { ModalOptions } from "./components/ModalOptions";
import { ProgressComponent } from "./components/ProgressComponent";
import { BackgroundColorProvider } from "./providers/BackgroundColorProvider";

import "./App.css";

function App() {
  return (
    <main>
      <Toaster />
      <BackgroundColorProvider>
        <ModalOptions />
        <ModalStats />
        <div className="mx-auto min-h-screen max-w-lg md:max-w-7xl">
          <Navbar />
          <ProgressComponent />
          <div className="grid w-full grid-cols-1 gap-5 sm:px-2 md:grid-cols-2">
            <div className="order-first space-y-5">
              <Pomodoro />
              <Spotify />
            </div>
            <div>
              <TodoList />
              <Motivation />
            </div>
          </div>
        </div>
        <Footer />
      </BackgroundColorProvider>
    </main>
  );
}

export default App;
