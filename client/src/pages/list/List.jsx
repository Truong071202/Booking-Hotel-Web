import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem.jsx";
import useFetch from "../../hooks/useFetch.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  const handleClick = () => {
    reFetch();
  };
  const handleGoBack = () => {
    window.history.back();
  };

  const handleInputChange = (e, option) => {
    const newValue = e.target.value;
    if (newValue > option.max) {
      alert(`Số lượng không được vượt quá ${option.max}!`);
      // Nếu giá trị nhập vào lớn hơn max, đặt lại giá trị input thành max
      e.target.value = option.max;
    } else {
      // Nếu không vượt quá, cập nhật giá trị state
      switch (option.name) {
        case "adult":
          setOptions({ ...options, adult: newValue });
          break;
        case "children":
          setOptions({ ...options, children: newValue });
          break;
        case "room":
          setOptions({ ...options, room: newValue });
          break;
        default:
          break;
      }
    }
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="backButton" onClick={handleGoBack}>
        <FontAwesomeIcon
          icon={faCircleArrowLeft}
          style={{ marginRight: "5px" }}
        />
        <span>Quay lại trang trước</span>
      </div>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Tìm kiếm</h1>
            <div className="lsItem">
              <label>Điểm đến</label>
              <input
                placeholder={destination}
                type="text"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Ngày check-in</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Lọc theo</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Giá thấp nhấp <small>một đêm</small>
                  </span>
                  <input
                    type="number"
                    min={1}
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Giá cao nhất <small>một đêm</small>
                  </span>
                  <input
                    type="number"
                    min={1}
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Người lớn</span>
                  <input
                    type="number"
                    min={1}
                    max={40}
                    className="lsOptionInput"
                    placeholder={Math.min(40, options.adult)}
                    title="Số lượng người lớn tối đa là 40!"
                    onChange={(e) =>
                      handleInputChange(e, { name: "adult", max: 40 })
                    }
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Trẻ em</span>
                  <input
                    type="number"
                    min={0}
                    max={15}
                    className="lsOptionInput"
                    placeholder={Math.min(15, options.children)}
                    title="Số lượng trẻ em tối đa là 15!"
                    onChange={(e) =>
                      handleInputChange(e, { name: "adult", max: 15 })
                    }
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Phòng</span>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    className="lsOptionInput"
                    placeholder={Math.min(30, options.room)}
                    title="Số lượng phòng tối thiểu là 30!"
                    onChange={(e) =>
                      handleInputChange(e, { name: "adult", max: 30 })
                    }
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Tìm kiếm</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
