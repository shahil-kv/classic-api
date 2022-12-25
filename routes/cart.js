const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();

// localhost:5000/api/cart this is the routing of the cart 

//CREATE

router.post("/", verifyToken, async (req, res) => {
    // we will accept all the req from the post method and then we will store that in the newCart variable
  const newCart = new Cart(req.body); 
  try {
    // saving in the db is the next step if we have any problem while saving into the db then it will come to the catch 
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

//UPDATE
// id means we want to put the id of which persons cart we want to update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id,
        // want to ask about this to sir
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
// verifyToken and authentication enn parayumbo token first verify cheyyanm enit athil nin oru user kittanm aa userum namal param koduknnaa userum crt anho nokkum anenkil mathram nadakolluu

router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

