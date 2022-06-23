import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import { AppBar, Avatar, Typography, Toolbar, Button } from '@material-ui/core'
import useStyles from './Style';
import memories from "../../Images/memories.jpg";
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionType';
import {useNavigate, useLocation} from 'react-router-dom';
import decode from 'jwt-decode';

const Navbar = () => {
    const Classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const location = useLocation();
    const LogOut = () =>{
        dispatch({
            type:LOGOUT
        })
        console.log("Going")
        navigator("/");
        console.log("reached")
        setUser(null);
    
    }
    
    useEffect(()=>{
        const token = user?.token;
        //JWT...
        if (token){
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000< new Date().getTime()) LogOut();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])
    return (
        <AppBar className={Classes.appBar} position='static' color='inherit'>
            <div className={Classes.brandContainer}>
                <Typography component={Link} to= "/" className={Classes.heading} variant='h2' align='center'>
                    Memories
                </Typography>
                <img className={Classes.image} src={memories} alt="memories" height = "60" />
                <Toolbar className={Classes.toolbar}>
                {
                    user ? (
                        <div className={Classes.profile}>
                            <Avatar className = {Classes.purple} alt = {user.result.name} src = {user.result.imageUrl}>
                                {user.result.name.charAt(0)}
                            </Avatar>
                            <Typography className={Classes.userName} variant = "h6">
                                {user.result.name}
                            </Typography>
                            <Button variant = "contained" className = {Classes.logout} color = "secondary"
                            onClick={
                                LogOut
                            }
                            >
                                Logout
                            </Button>
                        </div>
                    ):(
                        <Button component = {Link} to = "/auth">
                            Login
                        </Button>
                    )
                }

            </Toolbar>
            </div>
            
            
        </AppBar> 
    )
}

export default Navbar