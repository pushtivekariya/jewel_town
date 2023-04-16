import React, { useEffect, useState } from 'react'
import { apiRoutes } from '../../constant/api_url';
import Rating from 'react-rating';
import { getReview } from '../../api/common_api';
import UserReview from './userReview';

function ReviewList(props) {
  const product_id = props.productid
  console.log(product_id, 'productid');
  const [reviewlist, setReviewList] = useState();
  // const [buttonrender,setButtonRender] = useState(false);
  const login = JSON.parse(localStorage.getItem('login_info'));


  const reviewListFunction = async (product_id) => {
    let response = await getReview(product_id);
    console.log(response.result, 'result');
    setReviewList(response.result);
  }



  useEffect(() => {
    reviewListFunction(product_id);
  }, [])



  return (
    <>
      {
        reviewlist?.map((reviews) => {

          console.log(reviews, 'reviews');
          if (product_id == reviews.product_id) {
            return (
              <>
                <div className="min-h-screen w-full" style={{ marginBottom: '1rem' }}>
                  <div className="max-w-screen-md mx-auto px-10">
                    <div className="bg-white md:h-48 rounded-lg shadow-md flex flex-wrap flex-col-reverse md:flex-col">
                      <div className="w-full md:w-1/2 text-dark">
                        <div className="row">
                          <div className="col-mg-2">
                            {
                              reviews?.profile_photo == null ? (
                                <img
                                  src="images/icons/profile.jpg"
                                  alt="no"
                                  className="w-8"
                                  style={{ height: "50px", width: "50px", borderRadius: "50%", objectFit: "cover", marginLeft: "15px" }}
                                />
                              ) : (
                                <img
                                  src={`${apiRoutes.APIHOSTNAME}user_profile_image/${reviews?.profile_photo}`}
                                  alt="no"
                                  className="w-8"
                                  style={{ height: "50px", width: "50px", borderRadius: "50%", objectFit: "cover", marginLeft: "15px" }}
                                />
                              )
                            }

                          </div>
                          <p style={{ margin: "15px" }}>{reviews.user_name}</p>
                          <div className='yotpo-header-element yotpo-header-actions' style={{ marginLeft: '46rem', marginTop: '15px' }}>
                            <span className='y-label yotpo-review-date' style={{ fontSize: '13px' }}>{reviews.review_date}</span>
                          </div>
                        </div>

                        <div className="review" key={reviews.id} >
                          <Rating
                            initialRating={reviews.rating}
                            emptySymbol="fa fa-star-o fa-1x"
                            fullSymbol="fa fa-star fa-1x"
                            readonly
                          />

                          <h6 className=" font-bold">{reviews.review_title}</h6>
                          <p style={{ fontSize: '17px' }}>
                            {reviews.review}
                          </p>

                        </div>
                      </div>
                      <div className="w-full md:w-1/2 p-4 md:p-0">
                        <img
                          src="https://isometric.online/wp-content/uploads/2020/04/food_svg.svg"
                          alt=""
                          className="w-64 mx-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          }


        }
        )
      }





    </>
  )
}

export default ReviewList