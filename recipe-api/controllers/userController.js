const User = require('../models/User');

exports.getAllUsers = async(req,res)=>{
    try{
        const users = await User.find();
        
        return res.status(200).json({users});

    }catch(err){
        console.error(err);
        res.status(500).json({message:"internal server error"})
    }
}
exports.followUser= async(req,res)=>{
    try{
       const userId = req.user._id;
       const {followUserId} =req.body;
       if(!followUserId) return res.status(400).json({message:"FollowUserId must be provided"});
       const followUser = await User.findById(followUserId);
       if(!followUser) return res.status(400).json({message:"The User you want to follow is not found"})
       if(followUserId.toString()===userId.toString()) return res.status(400).json({message : 'you cannot follow  yourself'})
       const user = await User.findById(userId);
       if(user.following.includes(followUserId)){  
        return res.status(400).json({message :"you are already following the user"})
       }
       user.following.push(followUserId);
       followUser.followers.push(userId);

       await user.save();
       await followUser.save();
       return res.status(200).json( {message: `You are now following ${followUser.username}`,
         followingCount: user.following.length,
         followerCount: followUser.followers.length
    }) 
    }catch(err){
        console.error(err);
        return res.status(500).json({message : "internal server error"})
    }
}