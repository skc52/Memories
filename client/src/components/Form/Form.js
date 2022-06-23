import React, {useState, useEffect} from 'react'
import useStyles from './styles';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import Filebase from 'react-file-base64';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost, updatePost } from '../../actions/posts';
import {useSelector} from 'react-redux';
const Form = ( {currentId, setCurrentId} ) => {



    const [postData, setPostData] = useState({
       
        title:'',
        message:'',
        tags:'',
        selectedFile:'',
    });
    
    const post = useSelector((state)=>currentId?state.posts.posts.find((post)=>post._id===currentId):null);
    const Classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const auth = useSelector((state)=>state.authReducer);
    const navigate = useNavigate();

    useEffect(()=>{
        if(post) setPostData(post);
        
    }, [post])
    
    const clear = () => {
        setCurrentId(null);
        setPostData({
            
            title:'',
            message:'',
            tags:'',
            selectedFile:'',
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (currentId){

            dispatch(updatePost(currentId, {...postData, name:user?.result?.name}));
            
        }
        else{
            dispatch(createPost({...postData, name:user?.result?.name}, navigate));
        }
        clear();
    }
  

    if (!user?.result?.name){
        return (
            <Paper className={Classes.paper}>
                <Typography variant='h6' align='center' >
                    Please sign in to create your memories.
                </Typography>

            </Paper>
        )
    }

  return (
        <Paper className={Classes.paper} elevation = {6}>
            <form autoComplete='off' noValidate className={Classes.form} onSubmit = {handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Editing':'Creating'} a memory</Typography>
                
                <TextField 
                    value = {postData.title}
                    onChange = {(e)=>setPostData({...postData, title:e.target.value})}
                    name = "title" 
                    variant = "outlined"
                    label = "Title" 
                    fullWidth/>
                <TextField 
                    value = {postData.message}
                    onChange = {(e)=>setPostData({...postData, message:e.target.value})}
                    name = "message" 
                    variant = "outlined"
                    label = "Message" 
                    fullWidth/>
                <TextField 
                    value = {postData.tags}
                    onChange = {(e)=>setPostData({...postData, tags:e.target.value.split(',').map(element => element.trim())})}
                    name = "tags" 
                    variant = "outlined"
                    label = "Tags" 
                    fullWidth/>

                <div className={Classes.fileInput}>
                    <Filebase
                        type = "file"
                        multiple = {false}
                        onDone = {({base64})=>setPostData({...postData, selectedFile:base64})}
                    />
                </div>
                <Button className={Classes.buttonSubmit} variant = "container" color = "primary" 
                size = "large" type = "submit" fullWidth>Submit</Button>
                <Button variant = "contained" color = "secondary" 
                size = "small" onClick = {clear} fullWidth>Clear</Button>

            </form>
        </Paper>
  )
}

export default Form