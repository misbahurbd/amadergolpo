import getCurrentUser from '@/actions/getCurrentUser'
import DesktopSidebar from './desktop-sidebar'
import MobileFooter from './mobile-footer'

const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser()

  return (
    <div className="h-full lg:pl-20">
      <DesktopSidebar
        currentUser={currentUser}
        data-superjson
      />
      <MobileFooter />
      {children}
    </div>
  )
}

export default Sidebar
