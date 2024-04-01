import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=Đà Nẵng,Hội An,Huế"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          {" "}
          <div className="featuredItem">
            <img
              src="https://static-images.vnncdn.net/files/publish/2023/11/7/at-ve-dep-thanh-pho-da-nang-giu-tron-tung-khoanh-khac-6b555585df3ca96d931cf6f4378c9488-1276.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Đà Nẵng</h1>
              <h2>{data[0]} địa điểm</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://sakos.vn/wp-content/uploads/2023/04/image_tiz1614827333-1.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Hội An</h1>
              <h2>{data[1]} địa điểm</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://dulichconvoi.com/wp-content/uploads/2019/04/hinh-anh-hue-1.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Huế</h1>
              <h2>{data[2]} địa điểm</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
