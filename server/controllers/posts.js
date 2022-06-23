import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) =>{
    const { page } = req.query;
    // console.log(req.query);
    
    try {
        // console.log(`page - ${page}`);
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await PostMessage.countDocuments({});
        // console.log(`startIndex - ${startIndex}`)
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        // console.log(posts);
        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    }catch(err){
        res.status(404).json({
            message:err.message
        })
    }
}

export const getPost = async(req, res) => {
    const {id} = req.params;

    try{
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    }catch(e){
        res.status(400).json({message:e.message});
    }
}


export const getPostsBySearch = async (req, res) =>{
    // console.log("YETA CHAI AAYo");
    const {searchQuery, tags} = req.query;
    // console.log("YETA CHAI AAYo");
    try{
        const title = new RegExp(searchQuery, "i");

        const posts = await PostMessage.find({ tags: { $in: tags.split(',') }  });
        
        res.json({ data: posts });
    }catch(err){
        res.status(404).json({
            message:err.message
        })
    }
}
export const createPost = async (req, res) =>{
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
    try{
        await newPost.save();
        res.status(201).json(newPost);
    }catch(err){
        res.status(409).json({
            message:err.message 
        })
    }
}

export const updatePost = async(req, res) =>{
    const {id:_id} = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("No post with that id");
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new:true});
    res.json(updatedPost);
}


export const deletePost = async(req, res) =>{
    const {id:_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("No post with that id");
    }
    await PostMessage.findByIdAndRemove(_id);
    console.log("deleted post");
    res.json({message:'Post Deleted Successfully'});
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({message: "Unauthenticated"});

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id)=>id===String(req.userId));

    if (index === -1){

        //like the post
        post.likes.push(req.userId);
    }
    else{
        //dislike a post
        post.likes = post.likes.filter((id)=>id!== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    
    res.json(updatedPost);
}


export const commentPost = async(req, res) =>{
    console.log("uxebxuej");
    const {id} = req.params;
    const {value} = req.body;
    console.log("211")
    const post = await PostMessage.findById(id);
    console.log("21")
    post.comments.push(value);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new:true});
    console.log("1")
    res.json(updatedPost);

}