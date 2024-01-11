const asyncHandler = require("express-async-handler");
const { Storage, vaildationStorage } = require("../models/Storage");

/**--------------------------------
 * @desc Add item
 * @router /api/storage/addItem
 * @method POST
 * @access private just admin or staff
 * ------------------------------------------ */
module.exports.addItem = asyncHandler(async (req, res) => {
  //validation
  try {

    const { error } = vaildationStorage(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    //if item is exists
    let newItem = await Storage.findOne({ itemName: req.body.itemName });
    if (newItem) return res.status(400).json({ message: "Item already exist" });

    //add new item to database
    newItem = new Storage({
      itemName: req.body.itemName,
      theNumber: req.body.theNumber,
      cost: req.body.cost,
    });
    await newItem.save();

    //send a response to client
    res.status(201).json({ message: "Done.", newItem });
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**--------------------------------
 * @desc get all item
 * @router /api/storage/getAllItem
 * @method GET
 * @access private just admin or staff
 * ------------------------------------------ */
module.exports.getAllItem = asyncHandler(async (req, res) => {
  try {

    const USER_PER_PAGE = 10;
    const pageNumber = req.query.pageNumber;
    const allItem = await Storage.find()
      .skip((pageNumber - 1) * USER_PER_PAGE)
      .limit(USER_PER_PAGE);
    if (allItem) {
      const count = await Storage.find({}).count();

      res.status(200).json({ count, message: "All Item", allItem });
    } else {
      res.status(404).json({ message: "Error........." });
    }
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**--------------------------------
 * @desc update item
 * @router /api/storage/updateItem/:id
 * @method PUT
 * @access private just admin or staff
 * ------------------------------------------ */
module.exports.updateItem = asyncHandler(async (req, res) => {
  try {

    const updateItem = await Storage.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          itemName: req.body.itemName,
          theNumber: req.body.theNumber,
          cost: req.body.cost,
        },
      },
      { new: true }
    );
    if (updateItem) {
      res.status(200).json({ updateItem, message: "User is Updated" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**--------------------------------
 * @desc Delete item
 * @router /api/storage/deleteItem/:id
 * @method DELETE
 * @access private just admin or staff
 * ------------------------------------------ */
module.exports.deleteItem = asyncHandler(async (req, res) => {
  try {

    const delitem = await Storage.findByIdAndDelete(req.params.id);
    if (delitem) {
      res.status(200).json({ message: "Item is Deleted" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    // Handle the error here, you can log it or send a specific error response to the client
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
