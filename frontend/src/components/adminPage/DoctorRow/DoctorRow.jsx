import React , {useState} from "react";
import { sendRequest } from "../../../helpers/request";
import { useNavigate } from "react-router-dom";

import "./doctorRow.css";
import Modal from "../modal/Modal";

function DoctorRow({ doctor }) {
  const navigate = useNavigate();
  const [modalOpened, setOpened] = useState(false);

  const manageModal = () => {
    setOpened(!modalOpened);
  };

  const deleteDoctor = async () => {
    try {
      const response = await sendRequest({
        body: {userId: doctor.UserID},
        route: "/deleteDoctor",
        method: "POST",
      });

      console.log(response);
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
    <Modal user={doctor} btn_text="Edit" opened={modalOpened} manageModal={manageModal}/>

    <tr>
      <td>{doctor.UserID}</td>
      <td>{doctor.DoctorID}</td>
      <td>{doctor.UserName}</td>
      <td>{doctor.Name}</td>
      <td>{doctor.Phone}</td>
      <td>{doctor.Spec}</td>
      <td>{doctor.Password}</td>
      <td>
        <button className="btn red-btn" onClick={deleteDoctor}>
          <i className="fa-solid fa-trash"></i>
        </button>
        <button className="btn blue-btn" onClick={manageModal}>
          <i className="fa-regular fa-pen-to-square"></i>
        </button>
      </td>
    </tr>
    </>
  );
}

export default DoctorRow;
