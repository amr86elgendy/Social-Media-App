import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_User_Details } from '../actions/postAction';
import PostSkeleton from '../util/PostSkeleton';
import Post from '../components/post/Post';
import ProfileSkeleton from '../util/ProfileSkeleton';
import StaticProfile from '../components/profile/StaticProfile';
import Axios from 'axios';

const User = () => {
  const { username, postId } = useParams();
  const [user, setUser] = useState(null)

  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.postInfo);

  useEffect(() => {
    dispatch(get_User_Details(username));

    const fetchUserProfile = async () => {
      const { data } = await Axios.get(`/user/${username}`);
      setUser(data.user)
    }

    fetchUserProfile();

  }, [dispatch, username]);

  return (
    <Grid container>
      <Grid item sm={8} xs={12}>
        {loading ? (
      <PostSkeleton />
    ) : posts.length === 0 ? (
      <h1>No posts from this user</h1>
    ) : !postId ? (
      posts.map((post) => <Post key={post._id} {...post} />)
    ) : (
      posts.map((post) => {
        if (post._id !== postId)
          return <Post key={post._id} {...post} />;
        else return <Post key={post._id} {...post} openPost />;
      })
    )}
      </Grid>
      <Grid item sm={4} xs={12}>
        {user === null ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile userProfile={user} />
        )}
      </Grid>
    </Grid>
  );
};

export default User;
