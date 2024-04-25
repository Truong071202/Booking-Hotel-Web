import React, { useState, useEffect } from "react";
import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState({});
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const [showMessage, setShowMessage] = useState(false);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e, roomId) => {
    const checked = e.target.checked;
    setSelectedRooms((prevSelectedRooms) => ({
      ...prevSelectedRooms,
      [roomId]: checked ? 1 : 0,
    }));
  };

  const handleQuantityChange = (roomId, change) => {
    setSelectedRooms((prevSelectedRooms) => ({
      ...prevSelectedRooms,
      [roomId]: Math.max((prevSelectedRooms[roomId] || 0) + change, 0),
    }));
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    const selectedRoomIds = Object.keys(selectedRooms).filter(
      (roomId) => selectedRooms[roomId] > 0
    );

    if (selectedRoomIds.length > 0) {
      try {
        await Promise.all(
          selectedRoomIds.map((roomId) => {
            const res = axios.put(`/rooms/availability/${roomId}`, {
              dates: alldates,
            });
            return res.data;
          })
        );
        setOpen(false);
        navigate("/information");
      } catch (err) {}
    } else {
      setShowMessage(true);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Chọn loại phòng:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Số người tối đa: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              <div className="room">
                <span>Số lượng: </span>
                <button onClick={() => handleQuantityChange(item._id, -1)}>
                  -
                </button>
                <span>{selectedRooms[item._id] || 0}</span>
                <button onClick={() => handleQuantityChange(item._id, 1)}>
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Đặt ngay!
        </button>
        {showMessage && (
          <p className="errorMessage" style={{ color: "red" }}>
            Vui lòng chọn ít nhất một phòng trước khi tiếp tục.
          </p>
        )}
      </div>
    </div>
  );
};

export default Reserve;
