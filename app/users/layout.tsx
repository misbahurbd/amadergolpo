import getUsers from '@/actions/getUsers'
import Sidebar from '@/components/sidebar'
import UserList from '@/components/user-list'

const UsersLayout = async ({ children }: { children: React.ReactNode }) => {
  const users = await getUsers()
  return (
    <Sidebar>
      <UserList items={users} />
      <main className="h-full">{children}</main>
    </Sidebar>
  )
}

export default UsersLayout
