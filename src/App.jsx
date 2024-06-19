import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect } from 'react';
import { logDecision } from './services/decisionLogService';
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
import DecisionLogs from "./pages/DecisionLogs.jsx";
import DataManagement from "./pages/DataManagement.jsx";
import UserPersonas from "./pages/UserPersonas.jsx";
import ExperienceMaps from "./pages/ExperienceMaps.jsx";

function App() {
  useEffect(() => {
    logDecision('App component mounted');
  }, []);
  return (
    <Router>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="flex">
        <Sidebar role="navigation" aria-label="Sidebar" />
        <div className="flex flex-col w-full">
          <Header role="banner" />
          <main id="main-content" className="flex-grow" role="main">
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
              <Route path="/decision-logs" element={<DecisionLogs />} />
              <Route path="/data-management" element={<DataManagement />} />
              <Route path="/user-personas" element={<UserPersonas />} />
              <Route path="/experience-maps" element={<ExperienceMaps />} />
            </Routes>
          </main>
          <Footer role="contentinfo" />
        </div>
      </div>
      <style jsx>{`
        .skip-link {
          position: absolute;
          top: -40px;
          left: 0;
          background: #000;
          color: #fff;
          padding: 8px;
          z-index: 100;
        }
        .skip-link:focus {
          top: 0;
        }
        .flex {
          background-color: #fff;
          color: #000;
        }
        .flex a {
          color: #1a73e8;
        }
        .flex a:focus {
          outline: 2px solid #ff0;
        }
      `}</style>
    </Router>
  );
}

export default App;