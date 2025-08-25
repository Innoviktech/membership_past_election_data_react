import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Download, FileText, X, Upload, Trash } from 'lucide-react';
import './VoterServices.scss';
import { useDispatch } from 'react-redux';
import { convertUploadedPdf, getConstituancyListByDistrict, getDistrictListByState, getPdfPageCount, getPolingBooth, getPolingStationEditablePdf, getPollingBoothListByConstituancy, getStateList } from '../Store/Middleware/VoterApiServices';
import SpinnerService from '../Components/Spinner/SpinnerService';
import HeaderNavbar from '../Components/HeaderNavbar';
import { Link, useLocation } from 'react-router-dom';
import LoadingModal from '../Components/LoadingModal/LoadingModal';
import { saveAs } from 'file-saver';
import { useMessage } from '../Components/MessageModel/useMessage';
// import { Tabs, Select, Button, Upload, Table, message, Spin } from "antd";
// import { UploadOutlined } from "@ant-design/icons";

const VoterServices = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [constituencies, setConstituencies] = useState([]);
  const [pollingBooths, setPollingBooths] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedConstituency, setSelectedConstituency] = useState('');
  const [selectedPollingBooth, setSelectedPollingBooth] = useState('');
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);
  const [isConstituencyDropdownOpen, setIsConstituencyDropdownOpen] = useState(false);
  const [isPollingBoothDropdownOpen, setIsPollingBoothDropdownOpen] = useState(false);
  const [availablePDFs, setAvailablePDFs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const [paymentId, setPaymentId] = useState('');
  const [amount, setAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { showMessage } = useMessage();
  const [activeTab, setActiveTab] = useState('search');
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  
  const sidebarRef = useRef(null);

  // Check if mobile view on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // API calls
  const fetchStates = () => {
    SpinnerService.show();
    dispatch(getStateList())
    .then((res) => {
      if (res.type.endsWith("rejected")) {
        setStates([]);
        setSelectedDistrict('');
        setSelectedConstituency('');
        setSelectedPollingBooth('');
        showMessage("error", res.payload); // payload is just a string now
        return;
      }
      setStates(res.payload || []);
      setSelectedDistrict('');
      setSelectedConstituency('');
      setSelectedPollingBooth('');
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
        SpinnerService.hide();
    });
  };

  const fetchDistricts = (stateId) => {
    SpinnerService.show();
    dispatch(getDistrictListByState({state_id: stateId}))
    .then((res) => {
      if (res.type.endsWith("rejected")) {
        setDistricts([]);
        setConstituencies([]);
        setPollingBooths([]);
        setSelectedDistrict('');
        setSelectedConstituency('');
        setSelectedPollingBooth('');
        showMessage("error", res.payload); // payload is just a string now
        return;
      }
      setDistricts(res.payload || []);
      setSelectedDistrict('');
      setSelectedConstituency('');
      setSelectedPollingBooth('');
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        SpinnerService.hide();
    });
  };

  const fetchConstituencies = async (stateId, districtId) => {
    SpinnerService.show();
    dispatch(getConstituancyListByDistrict({district_id: districtId }))
    .then((res) => {
      if (res.type.endsWith("rejected")) {
        setConstituencies([]);
        setPollingBooths([]);
        setSelectedConstituency('');
        setSelectedPollingBooth('');
        showMessage("error", res.payload); // payload is just a string now
        return;
      }
      setConstituencies(res.payload || []);
      setPollingBooths([]);
      setSelectedConstituency('');
      setSelectedPollingBooth('');
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        SpinnerService.hide();
    });
  };

  const fetchPollingBooth = async (stateId, districtId, constituancyId) => {
    SpinnerService.show();
    dispatch(getPollingBoothListByConstituancy({constituancy_id: constituancyId }))
    .then((res) => {
      if (res.type.endsWith("rejected")) {
        setPollingBooths([]);
        setSelectedConstituency('');
        setSelectedPollingBooth('');
        showMessage("error", res.payload); // payload is just a string now
        return;
      }
      setPollingBooths(res.payload || []);
      setSelectedPollingBooth('');
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
        SpinnerService.hide();
    });
  };

  const searchElectoralRoll = async (constituencyId, pollingBoothId) => {
  if (!selectedState || !selectedDistrict || !selectedConstituency) {
    alert('Please select State, District and Constituency');
    return;
  }
  
  setIsLoading(true);
  SpinnerService.show();
  
  try {
    // Fixed the conditional parameter logic
    const params = pollingBoothId 
      ? { polling_station_id: pollingBoothId }
      : { constituency_id: constituencyId };
    
    const res = await dispatch(getPolingBooth(params));
    
    if (res.type.endsWith("rejected")) {
      showMessage("error", res.payload);
      return;
    }
    
    const pollingBoothDetails = res.payload?.data || [];
    const pollingPdfDetails = normalizePdfData(pollingBoothDetails);
    setAvailablePDFs(pollingPdfDetails);
    
  } catch (err) {
    console.error('Error searching electoral roll:', err);
    // showMessage("error", "Failed to fetch electoral roll data");
  } finally {
    setIsLoading(false);
    SpinnerService.hide();
  }
};

  const onHandlePayment = async (e, pdfId, pdfName) => {
    e.preventDefault();
    setAmount(2);
      try {

        let options = {
          key: `${import.meta.env.VITE_KEY_ID}`,
          amount: amount * 100,
          currency: "INR",
          name: "Manickam Academy ",
          description: "Investment Fee",
          image:"data:image/jpeg;base64,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",
          handler: function (response) {
            setPaymentId(response.razorpay_payment_id);
            convertToEditablePdf(pdfId, pdfName);
          },
          notes: {
            address: "Pallavaram, Chennai, Tamil Nadu, India",
          },
          theme: {
            color: "blue",
          },
        };
        let rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          console.log(response.error);
        });
        rzp1.on("payment.cancel", function (response) {
          console.log(response);
        });
        rzp1.on("payment.cancelled", function (response) {
          console.log(response);
        });
        rzp1.open();
    } catch (err) {
      console.error("Error accessing camera : " + err.message);
    }
  }

  const convertToEditablePdf = async (pdfId, pdfName) => {
    // Show loading modal
    setModalMessage('Converting PDF to editable format...');
    setIsModalOpen(true);
    
    // Set a timeout to show the modal if the API takes too long
    const timeoutId = setTimeout(() => {
      setModalMessage('This conversion process is taking longer than usual. Please wait...');
    }, 10000); // Change message after 5 seconds

    try {
      const response = await dispatch(getPolingStationEditablePdf({ attach_id: pdfId }));

      if (response.type.endsWith("rejected")) {
        showMessage("error", res.payload); // payload is just a string now
        return;
      }
      
      clearTimeout(timeoutId); // Clear the timeout if the API responds before 5 seconds
      
      const convertedPdfData = response?.payload || {};
      setAvailablePDFs((prevData) => normalizePdfData(convertedPdfData, prevData));
      
      if (response?.payload?.file_url) {
        const editablePdf = response.payload.file_url;
        // Derive filename immediately from URL if not present
        const fileNameFromUrl = editablePdf.split('/').pop();
        const finalFileName = pdfName || fileNameFromUrl || 'document.pdf';
        downloadPdfWithFileSaver(editablePdf, finalFileName);
      }
    } catch (err) {
      console.log(err);
      // Update modal to show error
      setModalMessage('Error converting PDF. Please try again.');
      // Keep modal open for a few seconds to show error
      setTimeout(() => setIsModalOpen(false), 3000);
    } finally {
      setIsModalOpen(false); // Close modal when done
    }
  };

  // 🏆 SIMPLIFIED BEST METHOD - Just 2 approaches
  const downloadPdfWithFileSaver = async (pdfUrl, pdfName = "document.pdf") => {
    SpinnerService.show();
    try {
      // 🚀 PRIMARY: Fetch and download (works for all scenarios)
      const response = await fetch(pdfUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Smart file size detection
      const contentLength = response.headers.get('content-length');
      const fileSize = parseInt(contentLength, 10);
      
      if (!fileSize || fileSize < 10 * 1024 * 1024) { // < 10MB
        // Fast blob method for smaller files
        const blob = await response.blob();
        const pdfBlob = blob.type === 'application/pdf' 
          ? blob 
          : new Blob([blob], { type: 'application/pdf' });
        saveAs(pdfBlob, pdfName);
      } else {
        // Streaming method for larger files
        const reader = response.body.getReader();
        const chunks = [];

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
          }
        } finally {
          reader.releaseLock();
        }

        const blob = new Blob(chunks, { type: 'application/pdf' });
        saveAs(blob, pdfName);
      }

      SpinnerService.hide();
      // window.open(pdfUrl, '_self');
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Download failed, opening in new tab:', error);
      
      // 🆘 FALLBACK: Open in new tab only when download fails
      const tempLink = document.createElement('a');
      tempLink.href = pdfUrl;
      tempLink.target = '_blank';
      tempLink.rel = 'noopener noreferrer';
      tempLink.style.display = 'none';
      
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);

      SpinnerService.hide();
    }
  };

  const normalizePdfData = (pdfData, existingData = []) => {
    // Case 1: First API — array of polling stations
    if (Array.isArray(pdfData)) {
      return pdfData.map(item => ({
        polling_station_id: item.polling_station_id || null,
        polling_station_name: item.polling_station_name || 'N/A',
        polling_station_address: item.polling_station_address || 'N/A',
        constituancy_name: item.constituancy_name || 'N/A',
        // Note: First API doesn't have attach_id at the top level, only in pdfs array
        pdfs: (item.pdfs || []).map(pdf => ({
          pdf_name: pdf.pdf_name || null,
          attach_id: pdf.attach_id || null,
          url: pdf.url || null,  // Note: First API uses 'url' not 'file_url'
          file_url: pdf.file_url || null,    // This will be added later from second API
          file_name: pdf.file_name || null,
          pdf_exists: !!pdf.pdf_exists
        }))
      }));
    }

    // Case 2: Second API — update PDF for a specific attach_id
    if (pdfData?.file_url) {
      // Extract attach_id from file_url (format: .../media/{attach_id}/...)
      const attachIdMatch = pdfData.file_url.match(/media\/(\d+)\//);
      const attach_id = attachIdMatch ? parseInt(attachIdMatch[1]) : null;

      // Extract file name (comes after the attach_id)
      const fileName = pdfData.file_url.split('/').pop();

      if (attach_id) {
        return existingData.map(row => {
          // Check if any pdf in this row has matching attach_id
          const updatedPdfs = row.pdfs.map(pdf => {
            if (pdf.attach_id === attach_id) {
              return {
                ...pdf,
                file_url: pdfData.file_url,
                file_name: fileName,
                pdf_exists: !!pdfData.pdf_exists
              };
            }
            return pdf;
          });

          return {
            ...row,
            pdfs: updatedPdfs
          };
        });
      }
    }

    return existingData;
  };

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetchDistricts(selectedState);
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedState && selectedDistrict) {
      fetchConstituencies(selectedState, selectedDistrict);
    }
  }, [selectedState, selectedDistrict]);

  useEffect(() => {
    if (selectedState && selectedDistrict && selectedConstituency) {
      fetchPollingBooth(selectedState, selectedDistrict, selectedConstituency);
    }
  }, [selectedState, selectedDistrict, selectedConstituency]);

  const handleDropdownToggle = (dropdownType) => {
    setIsStateDropdownOpen(dropdownType === 'state' ? !isStateDropdownOpen : false);
    setIsDistrictDropdownOpen(dropdownType === 'district' ? !isDistrictDropdownOpen : false);
    setIsConstituencyDropdownOpen(dropdownType === 'constituency' ? !isConstituencyDropdownOpen : false);
    setIsPollingBoothDropdownOpen(dropdownType === 'polling_booth' ? !isPollingBoothDropdownOpen : false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setIsStateDropdownOpen(false);
        setIsDistrictDropdownOpen(false);
        setIsConstituencyDropdownOpen(false);
        setIsPollingBoothDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStateSelect = (state) => {
    setSelectedState(state.state_id);
    setIsStateDropdownOpen(false);
    setAvailablePDFs([]);
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district.district_id);
    setIsDistrictDropdownOpen(false);
    setAvailablePDFs([]);
  };

  const handleConstituencySelect = (constituency) => {
    setSelectedConstituency(constituency.constituancy_id);
    setIsConstituencyDropdownOpen(false);
    setAvailablePDFs([]);
  };

  const handlePollingBoothSelect = (pollingBooth) => {
    setSelectedPollingBooth(pollingBooth.polling_id);
    setIsPollingBoothDropdownOpen(false);
    setAvailablePDFs([]);
  };

  const getSelectedStateName = () => {
    const state = states.find(s => s.state_id === selectedState);
    return state ? state.state_name : 'Select State';
  };

  const getSelectedDistrictName = () => {
    const district = districts.find(d => d.district_id === selectedDistrict);
    return district ? district.district_name : 'Select District';
  };

  const getSelectedConstituencyName = () => {
    const constituency = constituencies.find(c => c.constituancy_id === selectedConstituency);
    return constituency ? constituency.constituancy_name : 'Select Constituency';
  };

  const getSelectedPollingBoothName = () => {
    const booth = pollingBooths.find(p => p.polling_id === selectedPollingBooth);
    return booth ? booth.polling_station_name : 'Select Polling Booth';
  };

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validFiles = selectedFiles.filter(file => {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
      const validSize = file.size <= 10 * 1024 * 1024;
      return validTypes.includes(file.type) && validSize;
    });
    
    if (validFiles.length === 0) {
      event.target.value = ""; // reset input
      return;
    }
    
    // Add to files state
    setFiles(prev => [...prev, ...validFiles]);
    
    // Upload only the new files
    setTimeout(() => uploadFiles(validFiles), 0);

    // Reset input so user can re-select the same file again
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
      const validSize = file.size <= 10 * 1024 * 1024;
      return validTypes.includes(file.type) && validSize;
    });
    
    if (validFiles.length === 0) {
      event.target.value = ""; // reset input
      return;
    }
    
    // Add to files state
    setFiles(prev => [...prev, ...validFiles]);
    
    // Upload only the new files
    setTimeout(() => uploadFiles(validFiles), 0);

    // Reset input so user can re-select the same file again
    event.target.value = "";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removeFile = (index) => {
    // Get the file to be removed to calculate cost reduction
    const fileToRemove = uploadedFiles[index];
    
    if (fileToRemove) {
      // Reduce the total cost by the cost of the removed file
      setTotalCost(prev => prev - fileToRemove.cost);
      
      // Update the amount state as well
      setAmount(prevAmount => prevAmount - fileToRemove.cost);
    }
    
    // Remove from both files arrays
    setFiles(prev => prev.filter((_, i) => i !== index));
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (newFiles) => {
    if (newFiles.length === 0) return;
    
    setIsUploading(true);
    SpinnerService.show();
    try {
      const formData = new FormData();
      newFiles.forEach((file) => {
        formData.append('file', file);
      });

      const result = await dispatch(getPdfPageCount(formData)).unwrap();
      // Create uploaded data for the new files only
      const newUploadedData = newFiles.map((file, index) => {
        const fileResult = Array.isArray(result) ? result[index] : result;
        return {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          pages: fileResult?.page_count || 1,
          cost: (fileResult?.page_count || 1) * 5,
          size: file.size,
          type: file.type
        };
      });
      
      // Append only the new files to existing uploaded files
      setUploadedFiles(prev => [...prev, ...newUploadedData]);
      
      // Update total cost
      const newTotalCost = newUploadedData.reduce((sum, file) => sum + file.cost, 0);
      setTotalCost(prev => prev + newTotalCost);
      setAmount(prev => prev + newTotalCost);
    } catch (err) {
      const errorMessage = err.message || err.toString() || 'Upload failed'
      showMessage("error", errorMessage);
    } finally {
      setIsUploading(false);
      SpinnerService.hide();
    }
  };

  const payAndConvert = async (amount) => {
    // e.preventDefault(); 
    console.log('Pay Amount: ',amount);
      try {

        let options = {
          key: `${import.meta.env.VITE_KEY_ID}`,
          amount: amount * 100,
          currency: "INR",
          name: "Manickam Academy ",
          description: "Investment Fee",
          image:"data:image/jpeg;base64,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",
          handler: function (response) {
            setPaymentId(response.razorpay_payment_id);
            handleConvertToEditablePdf(files);
          },
          notes: {
            address: "Pallavaram, Chennai, Tamil Nadu, India",
          },
          theme: {
            color: "blue",
          },
        };
        let rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          console.log(response.error);
        });
        rzp1.on("payment.cancel", function (response) {
          console.log(response);
        });
        rzp1.on("payment.cancelled", function (response) {
          console.log(response);
        });
        rzp1.open();
    } catch (err) {
      console.error("Error accessing camera : " + err.message);
    }
  };

  const handleConvertToEditablePdf = async (files) => {
    // Show loading modal
    setModalMessage('Converting PDF to editable format...');
    setIsModalOpen(true);
    
    // Set a timeout to show the modal if the API takes too long
    const timeoutId = setTimeout(() => {
      setModalMessage('This conversion process is taking longer than usual. Do not refresh or close current window. Please wait...');
    }, 10000); // Change message after 5 seconds
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });

      const result = await dispatch(convertUploadedPdf(formData)).unwrap();
      // showMessage("success", result?.message);
      clearTimeout(timeoutId); // Clear the timeout if the API responds before 5 seconds
      // Map each uploaded file to its corresponding converted file by matching original filenames
      const converted = uploadedFiles.map(uploadedFile => {
        // Find the converted file that matches the original filename
        const convertedFile = result?.converted_files?.find(
          cf => cf.original_filename === uploadedFile.name
        ) || {};
        
        return {
          ...uploadedFile,
          convertedName: convertedFile.converted_filename,
          downloadUrl: convertedFile.file_url
        };
      });
      
      setConvertedFiles(converted);
      
      // Download all converted files automatically
      if (result?.converted_files?.length > 0) {
        result.converted_files.forEach(convertedFile => {
          const pdfUrl = convertedFile.file_url;
          const pdfName = convertedFile.converted_filename;
          // Download using your file saver function
          downloadPdfWithFileSaver(pdfUrl, pdfName);
        });
      }
      
    } catch (err) {
      console.error('Error converting files:', err);
      const errorMessage = err.message || err.toString() || 'Conversion failed';
      showMessage("error", errorMessage);
    } finally {
      setIsConverting(false);
      setIsModalOpen(false);
    }
  }

  const clearFiles = () => {
    setFiles([]);
    setUploadedFiles([]);
    setConvertedFiles([]);
    setTotalCost(0);
    setAmount(0); // Also reset amount
  
    // Reset file input to allow selecting files again
    const fileInput = document.getElementById('file-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const resetSearch = () => {
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedConstituency('');
    setSelectedPollingBooth('');
  };

  const handleDownload = (fileName, pdfUrl) => {
    // Simulate file download
    downloadPdfWithFileSaver(pdfUrl, fileName);
  };

  return (
  <>
    <HeaderNavbar />
    <div className="election-portal">
      <div className="main-container">
        {/* Main Content */}
        <main className="main-content">
          <div className="content-wrapper">
            <div className="tab-navigation">
              <button
                onClick={() => setActiveTab('search')}
                className={`tab-button ${activeTab === 'search' ? 'active' : 'inactive'}`}
              >
                Electoral Roll Search
              </button>
              <button
                onClick={() => setActiveTab('converter')}
                className={`tab-button ${activeTab === 'converter' ? 'active' : 'inactive'}`}
              >
                File Converter
              </button>
            </div>

            {activeTab === 'search' ? (
              // Search Form - FIXED: Removed invalid comment syntax
              <div>
                <div className="search-card">
                  <h1 className="search-title">Search Electoral Roll</h1>

                  {/* State Selection */}
                  <div className="form-group">
                    <label htmlFor="state-select" className="form-label">
                      Select State<span className="text-danger"> *</span>
                    </label>
                    <div className="dropdown-container">
                      <button
                        className="dropdown-button"
                        onClick={() => { handleDropdownToggle('state') }}
                        aria-expanded={isStateDropdownOpen}
                        aria-haspopup="listbox"
                      >
                        <span>{getSelectedStateName()}</span>
                        <ChevronDown 
                          size={20} 
                          className={`dropdown-arrow ${isStateDropdownOpen ? 'open' : ''}`}
                        />
                      </button>
                      
                      {isStateDropdownOpen && (
                        <div className="dropdown-menu" role="listbox">
                          {states.map(state => (
                            <button
                              key={state.state_id}
                              className="dropdown-item"
                              onClick={() => handleStateSelect(state)}
                              role="option"
                              aria-selected={selectedState === state.state_id}
                            >
                              {state.state_name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* District Selection */}
                  <div className="form-group">
                    <label htmlFor="district-select" className="form-label">
                      Select District<span className="text-danger"> *</span>
                    </label>
                    <div className="dropdown-container">
                      <button
                        className="dropdown-button"
                        onClick={() => {handleDropdownToggle('district')}}
                        disabled={!selectedState || districts.length === 0}
                        aria-expanded={isDistrictDropdownOpen}
                        aria-haspopup="listbox"
                      >
                        <span>
                          {districts.length === 0 && selectedState ? 
                            'Loading...' : 
                            getSelectedDistrictName()
                          }
                        </span>
                        <ChevronDown 
                          size={20} 
                          className={`dropdown-arrow ${isDistrictDropdownOpen ? 'open' : ''}`}
                        />
                      </button>
                      
                      {isDistrictDropdownOpen && districts.length > 0 && (
                        <div className="dropdown-menu" role="listbox">
                          {districts.map(district => (
                            <button
                              key={district.district_id}
                              className="dropdown-item"
                              onClick={() => handleDistrictSelect(district)}
                              role="option"
                              aria-selected={selectedDistrict === district.district_id}
                            >
                              {district.district_name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Constituency Selection */}
                  <div className="form-group">
                    <label htmlFor="constituency-select" className="form-label">
                      Select Constituency<span className="text-danger"> *</span>
                    </label>
                    <div className="dropdown-container">
                      <button
                        className="dropdown-button"
                        onClick={() => {handleDropdownToggle('constituency')}}
                        disabled={!selectedDistrict || constituencies.length === 0}
                        aria-expanded={isConstituencyDropdownOpen}
                        aria-haspopup="listbox"
                      >
                        <span>
                          {constituencies.length === 0 && selectedDistrict ? 
                            'Loading...' : 
                            getSelectedConstituencyName()
                          }
                        </span>
                        <ChevronDown 
                          size={20} 
                          className={`dropdown-arrow ${isConstituencyDropdownOpen ? 'open' : ''}`}
                        />
                      </button>
                      
                      {isConstituencyDropdownOpen && constituencies.length > 0 && (
                        <div className="dropdown-menu" role="listbox">
                          {constituencies.map(constituency => (
                            <button
                              key={constituency.constituancy_id}
                              className="dropdown-item"
                              onClick={() => handleConstituencySelect(constituency)}
                              role="option"
                              aria-selected={selectedConstituency === constituency.constituancy_id}
                            >
                              {constituency.constituancy_name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Polling Booth Selection */}
                  <div className="form-group">
                    <label htmlFor="polling-booth-select" className="form-label">
                      Select Polling Booth
                    </label>
                    <div className="dropdown-container">
                      <button
                        className="dropdown-button"
                        onClick={() => {handleDropdownToggle('polling_booth')}}
                        disabled={!selectedConstituency || pollingBooths.length === 0}
                        aria-expanded={isPollingBoothDropdownOpen}
                        aria-haspopup="listbox"
                      >
                        <span>
                          {pollingBooths.length === 0 && selectedPollingBooth ? 
                            'Loading...' : 
                            getSelectedPollingBoothName()
                          }
                        </span>
                        <ChevronDown 
                          size={20} 
                          className={`dropdown-arrow ${isPollingBoothDropdownOpen ? 'open' : ''}`}
                        />
                      </button>
                      
                      {isPollingBoothDropdownOpen && pollingBooths.length > 0 && (
                        <div className="dropdown-menu" role="listbox">
                          {pollingBooths.map(booth => (
                            <button
                              key={booth.polling_id}
                              className="dropdown-item"
                              onClick={() => handlePollingBoothSelect(booth)}
                              role="option"
                              aria-selected={selectedPollingBooth === booth.polling_id}
                            >
                              {booth.polling_station_name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Search Button */}
                  <div className="btn-group">
                    <button
                      onClick={resetSearch}
                      className="btn btn-secondary"
                    >
                      Reset
                    </button>
                    <button
                      className="search-button"
                      onClick={() => searchElectoralRoll(selectedConstituency, selectedPollingBooth)}
                      disabled={isLoading || !selectedState || !selectedDistrict || !selectedConstituency}
                    >
                      {isLoading && <span className="loading-spinner" />}
                      {isLoading ? 'Searching...' : 'Search'}
                    </button>
                  </div>
                </div>

                {/* Available PDFs Section - RESPONSIVE TABLE */}
                {availablePDFs.length > 0 && (
                  <div className="pdfs-section">
                    <h2 className="pdfs-title">Available PDFs</h2>
                    
                    <div className="pdf-table-container">
                      <div className="pdf-table-scroll">
                        <table className="pdf-table">
                          <thead>
                            <tr>
                              <th>SL.NO</th>
                              <th>POLLING STATION NAME</th>
                              <th>ADDRESS</th>
                              <th>CONSTITUENCY NAME</th>
                              <th>IMAGE PDF</th>
                              <th>CONVERT ACTION</th>
                            </tr>
                          </thead>
                          <tbody>
                            {availablePDFs.map((station, index) => (
                              <tr key={station.polling_station_id} className="pdf-table-row">
                                <td>{index + 1}</td>
                                <td>{station.polling_station_name}</td>
                                <td>{station.polling_station_address}</td>
                                <td>{station.constituancy_name}</td>
                                <td className="split-cell">
                                  {station.pdfs?.map((pdf, pdfIndex) => (
                                    <div key={`pdf-${pdfIndex}`} className="split-cell-row">
                                      <a
                                        href={pdf.url}
                                        className="pdf-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          downloadPdfWithFileSaver(pdf.url, pdf.pdf_name);
                                        }}
                                      >
                                        <FileText className="pdf-icon" />
                                        {pdf.pdf_name}
                                      </a>
                                    </div>
                                  ))}
                                </td>
                                <td className="split-btn-cell">
                                  {station.pdfs?.map((pdf, pdfIndex) => (
                                    pdf.file_url || pdf.pdf_exists === true ? (
                                      <div key={`action-${pdfIndex}`} className="split-cell-row">
                                        <button
                                          className="download-button"
                                          onClick={() => convertToEditablePdf(pdf.attach_id, pdf.file_name)}
                                          title={`Download editable ${pdf.pdf_name}`}
                                        >
                                          Download Converted PDF
                                        </button>
                                      </div>
                                    ) : (
                                      <div key={`action-${pdfIndex}`} className="split-cell-row">
                                        <button
                                          className="convert-button"
                                          onClick={() => convertToEditablePdf(pdf.attach_id, pdf.file_name)}
                                          title={`Convert ${pdf.pdf_name} to Editable`}
                                        >
                                          Convert to Editable
                                        </button>
                                      </div>
                                    )
                                  ))}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* File Converter Tab */
              <div className="space-y-6">
                <h2 className="main-title">
                  Upload & Convert to Editable File
                </h2>

                {/* File Upload Area */}
                {convertedFiles.length === 0 && (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="upload-area"
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="upload-icon">
                        <Upload />
                      </div>
                      <div className="text-center">
                        <p className="upload-text-primary">
                          Choose File or Drag & Drop
                        </p>
                        <p className="upload-text-secondary">
                          Supports PDF only up to 10MB
                        </p>
                      </div>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileSelect}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        className="file-input"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="upload-label"
                      >
                        Choose Files
                      </label>
                    </div>
                  </div>
                )}

                {/* Uploaded Files with Pricing */}
                {uploadedFiles.length > 0 && convertedFiles.length === 0 && (
                  <div className="space-y-6">
                    <h3 className="section-title">Upload & Convert Files<span className="title-rupee"> (₹5 per page)</span></h3>
                    <span></span>
                    <div className="file-list space-y-3">
                      {uploadedFiles.map((file, index) => (
                        <div key={file.id} className="file-item">
                          <div className="file-info">
                            <FileText className="file-icon" />
                            <span className="file-name">{file.name}</span>
                            <span className="file-details">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                            <span className="file-details">{file.pages} pages</span>
                            <div
                              onClick={() => removeFile(index)}
                              className="file-remove"
                            >
                              <X/>
                            </div>
                          </div>
                            <span className="file-cost">₹{file.cost}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pricing-section">
                      <div className="total-row">
                        <span className="total-label">Total</span>
                        <span className="total-amount">₹{totalCost}</span>
                      </div>
                      
                      <div className="btn-group">
                        <button
                          onClick={clearFiles}
                          className="btn btn-secondary"
                        >
                          Clear Files
                        </button>
                        <button
                          onClick={()=>{payAndConvert(totalCost)}}
                          // onClick={()=>{handleConvertToEditablePdf(files)}}
                          disabled={isConverting}
                          className="btn btn-primary"
                        >
                          {isConverting ? 'Processing Payment...' : 'Pay & Convert'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Converted Files */}
                {convertedFiles.length > 0 && (
                  <div className="space-y-6">
                    <div className="success-container">
                      <div className="success-icon">
                        <Download />
                      </div>
                      <h3 className="success-title">Conversion Completed!</h3>
                      <p className="success-text">Your files have been successfully converted.</p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="section-title">Converted Files</h3>
                      <div className="file-list">
                        {convertedFiles.map((file) => (
                          <div key={file.id} className="file-item uploaded">
                            <div className="file-info">
                              <FileText className="file-icon success" />
                              <span className="file-name">{file.convertedName}</span>
                            </div>
                            <button
                              onClick={() => handleDownload(file.convertedName,file.downloadUrl)}
                              className="btn btn-success"
                            >
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={clearFiles}
                      className="btn btn-primary btn-full"
                    >
                      Convert More Files
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Horizontal line and helpline */}
          <hr className="helpline-divider" />
          <div className="helpline">
            Helpline: 1950
          </div>
        </main>
      </div>
    </div>
    <LoadingModal isOpen={isModalOpen} message={modalMessage} />
  </>
);
};

export default VoterServices;