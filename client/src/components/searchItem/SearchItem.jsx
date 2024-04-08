import "./searchItem.css";
import { Link } from "react-router-dom";

const shortenDescription = (desc, maxLength) => {
  if (desc.length <= maxLength) {
    return desc;
  } else {
    return desc.substring(0, maxLength) + "...";
  }
};

const SearchItem = ({ item }) => {
  // Kiểm tra xem item có tồn tại không trước khi truy cập vào thuộc tính _id
  const itemId = item ? item._id : null;

  const shortenedDesc = shortenDescription(item.desc, 100); // Đặt độ dài tối đa 100 ký tự

  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m từ trung tâm</span>
        <span className="siTaxiOp">Miễn phí dịch vụ đi kèm</span>
        <span className="siSubtitle">Đầy đủ tiện nghi và dịch vụ ăn uống</span>
        <span className="siFeatures">{shortenedDesc}</span>
        <span className="siCancelOp">Hủy đặt phòng miễn phí </span>
        <span className="siCancelOpSubtitle">
          Bạn có thể hủy sau, hãy chọn mức giá tuyệt vời này ngay hôm nay!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Tuyệt vời</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Bao gồm thuế và chi phí phát sinh</span>
          {itemId && ( // Kiểm tra xem itemId có tồn tại không trước khi render Link
            <Link to={`/hotels/${itemId}`}>
              <button className="siCheckButton">Xem chi tiết</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
