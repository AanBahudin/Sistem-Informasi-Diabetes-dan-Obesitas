import { 
  HomeLayout, 
  Landing, 
  ErrorPage,
  Login, 
  Register,
  PublicAllNewsPage,
  PublicSingleNewsPage,
  DashboardLayout, 
  NewsPage,
  EditNewsPage,
  SingleNewsPage,
  MessagePage,
  SingleMessagePage,
  ProfilePage,
  BookmarkPage,
  FavoritePage,
  AdminDashboard,
  SingleNewsPageAdmin,
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
import { loader as allArticleLoader } from './pages/AllNews'
import { loader as landingLoader } from './pages/Landing'
import { loader as singleNewsAdminPage } from './pages/SingleNewsPageAdmin'
import { loader as editNewsPageLoader } from './pages/EditNews'
import { loader as publicAllNewsLoader } from './pages/PublicAllNews'
import { loader as publicSingleNewsLoader } from './pages/PublicSinglePage'
import { loader as messageLoader } from './pages/MessagePage'
import { loader as singleMessageLoader } from './pages/SingleMessage'
import { loader as userAllNewsLoader } from './pages/AllNews'
import { loader as userSingleNewsLoader } from './pages/SingleNewsPage'
import { loader as bookmarkPageLoader } from './pages/BookmarkPage'
import { loader as favoritePageLoader } from './pages/FavoritePage'

import { action as landingAction } from './pages/Landing';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as profileAction } from './pages/ProfilePage'
import { action as addNewsAction } from './pages/AddNews'
import { action as allNewsAction } from './pages/AllNews'
import { action as editNewsAction } from './pages/EditNews'
import { action as allNewsUserAction } from './pages/NewsPage'
import { action as bookmarkAction } from './pages/BookmarkPage'
import { action as favoriteAction } from './pages/FavoritePage'
import { action as singleMessageAction } from './pages/SingleMessage'
import { ToastContainer } from 'react-toastify';

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
          action: landingAction,
          loader: landingLoader 
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
        {
          path: 'artikel',
          element: <PublicAllNewsPage />,
          loader: publicAllNewsLoader
        },
        {
          path: 'artikel/:id',
          element: <PublicSingleNewsPage />,
          loader: publicSingleNewsLoader
        }
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
          element: <NewsPage />,
          loader: userAllNewsLoader,
          action: allNewsUserAction
        },
        {
          path: 'news/:id',
          element: <SingleNewsPage />,
          loader: userSingleNewsLoader
        },
        {
          path: 'profile',
          loader: loaderProfilePage,
          action: profileAction,
          element: <ProfilePage />
        },
        {
          path: 'bookmark',
          element: <BookmarkPage />,
          loader: bookmarkPageLoader,
          action: bookmarkAction
        },
        {
          path: 'favorite',
          element: <FavoritePage />,
          loader: favoritePageLoader,
          action: favoriteAction
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
          loader: allArticleLoader,
          action: allNewsAction,
          element: <AllNews />
        },
        {
          path: 'news/:id',
          loader: singleNewsAdminPage,
          element: <SingleNewsPageAdmin />
        },
        {
          path: 'news/edit/:id',
          loader: editNewsPageLoader,
          action: editNewsAction,
          element: <EditNewsPage />
        },
        {
          path: 'message',
          element: <MessagePage />,
          loader: messageLoader
        },
        {
          path: 'message/:id',
          element: <SingleMessagePage />,
          loader: singleMessageLoader,
          action: singleMessageAction
        },
        {
          path: 'users',
          element: <AllUsers />
        },
        {
          path: 'create',
          action: addNewsAction,
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
    <>
    <ToastContainer hideProgressBar={true} closeButton={false} />
    <RouterProvider router={router} />
    </>
  )
}

export default App
