import { 
  HomeLayout, 
  Landing, 
  Error, 
  Login, 
  Register, 
  DashboardLayout, 
  NewsPage, 
  SingleNewsPage,
  ProfilePage,
  BookmarkPage,
  FavoritePage,
  AdminDashboard,
  AllNews,
  AllUsers,
  AddNews } from './pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { loader as dashboardLayoutLoader } from './pages/DashboardLayout'

import { action as landingAction } from './pages/Landing';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
          action: landingAction
        },
        {
          path: 'login',
          element: <Login />,
          action: loginAction
        },
        {
          path: 'register',
          element: <Register />,
          action: registerAction
        },
      ],
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      loader: dashboardLayoutLoader,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <NewsPage />
        },
        {
          path: 'news/:id',
          element: <SingleNewsPage />
        },
        {
          path: 'profile',
          element: <ProfilePage />
        },
        {
          path: 'bookmark',
          element: <BookmarkPage />
        },
        {
          path: 'favorite',
          element: <FavoritePage />
        }
      ]
    },
    {
      path: '/admin/dashboard',
      element: <AdminDashboard />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <AllNews />
        },
        {
          path: 'users',
          element: <AllUsers />
        },
        {
          path: 'create',
          element: <AddNews />
        },
        {
          path: 'news/:id',
          element: <SingleNewsPage />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
    // <TextEditor />
  )
}

export default App
