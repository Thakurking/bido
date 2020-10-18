const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

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
      default: null,
    },
    // accepts list of items or dishes from user
    items: {
      type: String,
      default: null,
    },
    // accepts extra notes from user for bidders
    notes: {
      type: String,
      default: null,
    },
    // accepts if user wants waiters or not
    waiters: {
      type: String,
      default: "N", // Y for Yes || N for No
    },
    // accepts if user wants buffet or serving type
    catType: {
      type: String,
      default: null, // B for buffet || S for serving
    },
    // accepts date of delivery service
    servDate: {
      type: String,
      default: null,
    },
    // accepts time in chosen date for serving
    servTime: {
      type: String,
      default: null,
    },
    // accepts duration for bidding set from user
    bidDuration: {
      type: String,
      default: null,
    },
    location: {
      state: {
        type: String,
        default: null,
      },
      district: {
        type: String,
        default: null,
      },
      city: {
        type: String,
        default: null,
      },
    },
  },
  //==================================================================================//
  /**
   * This is Shipping related services field object
   * This stores all the information related shipping
   */
  shipping: {
    // This accepts weight for shipping products
    weight: {
      type: String,
      default: null,
    },
    // This accepts from where to take ship
    from: {
      state: {
        type: String,
        default: null,
      },
      district: {
        type: String,
        default: null,
      },
      city: {
        type: String,
        default: null,
      },
      area: {
        type: String,
        default: null,
      },
      landmark: {
        type: String,
        default: null,
      },
    },
    // This accepts where to ship the products
    to: {
      state: {
        type: String,
        default: null,
      },
      district: {
        type: String,
        default: null,
      },
      city: {
        type: String,
        default: null,
      },
      area: {
        type: String,
        default: null,
      },
      landmark: {
        type: String,
        default: null,
      },
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
    //This Accepts What Product Customer Wanted To Get Shiped
    product: {
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
   * This is Interior Designin service field object
   */
  interiorDesign: {
    //Accepts photo from user of project
    photo: [
      {
        type: String,
        default: null,
      },
    ],
    // This accepts are of client's property
    // size: {
    //   width: {
    //     type: String,
    //     default: null,
    //   },
    //   height: {
    //     type: String,
    //     default: null,
    //   },
    // },
    //This accepts floor of the property
    isFloor: {
      type: String,
      default: "Y", //Y for included N for not included
    },
    //This accepts ceiling of the property
    isCeiling: {
      type: String,
      default: "Y", //Y for included N for not included
    },
    //This accepts number of rooms of the property
    rooms: {
      type: String,
      default: null,
    },
    //This accepts the location for the clients property
    location: {
      state: {
        type: String,
        default: null,
      },
      district: {
        type: String,
        default: null,
      },
      city: {
        type: String,
        default: null,
      },
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
        default: null,
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
      default: null,
    },
    //This accepts the location for the clients property
    location: {
      state: {
        type: String,
        default: null,
      },
      district: {
        type: String,
        default: null,
      },
      city: {
        type: String,
        default: null,
      },
    },
    bidDuration: {
      type: String,
      default: null,
    },
  },
  //==================================================================================//
  postedOn: {
    type: String,
    default: moment().format("dddd, Do, MMMM, YYYY, h:mm:ss a"),
  },
  /**
   * N for showing post untill bidder not accepted from the user
   * Y for accepting the bidder bid and not showing as post anywhere to any bidder
   * then only show in accepted bid history
   */
  status: {
    type: String,
    default: "N",
  },
  bidder: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", postSchema);
