import { useState, useEffect } from "react";
import Model from "../components/Model";
import Button from "../components/Button";
import StudentInfo from "../components/StudentInfo";
import { IoIosClose } from "react-icons/io";

function ModelPage() {
  const [showModel, setShowModel] = useState(false);
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden"); //remove as soon as model remvoed using property cleanup fn
    };
  });

  const hanldeClick = () => {
    setShowModel(true);
  };
  const handleClose = () => {
    setShowModel(false);
  };
  const actionBar = (
    <Button secondary rounded onClick={handleClose} outline>
      {" "}
      <IoIosClose  className="text-3xl"/>{" "}
    </Button>
  );

  const model = (
    <Model onClose={handleClose} actionBar={actionBar}>
            <div className="text-center">
            <StudentInfo/>
            </div>
    </Model>
  );

  return (
    <div className="relative">
      <Button onClick={hanldeClick} primary>
        Open Model
      </Button>
      {showModel && model}
    </div>
  );
}
export default ModelPage;
