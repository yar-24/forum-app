/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Loading from './components/Loading';
import LoadingPage from './components/LoadingPage';
import Navbar from './components/Navbar';
import Navigation from './components/Navigation';
import Top from './components/Top';
import DiskusiDetailPage from './pages/DiskusiDetailPage';
import Leaderboard from './pages/LeaderboardPage';
import LoginPage from './pages/LoginPage';
import NewDiskusiPage from './pages/NewDiskusiPage';
import RegisterPage from './pages/RegisterPage';
import ThreadsPage from './pages/ThreadsPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';

function App() {
  const { isPreload = true } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Top />
      <header>
        <Loading />
        <Navbar />
      </header>
      <div className="app-container">
        {!isPreload ? (
          <main>
            <Routes>
              <Route path="/" element={<ThreadsPage />} />
              <Route path="/threads/:id" element={<DiskusiDetailPage />} />
              <Route path="/leaderboards" element={<Leaderboard />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/new" element={<NewDiskusiPage />} />
            </Routes>
          </main>
        ) : (
          <LoadingPage />
        )}
      </div>
      <nav>
        <Navigation />
      </nav>
      <ToastContainer />
    </>
  );
}

export default App;
