import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useEffect } from "react"; // Import useEffect
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import Review from "../../components/review/Review";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share"; // Import react-share components

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(null); // Initialize data state
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [error, setError] = useState(null); // Initialize error state

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`/hotels/find/${id}`);
        if (!result.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await result.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error);
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login", { state: { from: location.pathname } }); // Truyền đường dẫn hiện tại
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          <div className="backButton" onClick={handleGoBack}>
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              style={{ marginRight: "5px" }}
            />
            <span>Quay lại trang trước</span>
          </div>
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button onClick={handleClick} className="bookNow">
              Đặt ngay!
            </button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Vị trí hợp lý – {data.distance}m từ trung tâm
            </span>
            <span className="hotelPriceHighlight">
              Đặt phòng giá trị trên ${data.cheapestPrice} để nhận thêm ưu đãi
              và quà miễn phí.
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">Mô tả chi tiết</h1>
                <p className="hotelDesc">{data.desc}</p>
                <div className="shareInfo">
                  <p style={{ marginRight: "4px" }}>Chia sẻ:</p>

                  <EmailShareButton
                    url={window.location.href}
                    subject={`Hãy thử đặt tại đây: ${data.name}`}
                    body={`Tôi có một địa điểm nghỉ dưỡng rất tốt: ${data.name} nằm ở ${data.address}. Thử xem qua nhé!`}
                  >
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                </div>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Nơi lý tưởng cho {days}-đêm nghỉ dưỡng!</h1>
                <span>Địa điểm lý tưởng để nghỉ dưỡng và thư giãn!</span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                  đêm)
                </h2>
                <p className="dateBook">
                  Ngày bắt đầu: {dates[0].startDate.toLocaleDateString()}
                </p>
                <p className="dateBook">
                  Ngày kết thúc: {dates[0].endDate.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <Review hotelId={id} />
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
