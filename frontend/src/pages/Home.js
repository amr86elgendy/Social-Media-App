import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Post from '../components/post/Post';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import Profile from '../components/profile/Profile';
import { getPosts } from '../actions/postAction';
import PostSkeleton from '../util/PostSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton';

const Home = () => {
  
  const dispatch = useDispatch()
  //const { authenticated } = useSelector(state => state.user);
  const { posts, loading } = useSelector(state => state.postInfo);
  //const { push } = useHistory()

  
  useEffect(() => {
    // if (authenticated) {
    dispatch(getPosts());
  // } else {
  //   push('/login')
  // }
  }, [dispatch]);

  return (
    <Grid container>
      <Grid item sm={8} xs={12}>
        {!loading ? (
      posts.map((post) => <Post key={post._id} {...post} />)
    ) : (
      <PostSkeleton />
    )}
      </Grid>
      <Grid item sm={4} xs={12}>
        {!loading ? <Profile /> : <ProfileSkeleton />}
      </Grid>
    </Grid>
  )
    
    
  
}

export default Home




