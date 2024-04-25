import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./review.css";
import { useLocation, useParams } from "react-router-dom";

const Review = ({ isAuthenticated }) => {
  const location = useLocation();
  const hotelId = location.pathname.split("/")[2];
  const [feedback, setFeedback] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [star, setStar] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(9);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/reviews/hotel/${hotelId}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [hotelId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/reviews/hotel/${hotelId}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleSubmit = async () => {
    if (!feedback || !username || !email) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      const response = await axios.post(`/reviews/hotel/${hotelId}`, {
        feedback,
        username,
        email,
        star,
      });
      console.log("Review submitted:", response.data);
      setFeedback("");
      setUsername("");
      setEmail("");
      setStar(1);
      setError("");
      fetchReviews(); // Refresh reviews after submitting a new one
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  // Get current reviews
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reviews.length / reviewsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="review">
      <div className="titleReview">
        <h2>Đánh giá khách hàng</h2>
      </div>
      <div className="containerReviews">
        {currentReviews.map((review, index) => (
          <div className="cardReview" key={index}>
            <div className="boxReview">
              <div className="revCustomer">
                <h4 className="cusName">{review.username}</h4>
                <span className="ratingNumber">
                  {review.star}/5 <FontAwesomeIcon icon={faStar} />
                </span>
              </div>
              <div className="descReview">{review.feedback}</div>
            </div>
          </div>
        ))}
      </div>
      {pageNumbers.length > 1 && (
        <ul className="pagination">
          <li>
            <button
              onClick={() =>
                setCurrentPage((prevPage) =>
                  prevPage === 1 ? prevPage : prevPage - 1
                )
              }
              disabled={currentPage === 1}
            >
              Prev
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={currentPage === number ? "active" : ""}
              >
                {number}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() =>
                setCurrentPage((prevPage) =>
                  prevPage === pageNumbers.length ? prevPage : prevPage + 1
                )
              }
              disabled={currentPage === pageNumbers.length}
            >
              Next
            </button>
          </li>
        </ul>
      )}
      <div className="writeReview">
        <h3 style={{ marginBottom: "20px", color: "#0871c2" }}>
          Write a review
        </h3>
        <div className="containerComment">
          <div className="feedback">
            <label>Feedback</label>
            <textarea
              id="feedback"
              className="inputFeedback"
              placeholder="Viết đánh giá tại đây..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
          </div>
          <div className="inputInfo">
            <div className="infInput">
              <label htmlFor="">Họ tên</label>
              <input
                type="text"
                className="inputText"
                placeholder="Họ và tên"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="infInput">
              <label htmlFor="">Email</label>
              <input
                type="text"
                className="inputText"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="infInput">
              <label className="optionRating" htmlFor="">
                Đánh giá (
                <span className="ratingNumber">
                  0-5 <FontAwesomeIcon icon={faStar} />
                </span>
                )
              </label>
              <select
                id="rating"
                className="inputRating"
                value={star}
                onChange={(e) => setStar(parseInt(e.target.value))}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
        </div>
        {error && (
          <div style={{ color: "red", margin: "10px auto" }}>{error}</div>
        )}
        <div className="buttonHandle">
          <button type="button" className="submit" onClick={handleSubmit}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
