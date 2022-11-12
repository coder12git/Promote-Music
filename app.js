const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
// const multer = require('multer');

const app = express();

app.set('view engine','ejs');

app.use(express.static("public"));


const mongoose = require("mongoose");
const validate = require("validator");

mongoose.connect("mongodb://localhost:27017/postsDB");

const postSchema = new mongoose.Schema({
      name : {
        type : String,
        required : true
      },

      about: {
        type:String,
        required:true
      },

      song: {
        type: String,
        required: true
      },

      facebookLink:{
        type:String,
        required:true
      },

      twitterLink:{
        type:String,
        required:true
      },

      instaLink:{
        type:String,
        required:true
      },

      youtubeLink:{
        type:String,
        required:true
      },

      image:{
        type:String,
        required:true

        }

  });

  const songSchema = new mongoose.Schema({
    name:{
      type: String,
      required:true
    },
    about:{
      type: String,
      required: true
    },
    facebookLink:{
      type:String,
      required:true
    },

    twitterLink:{
      type:String,
      required:true
    },

    instaLink:{
      type:String,
      required:true
    },

    youtubeLink:{
      type:String,
      required:true
    },
    image:{
      type: String,
      required: true
    },
    video: {
      type: String,
      required: true
    }

  })

const Post = mongoose.model("Post",postSchema);
const Song = mongoose.model("Song",songSchema);


app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  res.render("home");
});

app.get("/about",function(req,res){
  res.render("about");
});


app.get("/musicBlogs",function(req,res){
  Post.find(function(err,posts){
    if(err){
      console.log(err);
    }
    else{
    res.render("musicBlogs",{posts:posts});
    }
  });

});


app.get("/addBlog",function(req,res){
  res.render("addBlog");
})



app.post("/compose",function(req,res){
   const post = new Post({
    name : _.capitalize(req.body.artistName),
    about: req.body.artistAbout,
    song: req.body.artistUrl,
    facebookLink: req.body.facebook,
    twitterLink: req.body.twitter,
    instaLink: req.body.instagram,
    youtubeLink: req.body.youtube,
    image: req.body.image
   });

   post.save(function(err){
     if(err){
       console.log(err);
     }
     else{
       res.redirect("/musicBlogs");
     }
   });

});


// Render the correct blog post using post.title in the URL

app.get("/post/:topic" ,function(req,res){
const requestedTitle = _.capitalize(req.params.topic);

Post.findOne({name:requestedTitle},function(err,post){
  if(err){
    console.log(err);
  }
  else{
    if(!post){
      console.log("Match not found!");
    }
    else{
      res.render("post",{ ArtistName:post.name, About:post.about, SongLink:post.song, facebookLink:post. facebookLink,
      twitterLink:post. twitterLink,instaLink:post. instaLink,youtubeLink:post. youtubeLink,image:post.image})
    }
  }

});


});


app.get("/radioStation",function(req,res){
  Song.find(function(err,posts){
    if(err){
      console.log(err);
    }
    else{
    res.render("radioStation",{songs:posts});
    }
  });

});

app.get("/addSong",function(req,res){
  res.render("addSong");
})



app.post("/make",function(req,res){
   const song = new Song({
    name : _.capitalize(req.body.artistName),
    about: req.body.artistAbout,
    facebookLink: req.body.facebook,
    twitterLink: req.body.twitter,
    instaLink: req.body.instagram,
    youtubeLink: req.body.youtube,
    image: req.body.image,
    video: req.body.id
   });

   song.save(function(err){
     if(err){
       console.log(err);
     }
     else{
       res.redirect("/radioStation");
     }
   });

});


// Render the correct blog post using post.title in the URL

app.get("/songPost/:topic" ,function(req,res){
const requestedTitle = _.capitalize(req.params.topic);

Song.findOne({name:requestedTitle},function(err,song){
  if(err){
    console.log(err);
  }
  else{
    if(!song){
      console.log("Match not found!");
    }
    else{
      res.render("songPost",{ ArtistName:song.name, About:song.about, facebookLink:song.facebookLink,
      twitterLink:song. twitterLink,instaLink:song. instaLink,youtubeLink:song. youtubeLink,video:song.video})
    }
  }

});


});


app.get("/musicForum",function(req,res){
  res.render("musicForum");
});



app.listen(process.env.PORT||3000, function() {
  console.log("Server has started successfully!");
});
