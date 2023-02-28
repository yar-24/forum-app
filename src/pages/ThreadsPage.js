/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Diskusi from '../components/Diskusi';
import Kategori from '../components/Kategori';
import { asyncUserAndThreads } from '../states/threads/action';

function ThreadsPage() {
  const {
    authUser = null, threads = [], users = [], filterCategory = '',
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncUserAndThreads());
  }, [dispatch]);

  const threadList = threads
    .map((thread) => ({ ...thread, owner: users.find((user) => user.id === thread.ownerId) }))
    .map((thread) => ({
      ...thread,
      categories: thread.category,
      owner: users.find((user) => user.id === thread.ownerId),
    }))
    .filter((thread) => (filterCategory !== '' ? thread.categories.includes(filterCategory) : thread));

  const categories = [];
  threads.forEach((thread) => {
    if (thread.category) {
      thread.category.split().forEach((cate) => {
        const cateIndex = categories.findIndex((x) => x.cate === cate);
        if (cateIndex < 0) {
          categories.push({
            id: categories.length + 1,
            cate,
            threadId: [thread.id],
          });
        } else {
          const threadInCat = categories[cateIndex].threadId.findIndex((y) => y === thread.id);
          if (threadInCat < 0) {
            categories[cateIndex].threadId.push(thread.id);
          }
        }
      });
    }
  });

  return (
    <div className="home">
      <p>Kategori Popular</p>
      <div className="category">
        {categories.map((category) => (
          <Kategori key={category.id} category={category.cate} isClick={filterCategory === category.cate} />
        ))}
      </div>
      <h2>Diskusi Tersedia</h2>
      {threadList.map((thread) => (
        <Diskusi key={thread.id} thread={thread} />
      ))}
      {authUser ? (
        <Link to="/new" className="btn__new">
          <AiOutlinePlus size={25} />
        </Link>
      ) : null}
    </div>
  );
}

export default ThreadsPage;
