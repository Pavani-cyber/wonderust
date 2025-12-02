const User=require("../models/user");

//singup form
module.exports.renderSignupForm=(req,res)=>{
    res.render("./users/signup.ejs");
};

//singup
module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        const registeredUser=await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err){
               return next(err); 
            }
            req.flash("success","welcome to wonderust!");
            res.redirect("/listings");
        });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

//loginform
module.exports.renderLoginForm=(req,res)=>{
    res.render("./users/login.ejs");
};

//login
module.exports.login=async(req,res)=>{
        req.flash("success","welcom back to wonderust ! ");
        let redirectUrl=res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
};

//logout
module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
          return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    });
};