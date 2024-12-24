import { Toaster } from "react-hot-toast";

import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Spotify } from "./components/Spotify";
import { TodoList } from "./components/TodoList";
import { Pomodoro } from "./components/Pomodoro";
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
        <div className="max-w-lg h-full md:max-w-7xl mx-auto space-y-5">
          <Navbar />
          <ProgressComponent />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            <div className="order-first space-y-5">
              <Pomodoro />
              <Spotify />
            </div>
            <TodoList />
          </div>
          <Motivation />
          <Footer />
        </div>
      </BackgroundColorProvider>
    </main>
  );
}

export default App;
