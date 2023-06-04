const path = require('path');
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
// const  ObjectID  = require('mongodb');
const cors = require('cors');
const bcakg = "../PokeCardVeraCity/public/img";

const tf = require('@tensorflow/tfjs-node');


// Define the path to the converted TensorFlow.js model
const modelPath = path.join(__dirname, 'path/to/converted/model');

// Load the model
const loadModel = async () => {
  try {
    const model = await tf.loadLayersModel(`file://${modelPath}`);
    console.log('Model loaded successfully.');
    
    // Use the loaded model for predictions or other tasks
    // For example, you can make predictions using `model.predict(...)`
    
  } catch (error) {
    console.error('Failed to load the model:', error);
  }
};

// Call the loadModel function to load the model
loadModel();



loadModel();


app.use(bodyParser.json());
app.use(cors());

"default-src 'none'; img-src 'self'"

const connectionString = "mongodb+srv://harjobandeepsingh:R2dDIKHHT6lIrW4I@cluster0.iqrtcsi.mongodb.net/?retryWrites=true&w=majority";
const multer = require("multer");



// Storage Engin That Tells/Configures Multer for where (destination) and how (filename) to save/upload our files
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, bcakg); //important this is a direct path fron our current file to storage location
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname);
  },
});



var Users;
MongoClient.connect(connectionString, function(err, succ) {
    if(err) throw err;
    console.log('Db Connected');
    var db = succ.db('PokeCardVeraCity');
    Users = db.collection('User_Data');
    Cards = db.collection('Cards_Data');
})


app.post('/AddUser', (req,res) => {
     console.log(req.body);
    Users.insertOne(req.body).then((succ) => {
        res.send("ok");
    })
    // Users.insertOne({
    //     Name:'Aru',
    //     Email:'aru@gmail.com',
    //     Password:'123456',
    //     Contact:4561231232,
    //     Gender:'Male'
    // }).then((succ) => {
    //     res.send(succ);
    // })
})



const upload = multer({ storage: fileStorageEngine });

app.post('/AddCard', (req,res) => {
    console.log(req.body);
    console.log(req.files);
    Cards.insertOne(req.body).then((succ) => {
        res.send("done");
    })

});


app.post("/single", upload.single("bimg"), (req, res) => {
    console.log(req.file);
    res.send("Single FIle upload success");
});

app.post("/single2", upload.single("coverimg"), (req, res) => {
    console.log(req.file);
    res.send("Single FIle upload success");
});
  

app.post("/single3", upload.single("profile"), (req, res) => {
    console.log(req.file);
    res.send("Single FIle upload success");
});


app.get('/getUsers', (req,res) => {
    Users.find().toArray().then((succ) => {
        res.send(succ.Email);
    })
});

app.get('/getUsersPost', (req,res) => {
    Users.find().toArray().then((succ) => {
        res.send(succ);
    })
});

// const images = "./img";
// // sending images
// app.get('/giveImage', (req,res) => {
// res.sendFile("a_rainy_night_by_seerlight_dcrp1p2.jpg", { root: bcakg });
// })

app.get('/getPost', (req,res) => {
    Posts.find().toArray().then((succ) => {
        res.send(succ);
        console.log(succ)
    })
})

app.get('/getPostView/:id', (req,res) => {
    var idd = new mongodb.ObjectId(req.params.id);
    console.log(req.params.id)
    Posts.findOne({
        _id:idd,
    }).then((succ) => {
        res.send(succ);
        
        console.log(succ)
    })
})


app.get('/userView/:uid', (req,res) => {
    var idd = new mongodb.ObjectId(req.params.uid);
    console.log(req.params.uid)
    Users.findOne({
        _id:idd,
    }).then((succ) => {
        res.send(succ.Name);
        
        console.log(succ.Name)
    })
})


app.get('/getPostUser/:id', (req,res) => {
    var idd = new mongodb.ObjectId(req.params.id);
    console.log(req.params.id)
    Posts.findOne({
        _id:idd,
    }).then((succ) => {
        res.send(succ);
        
        console.log(succ)
    })
})

app.post('/Status', (req,res) => {
    console.log(req.body);
    var userFollow2 = req.body.userFollow;
    var userFollowingTo2 = req.body.userFollowingTo;
    console.log(userFollow2,"gg1");
    console.log(userFollowingTo2,"gg2");
    Following.findOne({
        userFollow:req.body.userFollow,
        userFollowingTo:req.body.userFollowingTo
    }).then((succ) => {
        res.send(succ);
        console.log(succ+"nn")
    })
})

app.post('/Login', (req,res) => {
    console.log(req.body);
    Users.findOne({
        email:req.body.email,
        password:req.body.password,
    }).then((succ) => {
    console.log(req.body.email)
    console.log(req.body.password)
    if(succ){
        console.log("Success!" )
        res.send(JSON.stringify(succ));
        console.log(JSON.stringify(succ))
       
    }else{
        console.log('error');
    }
})
})

app.post('/UpdateData', (req,res) => {
    console.log(req.body,"cover");
    var uid = new mongodb.ObjectId(req.body.uid);
    Users.updateOne({
        _id: uid
    },{
        $set: {
            uscoverimg: req.body.coverimage
        }
    }).then((succ) => {
        res.send(succ);
    })
});

app.post('/UpdateData2', (req,res) => {
    console.log(req.body,"cover");
    var uid = new mongodb.ObjectId(req.body.uid);
    Users.updateOne({
        _id: uid
    },{
        $set: {
            usprofileimg: req.body.coverimage
        }
    }).then((succ) => {
        res.send(succ);
    })
});

app.post('/UpdateUserName', (req,res) => {
    console.log(req.body,"name change");
    var uid = new mongodb.ObjectId(req.body.userId);
    Users.updateOne({
        _id: uid
    },{
        $set: {
            name: req.body.name
        }
    }).then((succ) => {
        res.send(succ);
    })
});

app.post('/Following', (req,res) => {

    console.log(req.body,"naaaaa");
    Following.findOne({
        follow:req.body.FollowdTo,
        followBy:req.body.user,
    }).then((succ) => {
 
    if(succ){
        console.log("Success!" )
        res.send("yup")
       
    }
})
})


app.post('/Follow', (req,res) => {
    const follower = req.body.follower;
  const followee = req.body.followee;

  const newFollower = { follower, followee };

    console.log(req.body);
    Following.insertOne(newFollower).then((succ) => {
        res.send("ok");
        console.log(succ)
    })

})

app.delete('/unfollow', (req, res) => {
    const follower = req.body.follower;
    const followee = req.body.followee;
  
    Following.deleteOne({ follower, followee }, (error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send('Successfully unfollowed');
      }
    });
  });


  app.get('/following', (req, res) => {
    const follower = req.query.follower;
    const followee = req.query.followee;
    console.log(follower)
    // Check the followers collection for a document with the specified follower and followee IDs
    Users.findOne({ follower, followee }, (error, follow) => {
      if (error) {
        res.status(500).send(error);
      } else if (follow) {
        // If a matching document is found, return true
        res.send(true);
      } else {
        // If no matching document is found, return false
        res.send(false);
      }
    });
  });
  
  app.get('/getUserData', (req,res) => {
    var idd = new mongodb.ObjectId(req.query.uid);

    console.log(idd),"nnnnnnnnn"
    Users.findOne({
        _id:idd,
    }).then((succ) => {
        res.send(succ);
        console.log(succ)
    })
})




app.post('/likePost', (req, res) => {
    const postId = req.body.postId;
    const userId = req.body.userId;
    // Check if the user has already liked the post
    likes.findOne({ postId: postId, userId: userId }, (error, like) => {
      if (error) {
        console.error(error);
        res.status(500).send({ error: 'Error liking post' });
      } else if (like) {
        // If the like already exists, return an error
        res.status(400).send({ error: 'Post already liked' });
      } else {
        // If the like does not exist, insert a new like document
        likes.insertOne({ postId: postId, userId: userId }, (error, result) => {
          if (error) {
            console.error(error);
            res.status(500).send({ error: 'Error liking post' });
          } else {
            res.send({ message: 'Post liked' });
          }
        });
      }
    });
  });
  
  app.delete('/unlikePost', (req, res) => {
    const postId = req.body.postId;
    const userId = req.body.userId;
    // Find and delete the like document
    likes.findOneAndDelete({ postId: postId, userId: userId }, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send({ error: 'Error liking post' });
          }else {
            res.send({ message: 'Post Disliked' });
          }
        });
    });

    app.get('/check-user-exists', (req, res) => {
      const emailExists = req.query.email;
      console.log(emailExists)
     
      Users.find({email: emailExists}, {$exists: true}).toArray(function(err, docs) //find if documents that satisfy the criteria exist
{     
    if(docs.length > 0) //if exists
    {
        console.log("true");
        res.send(true); // print out what it sends back
    }
    else // if it does not 
    {
        console.log("false");
        res.send(false);
    }
});
    //  console.log(exist)
    });

app.get('/updateonedata', (req,res) => {
    var idd = new mongodb.ObjectId("62f1e065181588aa9c094a56");
    Users.updateOne({
        _id: idd
    },{
        $set: {
            Name: "Arun",
            Email: "arun@gmail.com"
        }
    }).then((succ) => {
        res.send('Ok');
    })
})


app.post('/unFollow', (req,res) => {
    Following.deleteOne({
        follow:req.body.follow,
        followBy:req.body.followBy,
    }).then((succ) => {
        res.send('Deleted');
    })
})


app.post('/deleteonedata', (req,res) => {
    console.log(req.body.id);
    Users.deleteOne({
        _id: idd
    }).then((succ) => {
        res.send('Deleted');
    })
})



app.get('/Users', (req,res) => {
    res.send({Name:'Naveen',Email:'naveen@gmail.com'});
})

app.get('/Data', (req,res) => {
    res.send({Name:'raju',Email:'raju@gmail.com'});
})


app.listen(1000, (req,res) => {
    console.log('Server Started');
})