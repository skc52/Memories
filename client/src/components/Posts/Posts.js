import React from 'react'
import Post from './Post/Post.js'
import useStyles from './styles';
import {Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux';

const Posts = ({setCurrentId}) => {
    const {posts, isLoading} = useSelector((state)=>state.posts);//captures the state posts
    const Classes = useStyles();

    if (!posts.length && !isLoading) return 'No posts';
    console.log(posts);
  return (

        isLoading? <CircularProgress/>: (
          <Grid className={Classes.container} container alignItems = "stretch" spacing = {3}>
            {
              posts.map((post)=>(
                <Grid key = {post._id} item xs = {12} sm = {6} md = {6} lg = {3}>
                    <Post post = {post} setCurrentId = {setCurrentId} />
                </Grid>
              ))
            }

          </Grid>
        )
    
    
  )
}

export default Posts