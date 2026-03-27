require("dotenv").config();
const mongoose = require("mongoose");
const Permit = require("./models/permit.model");

const permits = [
  {
    title: "Construction Permit",
    description:
      "Required for new building construction, structural changes, or major additions to existing properties.",
    processingTime: "10-15 business days",
    requiredDocs: [
      "Site Plan",
      "Structural Drawings",
      "Contractor License",
      "Insurance Proof",
    ],
    iconName: "Hammer",
    isActive: true,
  },
  {
    title: "Business License",
    description:
      "Register a new business or renew an existing operating license for commercial activities.",
    processingTime: "5-7 business days",
    requiredDocs: ["Business Registration", "Tax ID", "Lease Agreement"],
    iconName: "Briefcase",
    isActive: true,
  },
  {
    title: "Renovation Permit",
    description:
      "For home improvements, remodeling, or non-structural modifications to residential properties.",
    processingTime: "3-5 business days",
    requiredDocs: ["Project Scope", "Floor Plan", "Owner Consent"],
    iconName: "Home",
    isActive: true,
  },
  {
    title: "Event Permit",
    description:
      "Authorization for public gatherings, festivals, street fairs, or block parties.",
    processingTime: "15-20 business days",
    requiredDocs: [
      "Event Plan",
      "Safety Protocol",
      "Insurance Certificate",
      "Noise Variance",
    ],
    iconName: "Calendar",
    isActive: true,
  },
];

const seedPermits = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Permit.deleteMany({});
    await Permit.insertMany(permits);

    console.log("Permits seeded successfully.");
    process.exit();
  } catch (error) {
    console.error("Seed permits error:", error);
    process.exit(1);
  }
};

seedPermits();