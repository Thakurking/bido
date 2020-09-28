const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  /**
   * The categories are
   * 1. Caterign
   * 2. Shipping
   * 3. Interior Design
   * 4. Construction
   */
  category: {
    type: String, // 1 OR 2 OR 3 OR 4
    default: null,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  //==================================================================================//
  /**
   * This is caterign field for caterign related services
   */
  catering: {
    //accepts total number of people from user for which he wants service
    totalPeople: {
      type: String,
      required: true,
    },
    // accepts list of items or dishes from user
    items: {
      type: String,
      required: true,
    },
    // accepts extra notes from user for bidders
    notes: {
      type: String,
      default: null,
    },
    // accepts if user wants waiters or not
    waiters: {
      type: String,
      default: null, // Y for Yes || N for No
    },
    // accepts if user wants buffet or serving type
    catType: {
      type: String,
      default: null, // B for buffet || S for serving
    },
    // accepts date of delivery service
    servDate: {
      type: String,
      required: true,
    },
    // accepts time in chosen date for serving
    servTime: {
      type: String,
      required: true,
    },
    // accepts duration for bidding set from user
    bidDuration: {
      type: String,
      default: null,
    },
  },
  //==================================================================================//
  /**
   * This is Shipping related services field object
   */
  shipping: {
    // This accepts weight for shipping products
    weight: {
      type: String,
      default: null,
    },
    // This accepts from where to take ship
    from: {
      type: String,
      required: true,
    },
    // This accepts where to ship the products
    to: {
      type: String,
      required: true,
    },
    // Accepts extra notes form user for shipper
    notes: {
      type: String,
      default: null,
    },
    // Product size to be mentioned from user
    size: {
      type: String,
      default: null,
    },
    // Prefered vehicle from user for transportation
    prefVehicle: {
      type: String,
      default: null,
    },
    // This accepts optional photo from user of products to ship
    photo: [
      {
        type: String,
        default: null,
      },
    ],
    bidDuration: {
      type: String,
      default: null,
    },
  },
  //==================================================================================//
  /**
   * This is Interior Designin service field object
   */
  interiorDesign: {
    //Accepts photo from user of project
    photo: [
      {
        type: String,
        required: true,
      },
    ],
    // This accepts area of project from user
    area: {
      type: String,
      required: true,
    },
    // This accepts extra notes from user for bidder
    notes: {
      type: String,
      default: null,
    },
    bidDuration: {
      type: String,
      default: null,
    },
  },
  //==================================================================================//
  /**
   * This is Construction service field object
   */
  construction: {
    // This accepts map of property to be prepared
    map: [
      {
        type: String,
        required: true,
      },
    ],
    // This accepts number of rooms to be prepared in the property
    noOfRoom: {
      type: String,
      default: null,
    },
    //This accpets number of halls to be prepared in property
    noOfHall: {
      type: String,
      default: null,
    },
    //This accepts number of kitchen to be prepared in the property
    noOfKitchen: {
      type: String,
      default: null,
    },
    //This accepts number of bathroom to be prepared in the property
    noOfBathroom: {
      type: String,
      default: null,
    },
    //This accepts land area of property
    landArea: {
      type: String,
      required: true,
    },
    bidDuration: {
      type: String,
      default: null,
    },
  },
});

module.exports = mongoose.model("Post", postSchema);
