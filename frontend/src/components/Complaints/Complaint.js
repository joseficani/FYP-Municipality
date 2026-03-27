// import "./Complaint.css";
// import { useRef, useState } from "react";
// import {
//   User,
//   Tag,
//   MapPin,
//   FileText,
//   Camera,
//   Truck,
//   TreePine,
//   Zap,
//   HelpCircle,
//   Droplet,
//   AlertTriangle,
//   Upload,
//   X,
//   Image as ImageIcon,
// } from "lucide-react";

// export default function ComplaintPage() {
//   const [citizenData, setCitizenData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });

//   const [complaintData, setComplaintData] = useState({
//     category: "",
//     priority: "Low",
//     location: "",
//     description: "",
//   });

//   const [images, setImages] = useState([]);
//   const [isDragging, setIsDragging] = useState(false);

//   const [mapPin, setMapPin] = useState(null);

//   const fileInputRef = useRef(null);

//   const citizenRef = useRef(null);
//   const categoryRef = useRef(null);
//   const locationRef = useRef(null);
//   const detailsRef = useRef(null);
//   const photosRef = useRef(null);

//   const calculateStep = () => {
//     let step = 1;
//     if (citizenData.name && citizenData.email) step = 2;
//     if (step === 2 && complaintData.category) step = 3;
//     if (step === 3 && complaintData.location) step = 4;
//     if (step === 4 && complaintData.description) step = 5;
//     return step;
//   };

//   const handleSubmit = () => {
//     alert("Complaint submitted successfully!");
//   };

//   const scrollToSection = (stepId) => {
//     const refs = {
//       1: citizenRef,
//       2: categoryRef,
//       3: locationRef,
//       4: detailsRef,
//       5: photosRef,
//     };

//     refs[stepId]?.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   };

//   const processFiles = (fileList) => {
//     const files = Array.from(fileList);
//     const allowedFiles = files.slice(0, 4 - images.length);

//     allowedFiles.forEach((file) => {
//       if (!file.type.startsWith("image/")) return;

//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImages((prev) => [
//           ...prev,
//           {
//             id: `${file.name}-${Date.now()}-${Math.random()}`,
//             name: file.name,
//             src: e.target.result,
//           },
//         ]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       processFiles(e.target.files);
//     }
//   };

//   const handleAddImage = () => {
//     if (images.length >= 4) return;
//     fileInputRef.current?.click();
//   };

//   const removeImage = (id) => {
//     setImages((prev) => prev.filter((img) => img.id !== id));
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);

//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       processFiles(e.dataTransfer.files);
//     }
//   };

//   const handleMapClick = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - rect.left) / rect.width) * 100;
//     const y = ((e.clientY - rect.top) / rect.height) * 100;

//     setMapPin({ x, y });

//     const locationText = `Pinned at (${x.toFixed(1)}%, ${y.toFixed(1)}%)`;
//     setComplaintData((prev) => ({
//       ...prev,
//       location: locationText,
//     }));
//   };

//   const categories = [
//     { id: "roads", label: "Roads", icon: Truck },
//     { id: "water", label: "Water Supply", icon: Droplet },
//     { id: "electricity", label: "Electricity", icon: Zap },
//     { id: "sanitation", label: "Sanitation", icon: AlertTriangle },
//     { id: "parks", label: "Parks", icon: TreePine },
//     { id: "other", label: "Other", icon: HelpCircle },
//   ];

//   const priorities = ["Low", "Medium", "High", "Critical"];

//   const steps = [
//     { id: 1, label: "Personal", icon: User },
//     { id: 2, label: "Category", icon: Tag },
//     { id: 3, label: "Location", icon: MapPin },
//     { id: 4, label: "Details", icon: FileText },
//     { id: 5, label: "Photos", icon: Camera },
//   ];

//   const currentStep = calculateStep();

//   return (
//     <div className="cmpPage">
//       <div className="complaintHeroSection">
//         <div className="complaintHeroOverlay"></div>

//         <div className="complaintHeroContent">
//           <div className="complaintBreadcrumb">
//             <span>Home</span>
//             <span>/</span>
//             <span>Services</span>
//             <span>/</span>
//             <span className="complaintActivePage">Complaints</span>
//           </div>

//           <h1>We&apos;re Here to Help</h1>

//           <p>Report an issue and we&apos;ll take care of it.</p>
//         </div>
//       </div>

//       <main className="cmpMain">
//         <div className="cmpLayout">
//           <div className="cmpLeft">
//             <div className="cmpProgressWrap">
//               <div className="cmpProgressLine" />
//               <div
//                 className="cmpProgressLineActive"
//                 style={{
//                   width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
//                 }}
//               />

//               {steps.map((step) => {
//                 const Icon = step.icon;
//                 const isActive = step.id <= currentStep;

//                 return (
//                   <button
//                     key={step.id}
//                     type="button"
//                     className="cmpStepItem cmpStepButton"
//                     onClick={() => scrollToSection(step.id)}
//                   >
//                     <div
//                       className={`cmpStepCircle ${
//                         isActive ? "cmpStepCircleActive" : ""
//                       }`}
//                     >
//                       <Icon size={15} />
//                     </div>
//                     <span
//                       className={`cmpStepLabel ${
//                         isActive ? "cmpStepLabelActive" : ""
//                       }`}
//                     >
//                       {step.label}
//                     </span>
//                   </button>
//                 );
//               })}
//             </div>

//             <div className="cmpCard" ref={citizenRef}>
//               <h2 className="cmpCardTitle">Citizen Details</h2>

//               <div className="cmpGridTwo">
//                 <div className="cmpField">
//                   <label>Full Name</label>
//                   <input
//                     type="text"
//                     value={citizenData.name}
//                     onChange={(e) =>
//                       setCitizenData((prev) => ({
//                         ...prev,
//                         name: e.target.value,
//                       }))
//                     }
//                     placeholder="John Doe"
//                   />
//                 </div>

//                 <div className="cmpField">
//                   <label>Email Address</label>
//                   <input
//                     type="email"
//                     value={citizenData.email}
//                     onChange={(e) =>
//                       setCitizenData((prev) => ({
//                         ...prev,
//                         email: e.target.value,
//                       }))
//                     }
//                     placeholder="john@example.com"
//                   />
//                 </div>

//                 <div className="cmpField">
//                   <label>Phone Number</label>
//                   <input
//                     type="tel"
//                     value={citizenData.phone}
//                     onChange={(e) =>
//                       setCitizenData((prev) => ({
//                         ...prev,
//                         phone: e.target.value,
//                       }))
//                     }
//                     placeholder="+1 (555) 000-0000"
//                   />
//                 </div>

//                 <div className="cmpField">
//                   <label>Residential Address</label>
//                   <input
//                     type="text"
//                     value={citizenData.address}
//                     onChange={(e) =>
//                       setCitizenData((prev) => ({
//                         ...prev,
//                         address: e.target.value,
//                       }))
//                     }
//                     placeholder="123 Main St, Apt 4B"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="cmpCard" ref={categoryRef}>
//               <h2 className="cmpCardTitle">Complaint Category</h2>

//               <div className="cmpFieldGroup">
//                 <label>Select Category</label>

//                 <div className="cmpCategoryGrid">
//                   {categories.map((cat) => {
//                     const Icon = cat.icon;
//                     const isSelected = complaintData.category === cat.id;

//                     return (
//                       <button
//                         key={cat.id}
//                         type="button"
//                         className={`cmpCategoryBtn ${
//                           isSelected ? "cmpCategoryBtnActive" : ""
//                         }`}
//                         onClick={() =>
//                           setComplaintData((prev) => ({
//                             ...prev,
//                             category: cat.id,
//                           }))
//                         }
//                       >
//                         <Icon size={20} />
//                         <span>{cat.label}</span>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               <div className="cmpFieldGroup">
//                 <label>Priority Level</label>

//                 <div className="cmpPriorityRow">
//                   {priorities.map((p) => (
//                     <button
//                       key={p}
//                       type="button"
//                       className={`cmpPriorityBtn ${
//                         complaintData.priority === p
//                           ? "cmpPriorityBtnActive"
//                           : ""
//                       }`}
//                       onClick={() =>
//                         setComplaintData((prev) => ({
//                           ...prev,
//                           priority: p,
//                         }))
//                       }
//                     >
//                       {p}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="cmpCard" ref={locationRef}>
//               <h2 className="cmpCardTitle">Incident Location</h2>

//               <div className="cmpMapBox" onClick={handleMapClick}>
//                 {mapPin ? (
//                   <div
//                     className="cmpMapSelectedPin"
//                     style={{
//                       left: `${mapPin.x}%`,
//                       top: `${mapPin.y}%`,
//                     }}
//                   >
//                     <MapPin size={22} />
//                   </div>
//                 ) : null}

//                 <div className="cmpMapPinWrap">
//                   <MapPin size={20} />
//                 </div>
//                 <span>Click to mark incident on map</span>
//               </div>

//               <div className="cmpField cmpTopSpace">
//                 <label>Address or Landmark</label>
//                 <input
//                   type="text"
//                   value={complaintData.location}
//                   onChange={(e) =>
//                     setComplaintData((prev) => ({
//                       ...prev,
//                       location: e.target.value,
//                     }))
//                   }
//                   placeholder="e.g., Near Central Park Entrance, 5th Avenue"
//                 />
//               </div>
//             </div>

//             <div className="cmpCard" ref={detailsRef}>
//               <h2 className="cmpCardTitle">Description</h2>

//               <div className="cmpTextareaWrap">
//                 <textarea
//                   rows={6}
//                   maxLength={500}
//                   value={complaintData.description}
//                   onChange={(e) =>
//                     setComplaintData((prev) => ({
//                       ...prev,
//                       description: e.target.value,
//                     }))
//                   }
//                   placeholder="Please describe the issue in detail..."
//                 />
//                 <div className="cmpCharCount">
//                   {complaintData.description.length} / 500
//                 </div>
//               </div>

//               <p className="cmpHelpText">
//                 Please include specific details that will help our team identify
//                 and resolve the issue.
//               </p>
//             </div>

//             <div className="cmpCard" ref={photosRef}>
//               <div className="cmpCardHeaderRow">
//                 <h2 className="cmpCardTitle">Evidence Photos</h2>
//                 <span className="cmpUploadCount">{images.length}/4 uploaded</span>
//               </div>

//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 className="cmpHiddenFileInput"
//                 onChange={handleFileChange}
//               />

//               <div
//                 className={`cmpUploadBox ${
//                   isDragging ? "cmpUploadBoxActive" : ""
//                 }`}
//                 onDragOver={handleDragOver}
//                 onDragLeave={handleDragLeave}
//                 onDrop={handleDrop}
//               >
//                 <div className="cmpUploadIcon">
//                   <Upload size={26} />
//                 </div>
//                 <h3>Drag &amp; drop photos here</h3>
//                 <p>or click to browse from your device</p>

//                 <button
//                   type="button"
//                   className="cmpSelectFilesBtn"
//                   onClick={handleAddImage}
//                   disabled={images.length >= 4}
//                 >
//                   Select Files
//                 </button>
//               </div>

//               {images.length > 0 && (
//                 <div className="cmpImageGrid">
//                   {images.map((img) => (
//                     <div key={img.id} className="cmpImageCard">
//                       {img.src ? (
//                         <img
//                           src={img.src}
//                           alt={img.name}
//                           className="cmpUploadedImage"
//                         />
//                       ) : (
//                         <div className="cmpImagePlaceholder">
//                           <ImageIcon size={24} />
//                         </div>
//                       )}

//                       <button
//                         type="button"
//                         className="cmpRemoveImageBtn"
//                         onClick={() => removeImage(img.id)}
//                       >
//                         <X size={14} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="cmpSubmitRow">
//               <button
//                 type="button"
//                 className="cmpSubmitBtn"
//                 onClick={handleSubmit}
//               >
//                 Submit Complaint
//               </button>
//             </div>
//           </div>

//           <div className="cmpRight">
//             <div className="cmpSideCard">
//               <h3>To reach our team faster</h3>

//               <ul className="cmpTipsList">
//                 <li>
//                   <MapPin size={15} />
//                   <span>Be specific about where the issue happened.</span>
//                 </li>
//                 <li>
//                   <Camera size={15} />
//                   <span>Upload photos to help us verify the issue quickly.</span>
//                 </li>
//                 <li>
//                   <FileText size={15} />
//                   <span>Give enough detail so the team can act directly.</span>
//                 </li>
//               </ul>
//             </div>

//             <div className="cmpContactCard">
//               <div className="cmpContactItem">+1 555 123 456</div>
//               <div className="cmpContactItem">help@municipality.gov</div>
//               <div className="cmpContactItem">Live support available</div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <button
//         className="cmpScrollTopBtn"
//         onClick={() =>
//             window.scrollTo({
//             top: 0,
//             behavior: "smooth",
//             })
//         }
//         >
//         ↑
//       </button>
//     </div>
//   );
// }

import "./Complaint.css";
import { useRef, useState } from "react";
import {
  User,
  Tag,
  MapPin,
  FileText,
  Camera,
  Truck,
  TreePine,
  Zap,
  HelpCircle,
  Droplet,
  AlertTriangle,
  Upload,
  X,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";

export default function ComplaintPage() {
  const [citizenData, setCitizenData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [complaintData, setComplaintData] = useState({
    category: "",
    priority: "Low",
    location: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [mapPin, setMapPin] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const fileInputRef = useRef(null);

  const citizenRef = useRef(null);
  const categoryRef = useRef(null);
  const locationRef = useRef(null);
  const detailsRef = useRef(null);
  const photosRef = useRef(null);

  const calculateStep = () => {
    let step = 1;
    if (citizenData.name && citizenData.email) step = 2;
    if (step === 2 && complaintData.category) step = 3;
    if (step === 3 && complaintData.location) step = 4;
    if (step === 4 && complaintData.description) step = 5;
    return step;
  };

  const scrollToSection = (stepId) => {
    const refs = {
      1: citizenRef,
      2: categoryRef,
      3: locationRef,
      4: detailsRef,
      5: photosRef,
    };

    refs[stepId]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const processFiles = (fileList) => {
    const files = Array.from(fileList);
    const allowedFiles = files.slice(0, 4 - images.length);

    allowedFiles.forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prev) => [
          ...prev,
          {
            id: `${file.name}-${Date.now()}-${Math.random()}`,
            name: file.name,
            src: e.target.result,
            file,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleAddImage = () => {
    if (images.length >= 4) return;
    fileInputRef.current?.click();
  };

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMapPin({ x, y });

    const locationText = `Pinned at (${x.toFixed(1)}%, ${y.toFixed(1)}%)`;
    setComplaintData((prev) => ({
      ...prev,
      location: locationText,
    }));
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleSubmit = async () => {
    try {
      if (isSubmitting) return;

      if (
        !citizenData.name.trim() ||
        !citizenData.email.trim() ||
        !complaintData.category ||
        !complaintData.location.trim() ||
        !complaintData.description.trim()
      ) {
        alert("Please fill all required fields.");
        return;
      }

      setIsSubmitting(true);

      const formData = new FormData();

      formData.append("name", citizenData.name);
      formData.append("email", citizenData.email);
      formData.append("phone", citizenData.phone);
      formData.append("address", citizenData.address);

      formData.append("category", complaintData.category);
      formData.append("priority", complaintData.priority);
      formData.append("location", complaintData.location);
      formData.append("description", complaintData.description);

      if (mapPin) {
        formData.append("mapPinX", mapPin.x);
        formData.append("mapPinY", mapPin.y);
      }

      images.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file);
        }
      });

      const response = await fetch("http://localhost:5000/api/complaints", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit complaint.");
      }

      setCitizenData({
        name: "",
        email: "",
        phone: "",
        address: "",
      });

      setComplaintData({
        category: "",
        priority: "Low",
        location: "",
        description: "",
      });

      setImages([]);
      setMapPin(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Submit complaint error:", error);
      alert(error.message || "Something went wrong while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { id: "roads", label: "Roads", icon: Truck },
    { id: "water", label: "Water Supply", icon: Droplet },
    { id: "electricity", label: "Electricity", icon: Zap },
    { id: "sanitation", label: "Sanitation", icon: AlertTriangle },
    { id: "parks", label: "Parks", icon: TreePine },
    { id: "other", label: "Other", icon: HelpCircle },
  ];

  const priorities = ["Low", "Medium", "High", "Critical"];

  const steps = [
    { id: 1, label: "Personal", icon: User },
    { id: 2, label: "Category", icon: Tag },
    { id: 3, label: "Location", icon: MapPin },
    { id: 4, label: "Details", icon: FileText },
    { id: 5, label: "Photos", icon: Camera },
  ];

  const currentStep = calculateStep();

  return (
    <div className="cmpPage">
      <div className="complaintHeroSection">
        <div className="complaintHeroOverlay"></div>

        <div className="complaintHeroContent">
          <div className="complaintBreadcrumb">
            <span>Home</span>
            <span>/</span>
            <span>Services</span>
            <span>/</span>
            <span className="complaintActivePage">Complaints</span>
          </div>

          <h1>We&apos;re Here to Help</h1>
          <p>Report an issue and we&apos;ll take care of it.</p>
        </div>
      </div>

      <main className="cmpMain">
        <div className="cmpLayout">
          <div className="cmpLeft">
            <div className="cmpProgressWrap">
              <div className="cmpProgressLine" />
              <div
                className="cmpProgressLineActive"
                style={{
                  width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                }}
              />

              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = step.id <= currentStep;

                return (
                  <button
                    key={step.id}
                    type="button"
                    className="cmpStepItem cmpStepButton"
                    onClick={() => scrollToSection(step.id)}
                  >
                    <div
                      className={`cmpStepCircle ${
                        isActive ? "cmpStepCircleActive" : ""
                      }`}
                    >
                      <Icon size={15} />
                    </div>
                    <span
                      className={`cmpStepLabel ${
                        isActive ? "cmpStepLabelActive" : ""
                      }`}
                    >
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="cmpCard" ref={citizenRef}>
              <h2 className="cmpCardTitle">Citizen Details</h2>

              <div className="cmpGridTwo">
                <div className="cmpField">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={citizenData.name}
                    onChange={(e) =>
                      setCitizenData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="John Doe"
                  />
                </div>

                <div className="cmpField">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={citizenData.email}
                    onChange={(e) =>
                      setCitizenData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="john@example.com"
                  />
                </div>

                <div className="cmpField">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={citizenData.phone}
                    onChange={(e) =>
                      setCitizenData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="cmpField">
                  <label>Residential Address</label>
                  <input
                    type="text"
                    value={citizenData.address}
                    onChange={(e) =>
                      setCitizenData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    placeholder="123 Main St, Apt 4B"
                  />
                </div>
              </div>
            </div>

            <div className="cmpCard" ref={categoryRef}>
              <h2 className="cmpCardTitle">Complaint Category</h2>

              <div className="cmpFieldGroup">
                <label>Select Category</label>

                <div className="cmpCategoryGrid">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = complaintData.category === cat.id;

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        className={`cmpCategoryBtn ${
                          isSelected ? "cmpCategoryBtnActive" : ""
                        }`}
                        onClick={() =>
                          setComplaintData((prev) => ({
                            ...prev,
                            category: cat.id,
                          }))
                        }
                      >
                        <Icon size={20} />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="cmpFieldGroup">
                <label>Priority Level</label>

                <div className="cmpPriorityRow">
                  {priorities.map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`cmpPriorityBtn ${
                        complaintData.priority === p
                          ? "cmpPriorityBtnActive"
                          : ""
                      }`}
                      onClick={() =>
                        setComplaintData((prev) => ({
                          ...prev,
                          priority: p,
                        }))
                      }
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="cmpCard" ref={locationRef}>
              <h2 className="cmpCardTitle">Incident Location</h2>

              <div className="cmpMapBox" onClick={handleMapClick}>
                {mapPin ? (
                  <div
                    className="cmpMapSelectedPin"
                    style={{
                      left: `${mapPin.x}%`,
                      top: `${mapPin.y}%`,
                    }}
                  >
                    <MapPin size={22} />
                  </div>
                ) : null}

                <div className="cmpMapPinWrap">
                  <MapPin size={20} />
                </div>
                <span>Click to mark incident on map</span>
              </div>

              <div className="cmpField cmpTopSpace">
                <label>Address or Landmark</label>
                <input
                  type="text"
                  value={complaintData.location}
                  onChange={(e) =>
                    setComplaintData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  placeholder="e.g., Near Central Park Entrance, 5th Avenue"
                />
              </div>
            </div>

            <div className="cmpCard" ref={detailsRef}>
              <h2 className="cmpCardTitle">Description</h2>

              <div className="cmpTextareaWrap">
                <textarea
                  rows={6}
                  maxLength={500}
                  value={complaintData.description}
                  onChange={(e) =>
                    setComplaintData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Please describe the issue in detail..."
                />
                <div className="cmpCharCount">
                  {complaintData.description.length} / 500
                </div>
              </div>

              <p className="cmpHelpText">
                Please include specific details that will help our team identify
                and resolve the issue.
              </p>
            </div>

            <div className="cmpCard" ref={photosRef}>
              <div className="cmpCardHeaderRow">
                <h2 className="cmpCardTitle">Evidence Photos</h2>
                <span className="cmpUploadCount">{images.length}/4 uploaded</span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="cmpHiddenFileInput"
                onChange={handleFileChange}
              />

              <div
                className={`cmpUploadBox ${
                  isDragging ? "cmpUploadBoxActive" : ""
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="cmpUploadIcon">
                  <Upload size={26} />
                </div>
                <h3>Drag &amp; drop photos here</h3>
                <p>or click to browse from your device</p>

                <button
                  type="button"
                  className="cmpSelectFilesBtn"
                  onClick={handleAddImage}
                  disabled={images.length >= 4}
                >
                  Select Files
                </button>
              </div>

              {images.length > 0 && (
                <div className="cmpImageGrid">
                  {images.map((img) => (
                    <div key={img.id} className="cmpImageCard">
                      {img.src ? (
                        <img
                          src={img.src}
                          alt={img.name}
                          className="cmpUploadedImage"
                        />
                      ) : (
                        <div className="cmpImagePlaceholder">
                          <ImageIcon size={24} />
                        </div>
                      )}

                      <button
                        type="button"
                        className="cmpRemoveImageBtn"
                        onClick={() => removeImage(img.id)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="cmpSubmitRow">
              <button
                type="button"
                className="cmpSubmitBtn"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Complaint"}
              </button>
            </div>
          </div>

          <div className="cmpRight">
            <div className="cmpSideCard">
              <h3>To reach our team faster</h3>

              <ul className="cmpTipsList">
                <li>
                  <MapPin size={15} />
                  <span>Be specific about where the issue happened.</span>
                </li>
                <li>
                  <Camera size={15} />
                  <span>Upload photos to help us verify the issue quickly.</span>
                </li>
                <li>
                  <FileText size={15} />
                  <span>Give enough detail so the team can act directly.</span>
                </li>
              </ul>
            </div>

            <div className="cmpContactCard">
              <div className="cmpContactItem">+1 555 123 456</div>
              <div className="cmpContactItem">help@municipality.gov</div>
              <div className="cmpContactItem">Live support available</div>
            </div>
          </div>
        </div>
      </main>

      {showSuccessPopup && (
        <div className="cmpModalOverlay" onClick={closeSuccessPopup}>
          <div className="cmpModalCard" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="cmpModalClose"
              onClick={closeSuccessPopup}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="cmpModalIconWrap">
              <CheckCircle2 size={44} />
            </div>

            <h3 className="cmpModalTitle">Complaint Submitted</h3>
            <p className="cmpModalText">
              Your complaint has been sent successfully. Our team will review it
              as soon as possible.
            </p>

            <button
              type="button"
              className="cmpModalButton"
              onClick={closeSuccessPopup}
            >
              Done
            </button>
          </div>
        </div>
      )}

      <button
        className="cmpScrollTopBtn"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      >
        ↑
      </button>
    </div>
  );
}