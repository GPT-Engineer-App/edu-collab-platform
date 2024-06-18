import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProjectDashboard from "./pages/ProjectDashboard.jsx";
import CourseManagement from "./pages/CourseManagement.jsx";
import TaskManagement from "./pages/TaskManagement.jsx";
import ContentEditor from "./pages/ContentEditor.jsx";
import KanbanBoard from "./pages/KanbanBoard.jsx";
import MediaLibrary from "./components/MediaLibrary.jsx";
import Notifications from "./pages/Notifications.jsx";
import KnowledgeBase from "./pages/KnowledgeBase.jsx";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/course-management" element={<CourseManagement />} />
              <Route path="/project-dashboard" element={<ProjectDashboard />} />
              <Route path="/task-management" element={<TaskManagement />} />
              <Route path="/content-editor" element={<ContentEditor />} />
              <Route path="/kanban-board" element={<KanbanBoard />} />
              <Route path="/media-library" element={<MediaLibrary />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/knowledge-base" element={<KnowledgeBase />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;