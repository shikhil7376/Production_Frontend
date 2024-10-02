import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { addCages } from "../../Api/Kennel";
import { Input } from "../../components/ui/input";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../Redux/Store";
import PacmanLoader from "react-spinners/PacmanLoader";
import { AddCageError } from "../../Interface/DatatypeInterface";
import errorHandle from "../../Api/Error";
import LeafletMap from "./LeafletMap";

export default function  AddModal({ fetchCages }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [kennelname, setKenneName] = useState<string>("");
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [description, setDescription] = useState<string>("");
  const [maxCount, setMaxCount] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [PricePerNight, setPricePerNight] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [type, setType] = useState<string>("");
  const [errors, setErrors] = useState<AddCageError>({});
  const [loading, setLoading] = useState(false);

  const kennelOwnerData = useSelector((state: RootState) => state.kennel.kennelOwnerData);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prev) => {
        const remainingSlots = 3 - prev.length;
        const newFiles = filesArray.slice(0, remainingSlots);
        return [...prev, ...newFiles];
      });
    }
  };

  const validateForm = () => {
    const newErrors: AddCageError = {};

    if (!kennelname.trim()) {
      newErrors.kennelname = "Kennel name is required";
    }
    if (!location) {
      newErrors.location = "Location is required";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.length > 100) {
      newErrors.description = "Description should not exceed 100 characters";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (phone.length !== 10) {
      newErrors.phone = "Phone number must contain 10 digits";
    }
    if (!type) {
      newErrors.type = "Type is required";
    }
    if (!maxCount || parseInt(maxCount) <= 0) {
      newErrors.maxCount = "Max count must be greater than 0";
    }
    if (!PricePerNight || parseInt(PricePerNight) <= 0) {
      newErrors.PricePerNight = "Price per night must be greater than 0";
    }
    if (images.length !== 3) {
      newErrors.images = "Exactly 3 images are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();
   
    if (isValid) {
      const formData = new FormData();
      formData.append("kennelname", kennelname);
      if (location) {
        formData.append("location", JSON.stringify(location)); // Convert location to string
      }
      formData.append("description", description);
      formData.append("phone", phone)
      formData.append("type", type);
      formData.append("maxCount", maxCount);
      formData.append("PricePerNight", PricePerNight);
      if (kennelOwnerData && kennelOwnerData._id) formData.append("ownerId", kennelOwnerData._id);
      images.forEach((file) => formData.append("cageimages", file));

      try {
        setLoading(true);  
        const response = await addCages(formData);
        fetchCages();
        setLoading(false);  
        if (response) {
          toast.success(response.data);
          onOpenChange();
        }
      } catch (error) {
        errorHandle(error)
        setLoading(false);  
      }
    }
  };

  return (
    <>
      <Button onPress={onOpen} className="font-roboto bg-customPurple text-small  text-white">Add Kennel</Button>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <PacmanLoader size={40} color="#ffffff" />
        </div>
      )}

      {!loading && (
        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          classNames={{
            backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
          }}
        >
          <ModalContent  className="overflow-y-auto max-h-[100vh] scrollbar-hide">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 font-roboto">Add Kennel</ModalHeader>
                <ModalBody className=" ">
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                      <Input
                        type="text"
                        placeholder="Kennel Name"
                        value={kennelname}
                        onChange={(e) => setKenneName(e.target.value)}
                        required
                      />
                      {errors.kennelname && <p className="text-red-600 font-semibold text-small">{errors.kennelname}</p>}
                      {/* <Input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                      {errors.location && <p className="text-red-600 font-semibold text-small">{errors.location}</p>} */}
                      <label className="font-roboto text-sm">Select Location</label>
                      <LeafletMap setLocation={setLocation}  location={location || { lat: 52, lng: -0.09, address: '' }} />  {/* Use LeafletMap here to set the location */}
                      {errors.location && <p className="text-red-600 font-semibold text-small">{errors.location}</p>}
                      <Input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="font-roboto"
                      />
                      {errors.description && <p className="text-red-600 font-semibold text-small">{errors.description}</p>}
                      <Input
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                         className="font-roboto"
                      />
                      {errors.phone && <p className="text-red-600 font-semibold text-small">{errors.phone}</p>}
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                        className="p-2 border rounded font-roboto text-sm"
                      >
                        <option value="" disabled >Select Type</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                      {errors.type && <p className="text-red-600 font-semibold text-small">{errors.type}</p>}
                      <Input
                        type="number"
                        placeholder="Max Count"
                        value={maxCount}
                        onChange={(e) => setMaxCount(e.target.value)}
                        required
                        className="font-roboto"
                      />
                      {errors.maxCount && <p className="text-red-600 font-semibold text-small">{errors.maxCount}</p>}
                      <Input
                        type="number"
                        placeholder="Price Per Night"
                        value={PricePerNight}
                        onChange={(e) => setPricePerNight(e.target.value)}
                        required
                        className="font-roboto"
                      />
                      {errors.PricePerNight && <p className="text-red-600 font-semibold text-small">{errors.PricePerNight}</p>}
                      <label htmlFor="images" className="font-roboto text-sm">Select Images (up to 3):</label>
                      <input type="file" multiple onChange={handleFileChange} accept="image/*" className="font-roboto text-sm"/>
                      {errors.images && <p className="text-red-600 font-semibold ">{errors.images}</p>}
                      <div className="grid grid-cols-3 gap-4 ">
                        {images.map((file, index) => (
                          <div key={index} className="w-25 h-25 border-1 border-black-500 rounded-lg overflow-hidden">
                            <img src={URL.createObjectURL(file)} alt={`profile-pic-${index}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button className="bg-customPurple text-white font-semibold text-small" type="submit">
                        Submit
                      </Button>
                    </ModalFooter>
                  </form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
