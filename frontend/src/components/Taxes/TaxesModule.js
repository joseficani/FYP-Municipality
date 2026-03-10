// import React, { useState } from "react";
// import "./TaxesModule.css";
// import {
//   X,
//   FileText,
//   Calendar,
//   Wallet,
//   AlertCircle,
//   ChevronRight,
//   Search,
//   Filter,
//   Download,
//   Info,
//   Building2,
//   Store,
//   Hammer,
//   Megaphone,
//   Trash2,
//   HardHat,
// } from "lucide-react";

// const taxCategories = [
//   {
//     id: "property",
//     title: "Property Tax",
//     arabicTitle: "ضريبة العقارات",
//     icon: Building2,
//     description:
//       "Annual taxes based on the rental value of residential and commercial properties.",
//     fees: [
//       {
//         id: "prop-res",
//         name: "Residential Property Tax",
//         arabicName: "ضريبة السكن",
//         description:
//           "Annual tax levied on residential units based on estimated rental value.",
//         conditions:
//           "Applicable to all owned residential apartments and houses.",
//         requiredDocuments: [
//           "Title Deed (Sanad)",
//           "Copy of ID",
//           "Previous payment receipt",
//         ],
//         paymentPeriod: "Annually (Due by March 31)",
//         estimatedAmount: "4-6% of rental value",
//         notes: "Exemptions available for disabled veterans.",
//       },
//       {
//         id: "prop-com",
//         name: "Commercial Property Tax",
//         arabicName: "ضريبة المحلات التجارية",
//         description:
//           "Tax on properties used for commercial or business purposes.",
//         conditions: "Applicable to offices, shops, and warehouses.",
//         requiredDocuments: [
//           "Title Deed",
//           "Business Registration",
//           "Lease Agreement",
//         ],
//         paymentPeriod: "Annually",
//         estimatedAmount: "6-8% of rental value",
//       },
//       {
//         id: "prop-vac",
//         name: "Vacant Land Tax",
//         arabicName: "ضريبة الأراضي الشاغرة",
//         description:
//           "Tax on undeveloped land plots within municipal boundaries.",
//         conditions: "Applies to non-agricultural vacant lands.",
//         requiredDocuments: ["Title Deed", "Survey Map"],
//         paymentPeriod: "Annually",
//         estimatedAmount: "2% of assessed land value",
//       },
//     ],
//   },
//   {
//     id: "business",
//     title: "Business License Fees",
//     arabicTitle: "رسوم الترخيص التجاري",
//     icon: Store,
//     description:
//       "Required permits for operating businesses within the municipality.",
//     fees: [
//       {
//         id: "bus-small",
//         name: "Small Business License",
//         description: "For shops under 50 sqm and home-based businesses.",
//         conditions: "Must meet zoning requirements.",
//         requiredDocuments: [
//           "ID Copy",
//           "Lease/Title Deed",
//           "Chamber of Commerce Cert",
//         ],
//         paymentPeriod: "Annually",
//         estimatedAmount: "250,000 - 500,000 LBP",
//       },
//       {
//         id: "bus-med",
//         name: "Medium Business License",
//         description: "For retail stores and offices 50-150 sqm.",
//         conditions: "Fire safety inspection required.",
//         requiredDocuments: [
//           "Company Registration",
//           "Fire Safety Cert",
//           "Health Inspection",
//         ],
//         paymentPeriod: "Annually",
//         estimatedAmount: "750,000 - 1,500,000 LBP",
//       },
//       {
//         id: "bus-rest",
//         name: "Restaurant/Café License",
//         description: "Special license for food and beverage establishments.",
//         conditions: "Strict health and safety compliance required.",
//         requiredDocuments: [
//           "Health Ministry Permit",
//           "Tourism Ministry Permit",
//           "Waste Management Plan",
//         ],
//         paymentPeriod: "Annually",
//         estimatedAmount: "2,000,000 - 5,000,000 LBP",
//       },
//     ],
//   },
//   {
//     id: "construction",
//     title: "Building & Construction",
//     arabicTitle: "رسوم رخص البناء",
//     icon: Hammer,
//     description:
//       "Permits required before any construction, renovation, or demolition work.",
//     fees: [
//       {
//         id: "const-new",
//         name: "New Construction Permit",
//         description: "Authorization to build a new structure.",
//         conditions: "Must comply with urban planning regulations.",
//         requiredDocuments: [
//           "Architectural Plans",
//           "Engineering Syndicate Stamp",
//           "Soil Report",
//         ],
//         paymentPeriod: "One-time",
//         estimatedAmount: "1.5% of estimated construction cost",
//       },
//       {
//         id: "const-ren",
//         name: "Renovation Permit",
//         description:
//           "For internal or external modifications to existing structures.",
//         conditions: "No structural changes without engineering approval.",
//         requiredDocuments: ["Renovation Plan", "Owner Consent"],
//         paymentPeriod: "One-time",
//         estimatedAmount: "200,000 - 1,000,000 LBP",
//       },
//       {
//         id: "const-occ",
//         name: "Occupancy Certificate (Iskan)",
//         description: "Final permit certifying building is safe for habitation.",
//         conditions: "Issued after construction completion and inspection.",
//         requiredDocuments: ["Completion Report", "Civil Defense Certificate"],
//         paymentPeriod: "One-time",
//         estimatedAmount: "Based on total built area",
//       },
//     ],
//   },
//   {
//     id: "signage",
//     title: "Signage & Advertisement",
//     arabicTitle: "رسوم اللافتات والإعلانات",
//     icon: Megaphone,
//     description: "Fees for commercial signs, banners, and billboards.",
//     fees: [
//       {
//         id: "sign-store",
//         name: "Storefront Sign",
//         description: "Main identification sign for businesses.",
//         conditions: "Must not obstruct public way.",
//         requiredDocuments: ["Sign Design/Dimensions", "Building Owner Consent"],
//         paymentPeriod: "Annually",
//         estimatedAmount: "100,000 LBP per sqm",
//       },
//       {
//         id: "sign-bill",
//         name: "Billboard/Banner",
//         description: "Large format advertising structures.",
//         conditions: "Subject to location restrictions.",
//         requiredDocuments: ["Structural Safety Report", "Location Map"],
//         paymentPeriod: "Annually",
//         estimatedAmount: "500,000 LBP per sqm",
//       },
//     ],
//   },
//   {
//     id: "sanitation",
//     title: "Sanitation & Waste",
//     arabicTitle: "رسوم النظافة والنفايات",
//     icon: Trash2,
//     description: "Municipal waste collection and sanitation services.",
//     fees: [
//       {
//         id: "waste-res",
//         name: "Residential Waste Collection",
//         description: "Standard household waste removal.",
//         conditions: "Included in municipal bill.",
//         requiredDocuments: ["None"],
//         paymentPeriod: "Annually",
//         estimatedAmount: "Included in rental value tax",
//       },
//       {
//         id: "waste-com",
//         name: "Commercial Waste Collection",
//         description: "For businesses generating standard waste.",
//         conditions: "Volume limits apply.",
//         requiredDocuments: ["Business License"],
//         paymentPeriod: "Annually",
//         estimatedAmount: "Based on business type and size",
//       },
//       {
//         id: "waste-bulk",
//         name: "Bulk Waste Removal",
//         description:
//           "On-demand removal of furniture, appliances, or construction debris.",
//         conditions: "Must be scheduled in advance.",
//         requiredDocuments: ["Request Form"],
//         paymentPeriod: "Per Service",
//         estimatedAmount: "150,000 LBP per truckload",
//       },
//     ],
//   },
//   {
//     id: "infrastructure",
//     title: "Infrastructure & Roads",
//     arabicTitle: "رسوم البنية التحتية",
//     icon: HardHat,
//     description:
//       "Permits for road cuts, utility connections, and sidewalk use.",
//     fees: [
//       {
//         id: "inf-cut",
//         name: "Road Cut Permit",
//         description:
//           "Permission to excavate public road for repairs or connections.",
//         conditions: "Must restore road to original condition.",
//         requiredDocuments: ["Work Plan", "Security Deposit"],
//         paymentPeriod: "Per Permit",
//         estimatedAmount: "Based on area (sqm) + Deposit",
//       },
//       {
//         id: "inf-side",
//         name: "Sidewalk Occupation",
//         description:
//           "For cafes with outdoor seating or temporary construction storage.",
//         conditions: "Must leave 1.5m for pedestrian passage.",
//         requiredDocuments: ["Layout Plan"],
//         paymentPeriod: "Monthly/Annually",
//         estimatedAmount: "50,000 LBP per sqm/month",
//       },
//     ],
//   },
// ];

// export default function TaxesModule() {
//   const [selectedFee, setSelectedFee] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [search, setSearch] = useState("");

//   const handleViewDetails = (fee) => {
//     setSelectedFee(fee);
//     setIsModalOpen(true);
//   };

//   const filteredCategories = taxCategories
//     .map((category) => ({
//       ...category,
//       fees: category.fees.filter(
//         (fee) =>
//           fee.name.toLowerCase().includes(search.toLowerCase()) ||
//           category.title.toLowerCase().includes(search.toLowerCase()) ||
//           fee.description.toLowerCase().includes(search.toLowerCase())
//       ),
//     }))
//     .filter((category) => category.fees.length > 0 || search.trim() === "");

//   const handleDownload = () => {
//     alert("This would download the fee schedule PDF.");
//   };

//   return (
//     <>
//       <div className="taxes-hero">
//         <div className="taxes-hero-overlay"></div>
//         <div className="taxes-hero-content">
//           <div className="taxes-breadcrumb">
//             <span>Home</span>
//             <span>/</span>
//             <span>Services</span>
//             <span>/</span>
//             <span className="active">Taxes & Fees</span>
//           </div>

//           <h1>Taxes & Municipal Fees</h1>
//           <p>
//             A comprehensive guide to municipal taxes, service fees, and permit
//             costs. Find detailed information about requirements, payment
//             periods, and regulations.
//           </p>
//         </div>
//       </div>

//       <main className="taxes-main">
//         <div className="taxes-search-bar">
//           <div className="taxes-search-input-wrap">
//             <Search size={20} className="taxes-search-icon" />
//             <input
//               type="text"
//               placeholder="Search for a tax, fee, or permit..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>

//           <div className="taxes-search-actions">
//             <button className="taxes-outline-btn" type="button">
//               <Filter size={18} />
//               <span>Filter</span>
//             </button>

//             <button
//               className="taxes-green-btn"
//               type="button"
//               onClick={handleDownload}
//             >
//               <Download size={18} />
//               <span>Fee Schedule PDF</span>
//             </button>
//           </div>
//         </div>

//         <div className="taxes-info-banner">
//           <Info size={20} className="taxes-info-icon" />
//           <div>
//             <h4>Fiscal Year 2024 Updates</h4>
//             <p>
//               Please note that property tax rates have been adjusted for the
//               2024 fiscal year. Deadlines for annual payments have been extended
//               to March 31st.
//             </p>
//           </div>
//         </div>

//         <div className="taxes-grid">
//           {filteredCategories.map((category) => (
//             <TaxCategoryCard
//               key={category.id}
//               category={category}
//               onViewDetails={handleViewDetails}
//             />
//           ))}
//         </div>

//         <div className="taxes-help-box">
//           <div className="taxes-help-overlay"></div>
//           <div className="taxes-help-content">
//             <h2>Need help calculating your fees?</h2>
//             <p>
//               Our municipal support team is available to assist you with tax
//               assessments and fee calculations. Visit the municipal building or
//               contact our hotline.
//             </p>

//             <div className="taxes-help-actions">
//               <button className="taxes-white-btn" type="button">
//                 Contact Support
//               </button>
//               <button className="taxes-transparent-btn" type="button">
//                 View FAQ
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>

//       <FeeDetailModal
//         fee={selectedFee}
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />
//     </>
//   );
// }

// function TaxCategoryCard({ category, onViewDetails }) {
//   const Icon = category.icon;

//   return (
//     <div className="tax-card">
//       <div className="tax-card-header">
//         <div className="tax-card-header-top">
//           <div className="tax-card-icon-box">
//             <Icon size={28} strokeWidth={1.6} />
//           </div>

//           <span className="tax-card-fees-count">
//             {category.fees.length} Fees
//           </span>
//         </div>

//         <h3>{category.title}</h3>
//         <p className="tax-card-arabic">{category.arabicTitle}</p>
//         <p className="tax-card-description">{category.description}</p>
//       </div>

//       <div className="tax-card-body">
//         {category.fees.map((fee) => (
//           <div
//             key={fee.id}
//             className="tax-fee-row"
//             onClick={() => onViewDetails(fee)}
//           >
//             <div className="tax-fee-info">
//               <h4>{fee.name}</h4>
//               <p>{fee.estimatedAmount}</p>
//             </div>

//             <button
//               className="tax-fee-arrow"
//               type="button"
//               aria-label={`View details for ${fee.name}`}
//             >
//               <ChevronRight size={18} />
//             </button>
//           </div>
//         ))}
//       </div>

//       <div className="tax-card-footer">
//         <button className="tax-info-btn" type="button">
//           <Info size={16} />
//           <span>General Information</span>
//         </button>
//       </div>
//     </div>
//   );
// }

// function FeeDetailModal({ fee, isOpen, onClose }) {
//   if (!isOpen || !fee) return null;

//   return (
//     <div className="fee-modal-overlay">
//       <div className="fee-modal-backdrop" onClick={onClose}></div>

//       <div className="fee-modal-box" role="dialog" aria-modal="true">
//         <div className="fee-modal-header">
//           <div>
//             <h3>{fee.name}</h3>
//             {fee.arabicName && <p>{fee.arabicName}</p>}
//           </div>

//           <button
//             onClick={onClose}
//             className="fee-close-btn"
//             aria-label="Close modal"
//             type="button"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <div className="fee-modal-body">
//           <p className="fee-main-description">{fee.description}</p>

//           <div className="fee-detail-grid">
//             <div className="fee-detail-card">
//               <div className="fee-detail-title">
//                 <AlertCircle size={20} />
//                 <h4>Conditions</h4>
//               </div>
//               <p>{fee.conditions}</p>
//             </div>

//             <div className="fee-detail-card">
//               <div className="fee-detail-title">
//                 <Calendar size={20} />
//                 <h4>Payment Period</h4>
//               </div>
//               <p>{fee.paymentPeriod}</p>
//             </div>

//             <div className="fee-detail-card">
//               <div className="fee-detail-title">
//                 <Wallet size={20} />
//                 <h4>Estimated Cost</h4>
//               </div>
//               <p className="fee-cost">{fee.estimatedAmount}</p>
//             </div>

//             <div className="fee-detail-card">
//               <div className="fee-detail-title">
//                 <FileText size={20} />
//                 <h4>Required Documents</h4>
//               </div>
//               <ul>
//                 {fee.requiredDocuments.map((doc, idx) => (
//                   <li key={idx}>{doc}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {fee.notes && (
//             <div className="fee-note-box">
//               <span>Note:</span> {fee.notes}
//             </div>
//           )}
//         </div>

//         <div className="fee-modal-footer">
//           <button
//             onClick={onClose}
//             className="fee-outline-btn"
//             type="button"
//           >
//             Close
//           </button>

//           <button
//             className="fee-green-btn"
//             type="button"
//             onClick={() =>
//               alert("This feature would link to the application form or payment portal.")
//             }
//           >
//             Apply Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import "./TaxesModule.css";
import {
  X,
  FileText,
  Calendar,
  Wallet,
  AlertCircle,
  ChevronRight,
  Search,
  Filter,
  Download,
  Info,
  Building2,
  Store,
  Hammer,
  Megaphone,
  Trash2,
  HardHat,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const taxCategories = [
  {
    id: "property",
    title: "Property Tax",
    arabicTitle: "ضريبة العقارات",
    icon: Building2,
    description:
      "Annual taxes based on the rental value of residential and commercial properties.",
    fees: [
      {
        id: "prop-res",
        name: "Residential Property Tax",
        arabicName: "ضريبة السكن",
        description:
          "Annual tax levied on residential units based on estimated rental value.",
        conditions:
          "Applicable to all owned residential apartments and houses.",
        requiredDocuments: [
          "Title Deed (Sanad)",
          "Copy of ID",
          "Previous payment receipt",
        ],
        paymentPeriod: "Annually (Due by March 31)",
        estimatedAmount: "4-6% of rental value",
        notes: "Exemptions available for disabled veterans.",
      },
      {
        id: "prop-com",
        name: "Commercial Property Tax",
        arabicName: "ضريبة المحلات التجارية",
        description:
          "Tax on properties used for commercial or business purposes.",
        conditions: "Applicable to offices, shops, and warehouses.",
        requiredDocuments: [
          "Title Deed",
          "Business Registration",
          "Lease Agreement",
        ],
        paymentPeriod: "Annually",
        estimatedAmount: "6-8% of rental value",
      },
      {
        id: "prop-vac",
        name: "Vacant Land Tax",
        arabicName: "ضريبة الأراضي الشاغرة",
        description:
          "Tax on undeveloped land plots within municipal boundaries.",
        conditions: "Applies to non-agricultural vacant lands.",
        requiredDocuments: ["Title Deed", "Survey Map"],
        paymentPeriod: "Annually",
        estimatedAmount: "2% of assessed land value",
      },
    ],
  },
  {
    id: "business",
    title: "Business License Fees",
    arabicTitle: "رسوم الترخيص التجاري",
    icon: Store,
    description:
      "Required permits for operating businesses within the municipality.",
    fees: [
      {
        id: "bus-small",
        name: "Small Business License",
        description: "For shops under 50 sqm and home-based businesses.",
        conditions: "Must meet zoning requirements.",
        requiredDocuments: [
          "ID Copy",
          "Lease/Title Deed",
          "Chamber of Commerce Cert",
        ],
        paymentPeriod: "Annually",
        estimatedAmount: "250,000 - 500,000 LBP",
      },
      {
        id: "bus-med",
        name: "Medium Business License",
        description: "For retail stores and offices 50-150 sqm.",
        conditions: "Fire safety inspection required.",
        requiredDocuments: [
          "Company Registration",
          "Fire Safety Cert",
          "Health Inspection",
        ],
        paymentPeriod: "Annually",
        estimatedAmount: "750,000 - 1,500,000 LBP",
      },
      {
        id: "bus-rest",
        name: "Restaurant/Café License",
        description: "Special license for food and beverage establishments.",
        conditions: "Strict health and safety compliance required.",
        requiredDocuments: [
          "Health Ministry Permit",
          "Tourism Ministry Permit",
          "Waste Management Plan",
        ],
        paymentPeriod: "Annually",
        estimatedAmount: "2,000,000 - 5,000,000 LBP",
      },
    ],
  },
  {
    id: "construction",
    title: "Building & Construction",
    arabicTitle: "رسوم رخص البناء",
    icon: Hammer,
    description:
      "Permits required before any construction, renovation, or demolition work.",
    fees: [
      {
        id: "const-new",
        name: "New Construction Permit",
        description: "Authorization to build a new structure.",
        conditions: "Must comply with urban planning regulations.",
        requiredDocuments: [
          "Architectural Plans",
          "Engineering Syndicate Stamp",
          "Soil Report",
        ],
        paymentPeriod: "One-time",
        estimatedAmount: "1.5% of estimated construction cost",
      },
      {
        id: "const-ren",
        name: "Renovation Permit",
        description:
          "For internal or external modifications to existing structures.",
        conditions: "No structural changes without engineering approval.",
        requiredDocuments: ["Renovation Plan", "Owner Consent"],
        paymentPeriod: "One-time",
        estimatedAmount: "200,000 - 1,000,000 LBP",
      },
      {
        id: "const-occ",
        name: "Occupancy Certificate (Iskan)",
        description: "Final permit certifying building is safe for habitation.",
        conditions: "Issued after construction completion and inspection.",
        requiredDocuments: ["Completion Report", "Civil Defense Certificate"],
        paymentPeriod: "One-time",
        estimatedAmount: "Based on total built area",
      },
    ],
  },
  {
    id: "signage",
    title: "Signage & Advertisement",
    arabicTitle: "رسوم اللافتات والإعلانات",
    icon: Megaphone,
    description: "Fees for commercial signs, banners, and billboards.",
    fees: [
      {
        id: "sign-store",
        name: "Storefront Sign",
        description: "Main identification sign for businesses.",
        conditions: "Must not obstruct public way.",
        requiredDocuments: ["Sign Design/Dimensions", "Building Owner Consent"],
        paymentPeriod: "Annually",
        estimatedAmount: "100,000 LBP per sqm",
      },
      {
        id: "sign-bill",
        name: "Billboard/Banner",
        description: "Large format advertising structures.",
        conditions: "Subject to location restrictions.",
        requiredDocuments: ["Structural Safety Report", "Location Map"],
        paymentPeriod: "Annually",
        estimatedAmount: "500,000 LBP per sqm",
      },
    ],
  },
  {
    id: "sanitation",
    title: "Sanitation & Waste",
    arabicTitle: "رسوم النظافة والنفايات",
    icon: Trash2,
    description: "Municipal waste collection and sanitation services.",
    fees: [
      {
        id: "waste-res",
        name: "Residential Waste Collection",
        description: "Standard household waste removal.",
        conditions: "Included in municipal bill.",
        requiredDocuments: ["None"],
        paymentPeriod: "Annually",
        estimatedAmount: "Included in rental value tax",
      },
      {
        id: "waste-com",
        name: "Commercial Waste Collection",
        description: "For businesses generating standard waste.",
        conditions: "Volume limits apply.",
        requiredDocuments: ["Business License"],
        paymentPeriod: "Annually",
        estimatedAmount: "Based on business type and size",
      },
      {
        id: "waste-bulk",
        name: "Bulk Waste Removal",
        description:
          "On-demand removal of furniture, appliances, or construction debris.",
        conditions: "Must be scheduled in advance.",
        requiredDocuments: ["Request Form"],
        paymentPeriod: "Per Service",
        estimatedAmount: "150,000 LBP per truckload",
      },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure & Roads",
    arabicTitle: "رسوم البنية التحتية",
    icon: HardHat,
    description:
      "Permits for road cuts, utility connections, and sidewalk use.",
    fees: [
      {
        id: "inf-cut",
        name: "Road Cut Permit",
        description:
          "Permission to excavate public road for repairs or connections.",
        conditions: "Must restore road to original condition.",
        requiredDocuments: ["Work Plan", "Security Deposit"],
        paymentPeriod: "Per Permit",
        estimatedAmount: "Based on area (sqm) + Deposit",
      },
      {
        id: "inf-side",
        name: "Sidewalk Occupation",
        description:
          "For cafes with outdoor seating or temporary construction storage.",
        conditions: "Must leave 1.5m for pedestrian passage.",
        requiredDocuments: ["Layout Plan"],
        paymentPeriod: "Monthly/Annually",
        estimatedAmount: "50,000 LBP per sqm/month",
      },
    ],
  },
];

export default function TaxesModule() {
  const [selectedFee, setSelectedFee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleViewDetails = (fee) => {
    setSelectedFee(fee);
    setIsModalOpen(true);
  };

  const filteredCategories = taxCategories
    .map((category) => ({
      ...category,
      fees: category.fees.filter(
        (fee) =>
          fee.name.toLowerCase().includes(search.toLowerCase()) ||
          category.title.toLowerCase().includes(search.toLowerCase()) ||
          fee.description.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((category) => category.fees.length > 0 || search.trim() === "");

  const handleDownload = () => {
    alert("This would download the fee schedule PDF.");
  };

  return (
    <>
      <div className="taxes-hero">
        <div className="taxes-hero-overlay"></div>
        <div className="taxes-hero-content">
          <div className="taxes-breadcrumb">
            <span>Home</span>
            <span>/</span>
            <span>Services</span>
            <span>/</span>
            <span className="active">Taxes & Fees</span>
          </div>

          <h1>Taxes & Municipal Fees</h1>
          <p>
            A comprehensive guide to municipal taxes, service fees, and permit
            costs. Find detailed information about requirements, payment
            periods, and regulations.
          </p>
        </div>
      </div>

      <main className="taxes-main">
        <div className="taxes-search-bar">
          <div className="taxes-search-input-wrap">
            <Search size={20} className="taxes-search-icon" />
            <input
              type="text"
              placeholder="Search for a tax, fee, or permit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="taxes-search-actions">
            <button className="taxes-outline-btn" type="button">
              <Filter size={18} />
              <span>Filter</span>
            </button>

            <button
              className="taxes-green-btn"
              type="button"
              onClick={handleDownload}
            >
              <Download size={18} />
              <span>Fee Schedule PDF</span>
            </button>
          </div>
        </div>

        <div className="taxes-info-banner">
          <Info size={20} className="taxes-info-icon" />
          <div>
            <h4>Fiscal Year 2024 Updates</h4>
            <p>
              Please note that property tax rates have been adjusted for the
              2024 fiscal year. Deadlines for annual payments have been extended
              to March 31st.
            </p>
          </div>
        </div>

        <div className="taxes-grid">
          {filteredCategories.map((category) => (
            <TaxCategoryCard
              key={category.id}
              category={category}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        <div className="taxes-help-box">
          <div className="taxes-help-overlay"></div>
          <div className="taxes-help-content">
            <h2>Need help calculating your fees?</h2>
            <p>
              Our municipal support team is available to assist you with tax
              assessments and fee calculations. Visit the municipal building or
              contact our hotline.
            </p>

            <div className="taxes-help-actions">
              <button
                className="taxes-white-btn"
                type="button"
              onClick={() => {
                navigate("/contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              >
                Contact Support
              </button>
              <button className="taxes-transparent-btn" type="button">
                View FAQ
              </button>
            </div>
          </div>
        </div>
      </main>

      <FeeDetailModal
        fee={selectedFee}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

function TaxCategoryCard({ category, onViewDetails }) {
  const Icon = category.icon;

  return (
    <div className="tax-card">
      <div className="tax-card-header">
        <div className="tax-card-header-top">
          <div className="tax-card-icon-box">
            <Icon size={28} strokeWidth={1.6} />
          </div>

          <span className="tax-card-fees-count">
            {category.fees.length} Fees
          </span>
        </div>

        <h3>{category.title}</h3>
        <p className="tax-card-arabic">{category.arabicTitle}</p>
        <p className="tax-card-description">{category.description}</p>
      </div>

      <div className="tax-card-body">
        {category.fees.map((fee) => (
          <div
            key={fee.id}
            className="tax-fee-row"
            onClick={() => onViewDetails(fee)}
          >
            <div className="tax-fee-info">
              <h4>{fee.name}</h4>
              <p>{fee.estimatedAmount}</p>
            </div>

            <button
              className="tax-fee-arrow"
              type="button"
              aria-label={`View details for ${fee.name}`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="tax-card-footer">
        <button className="tax-info-btn" type="button">
          <Info size={16} />
          <span>General Information</span>
        </button>
      </div>
    </div>
  );
}

function FeeDetailModal({ fee, isOpen, onClose }) {
  if (!isOpen || !fee) return null;

  return (
    <div className="fee-modal-overlay">
      <div className="fee-modal-backdrop" onClick={onClose}></div>

      <div className="fee-modal-box" role="dialog" aria-modal="true">
        <div className="fee-modal-header">
          <div>
            <h3>{fee.name}</h3>
            {fee.arabicName && <p>{fee.arabicName}</p>}
          </div>

          <button
            onClick={onClose}
            className="fee-close-btn"
            aria-label="Close modal"
            type="button"
          >
            <X size={24} />
          </button>
        </div>

        <div className="fee-modal-body">
          <p className="fee-main-description">{fee.description}</p>

          <div className="fee-detail-grid">
            <div className="fee-detail-card">
              <div className="fee-detail-title">
                <AlertCircle size={20} />
                <h4>Conditions</h4>
              </div>
              <p>{fee.conditions}</p>
            </div>

            <div className="fee-detail-card">
              <div className="fee-detail-title">
                <Calendar size={20} />
                <h4>Payment Period</h4>
              </div>
              <p>{fee.paymentPeriod}</p>
            </div>

            <div className="fee-detail-card">
              <div className="fee-detail-title">
                <Wallet size={20} />
                <h4>Estimated Cost</h4>
              </div>
              <p className="fee-cost">{fee.estimatedAmount}</p>
            </div>

            <div className="fee-detail-card">
              <div className="fee-detail-title">
                <FileText size={20} />
                <h4>Required Documents</h4>
              </div>
              <ul>
                {fee.requiredDocuments.map((doc, idx) => (
                  <li key={idx}>{doc}</li>
                ))}
              </ul>
            </div>
          </div>

          {fee.notes && (
            <div className="fee-note-box">
              <span>Note:</span> {fee.notes}
            </div>
          )}
        </div>

        <div className="fee-modal-footer">
          <button
            onClick={onClose}
            className="fee-outline-btn"
            type="button"
          >
            Close
          </button>

          <button
            className="fee-green-btn"
            type="button"
            onClick={() =>
              alert("This feature would link to the application form or payment portal.")
            }
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}