const Listing=require("../models/listing");

//index
module.exports.index=async(req,res)=>{
    let allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

//new
module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
};

//show
module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",
                                                populate :{path:"author",},})
    .populate("owner").populate("reviews.author");
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist !");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
};

//create post
module.exports.createListing=async (req, res,next) => {
  let url=req.file.path;
  let filename=req.file.filename;
  const listingData=req.body.listing;
  const newListing = new Listing(listingData);
  newListing.owner=req.user._id;
  newListing.image={url,filename};
  await newListing.save();
  req.flash("success","New Listing created!");
  res.redirect("/listings");
};

//edit
module.exports.renderEditForm=async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
      req.flash("error", "Listing you requested for does not exist !");
      return res.redirect("/listings");
    }
  let originalImageUrl=listing.image.url;
  originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300/w_200");
  res.render("listings/edit", { listing , originalImageUrl });
};

//update
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const { listing } = req.body;
  const updateData = {
    title: listing.title,
    price: listing.price,
    country: listing.country,
    description: listing.description
  };
  if (req.file) {
    updateData.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }
  await Listing.findByIdAndUpdate(id, updateData, { new: true });
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

//destroy
module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    await Listing.findOneAndDelete({ _id: id }); 
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};