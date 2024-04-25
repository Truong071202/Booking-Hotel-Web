import {
  faBed,
  faCalendarDays,
  faCar,
  faHouse,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState, useRef } from "react"; // Thêm useRef vào để tham chiếu đến DateRange
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [suggestions, setSuggestions] = useState([]); // State để lưu trữ danh sách gợi ý
  const [showSuggestions, setShowSuggestions] = useState(false); // State để điều khiển hiển thị gợi ý

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const dateRangeRef = useRef(); // Tham chiếu đến DateRange

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    if (!destination.trim()) {
      alert("Vui lòng nhập địa điểm trước khi tìm kiếm!");
      return;
    }

    dispatch({
      type: "NEW_SEARCH",
      payload: { destination, dates, options },
    });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  // Hàm để xử lý sự kiện khi người dùng nhập vào trường input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setDestination(value);

    // Tìm kiếm và hiển thị gợi ý dựa trên giá trị nhập vào
    const suggestions = ["Đà Nẵng", "Hội An", "Huế"].filter((city) =>
      city.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(suggestions);

    // Hiển thị hoặc ẩn gợi ý
    setShowSuggestions(true);
  };

  // Hàm để chọn một gợi ý và điền vào trường input
  const handleSuggestionClick = (suggestion) => {
    setDestination(suggestion);
    setShowSuggestions(false);
  };

  // Đóng DateRange khi click vào options
  const handleCloseDateRange = () => {
    setOpenDate(false);
  };

  const handleCloseOptions = () => {
    setOpenOptions(false);
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem">
            <FontAwesomeIcon icon={faHouse} />
            <span>
              <Link to="/" style={{ color: "unset", textDecoration: "none" }}>
                Trang chủ
              </Link>
            </span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">Đăng nhập để tiết kiệm</h1>
            <p className="headerDesc">
              Nhận phần thưởng cho chuyến du lịch của bạn - tiết kiệm ngay lập
              tức từ 10% trở lên với tài khoản HotelBooking miễn phí
            </p>

            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Bạn đang ở đâu?"
                  className="headerSearchInput"
                  value={destination}
                  onChange={handleInputChange}
                />
                {showSuggestions && (
                  <ul className="suggestions">
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
              <div className="headerSearchItem" onClick={handleCloseOptions}>
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    ref={dateRangeRef} // Tham chiếu DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem" onClick={handleCloseDateRange}>
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${Math.min(40, options.adult)} người lớn · ${Math.min(
                  15,
                  options.children
                )} trẻ em · ${Math.min(30, options.room)} phòng`}</span>
                {openOptions && (
                  <div className="options">
                    {" "}
                    {/* Thêm event onClick */}
                    <div className="optionItem">
                      <span className="optionText">Người lớn</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {Math.min(40, options.adult)}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Trẻ em</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {Math.min(15, options.children)}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Phòng</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {Math.min(30, options.room)}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Tìm kiếm
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
