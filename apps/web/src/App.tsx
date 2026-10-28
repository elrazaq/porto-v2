import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { HackerBootLoader } from './components/HackerBootLoader'
import { AuthProvider } from './contexts/AuthContext'
import { DashboardPage } from './pages/admin/DashboardPage'
import { LoginPage } from './pages/admin/LoginPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'

export default function App() {
  return (
    <AuthProvider>
      <HackerBootLoader />
      <BrowserRouter>
        <Routes>
          {/* Public One-Page Portfolio */}
          <Route path="/" element={<HomePage />} />

          {/* Standalone Project Detail Page */}
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />

          {/* Admin Authentication & CMS */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
