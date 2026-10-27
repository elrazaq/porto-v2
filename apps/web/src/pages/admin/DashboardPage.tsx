import { useState } from 'react'
import { AdminLayout, type AdminTab } from '../../components/admin/AdminLayout'
import { ProjectsManager } from '../../components/admin/ProjectsManager'
import { ExperiencesManager } from '../../components/admin/ExperiencesManager'
import { SkillsManager } from '../../components/admin/SkillsManager'
import { InquiriesManager } from '../../components/admin/InquiriesManager'

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('projects')
  const [unreadInquiriesCount, setUnreadInquiriesCount] = useState(0)

  return (
    <AdminLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      unreadInquiriesCount={unreadInquiriesCount}
    >
      {activeTab === 'projects' && <ProjectsManager />}
      {activeTab === 'experiences' && <ExperiencesManager />}
      {activeTab === 'skills' && <SkillsManager />}
      {activeTab === 'inquiries' && (
        <InquiriesManager onUnreadCountChange={setUnreadInquiriesCount} />
      )}
    </AdminLayout>
  )
}
