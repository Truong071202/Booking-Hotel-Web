import "./review.css";

const Review = () => {
  return (
    <div className="review">
      <div className="titleReview">
        <h2>Đánh giá khách hàng</h2>
      </div>
      <div className="containerReviews">
        <div className="cardReview">
          <div className="boxReview">
            <div className="nameCustomer">Customer1</div>
            <div className="descReview">
              “Thái độ của các nhân viên rất chu đáo, hỗ trợ mình rất nhiều kể
              cả khi mình đã check out phòng từ 2h chiều mà tận 8h tối bọn mình
              mới rời khỏi khách sạn để ra sân bay”
            </div>
          </div>
        </div>
        <div className="cardReview">
          <div className="boxReview">
            <div className="nameCustomer">Customer1</div>
            <div className="descReview">
              “Thái độ của các nhân viên rất chu đáo, hỗ trợ mình rất nhiều kể
              cả khi mình đã check out phòng từ 2h chiều mà tận 8h tối bọn mình
              mới rời khỏi khách sạn để ra sân bay”
            </div>
          </div>
        </div>
        <div className="cardReview">
          <div className="boxReview">
            <div className="nameCustomer">Customer1</div>
            <div className="descReview">
              “Thái độ của các nhân viên rất chu đáo, hỗ trợ mình rất nhiều kể
              cả khi mình đã check out phòng từ 2h chiều mà tận 8h tối bọn mình
              mới rời khỏi khách sạn để ra sân bay”
            </div>
          </div>
        </div>
        <div className="cardReview">
          <div className="boxReview">
            <div className="nameCustomer">Customer1</div>
            <div className="descReview">
              “Thái độ của các nhân viên rất chu đáo, hỗ trợ mình rất nhiều kể
              cả khi mình đã check out phòng từ 2h chiều mà tận 8h tối bọn mình
              mới rời khỏi khách sạn để ra sân bay”
            </div>
          </div>
        </div>
        <div className="cardReview">
          <div className="boxReview">
            <div className="nameCustomer">Customer1</div>
            <div className="descReview">
              “Thái độ của các nhân viên rất chu đáo, hỗ trợ mình rất nhiều kể
              cả khi mình đã check out phòng từ 2h chiều mà tận 8h tối bọn mình
              mới rời khỏi khách sạn để ra sân bay”
            </div>
          </div>
        </div>
        <div className="cardReview">
          <div className="boxReview">
            <div className="nameCustomer">Customer1</div>
            <div className="descReview">
              “Thái độ của các nhân viên rất chu đáo, hỗ trợ mình rất nhiều kể
              cả khi mình đã check out phòng từ 2h chiều mà tận 8h tối bọn mình
              mới rời khỏi khách sạn để ra sân bay”
            </div>
          </div>
        </div>
      </div>
      <div className="writeReview">
        <h3 style={{ marginBottom: "20px" }}>Write a review</h3>
        <div className="containerComment">
          <div className="feedback">
            <label>Feedback</label>
            <textarea
              id="feedback"
              className="inputFeedback"
              placeholder="Viết đánh giá tại đây..."
            />
          </div>
          <div className="inputInfo">
            <div className="infInput">
              <label htmlFor="">Họ tên</label>
              <input
                type="text"
                className="inputText"
                placeholder="Họ và tên"
              />
            </div>
            <div className="infInput">
              <label htmlFor="">Email</label>
              <input type="text" className="inputText" placeholder="Email" />
            </div>
          </div>
        </div>
      </div>
      <div className="buttonHandle">
        <button type="button" className="submit">
          Submit
        </button>
        <button type="button" className="cancel">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Review;
