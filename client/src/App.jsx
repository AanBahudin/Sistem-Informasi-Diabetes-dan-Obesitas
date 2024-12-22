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
  FavoritePage } from './pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        },
      ],
    },{
      path: '/dashboard',
      element: <DashboardLayout />,
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
    }
  ])

  return <RouterProvider router={router} />
}

export default App
