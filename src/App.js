import React, { useState, useEffect, } from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';


const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(13);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('http://javareesbyapi-env.eba-rtdeyeqd.ap-southeast-2.elasticbeanstalk.com/api/v1/getallclients/tenant/reesby');
      setPosts(res.data);
      setLoading(true);
    };

    fetchPosts();
  }, []);
  console.log(posts);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>All Clients</h1>
     
      <Posts posts={currentPosts} loading={loading} />
      
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
