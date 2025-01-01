import { 
  HomeLayout, 
  Landing, 
  ErrorPage,
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
import { loader as adminDashboardLoader } from './pages/AdminDashboard'
import { loader as registerLoader } from './pages/Register'
import { loader as loginLoader } from './pages/Login'
import { loader as homeLayoutLoader } from './pages/HomeLayout'
import { loader as loaderProfilePage } from './pages/ProfilePage'

import { action as landingAction } from './pages/Landing';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as profileAction } from './pages/ProfilePage'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeLayout />,
      loader: homeLayoutLoader,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Landing />,
          action: landingAction
        },
        {
          path: 'login',
          element: <Login />,
          action: loginAction,
          loader: loginLoader
        },
        {
          path: 'register',
          element: <Register />,
          loader: registerLoader,
          action: registerAction,
        },
      ],
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      loader: dashboardLayoutLoader,
      errorElement: <ErrorPage />,
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
          loader: loaderProfilePage,
          action: profileAction,
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
      loader: adminDashboardLoader,
      errorElement: <ErrorPage />,
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
