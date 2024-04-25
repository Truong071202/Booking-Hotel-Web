import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const [suggestions, setSuggestions] = useState([]); // Danh sách gợi ý

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );
  const [showSuggestions, setShowSuggestions] = useState(false); // Đã thêm khởi tạo cho showSuggestions

  useEffect(() => {
    // Lọc danh sách gợi ý dựa trên giá trị nhập vào của người dùng
    const filteredSuggestions = ["Đà Nẵng", "Hội An", "Huế"].filter((city) =>
      city.toLowerCase().includes(destination.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  }, [destination]);

  const handleClick = () => {
    reFetch();
  };
  const handleGoBack = () => {
    window.history.back();
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setDestination(newValue);

    // Hiển thị danh sách gợi ý nếu ô input không rỗng
    if (newValue.trim() !== "") {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setDestination(suggestion);
    // Xóa danh sách gợi ý sau khi chọn
    setSuggestions([]);
    setShowSuggestions(false);
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
                placeholder="Nhập điểm đến"
                type="text"
                value={destination}
                onChange={handleInputChange}
              />
              {/* Hiển thị gợi ý nếu có và ô input không rỗng */}
              {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestion">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
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
                    Giá thấp nhất <small>một đêm</small>
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
                      setOptions({ ...options, adult: e.target.value })
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
                      setOptions({ ...options, children: e.target.value })
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
                    title="Số lượng phòng tối đa là 30!"
                    onChange={(e) =>
                      setOptions({ ...options, room: e.target.value })
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
