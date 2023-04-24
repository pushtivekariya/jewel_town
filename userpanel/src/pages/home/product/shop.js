import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getallproducts, getfilter, getproductname } from '../../../api/common_api';
import { apiRoutes } from '../../../constant/api_url';
import './shop_filter.css'
import { MdArrowDropDown } from "react-icons/md";
import ReactPaginate from 'react-paginate';
import Footer from '../../../component/footer/footer';
import Header from '../../../component/header/header';
import { toast } from 'react-toastify';


function Shop() {

  const navigate = useNavigate();
  const login = JSON.parse(localStorage.getItem('login_info'));
  console.log(login, 'loginnnnn');
  const [cartStep, setCartStep] = useState(0)
  const [totalData, setTotalData] = useState();

  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 12;
  const [productData, setProductData] = useState();
  const [productName, setProductName] = useState([]);
  const [filterData, setFilterData] = useState({ jwellery_type: '', gender: '', price: 'All', product_name_id: '' });
  console.log(filterData, "fjvfejvbn");
  const price = ['All', '0-50000', '50000-100000', '100000-150000', '150000-200000']
  const gender = ['Man', 'Woman']
  const jwellery_type = ['Gold', 'Silver']



  const getProductFunction = async (page, perPage) => {
    console.log(page, "page", perPage, "perpage");

    const response = await getallproducts(page, perPage);
    if (response?.status == 1) {
      setProductData(response?.result);
      setTotalData(response?.totaldata)
      setFilterData({ jwellery_type: '', gender: '', price: 'All', product_name_id: '' })
    }
    console.log(response.result, "response");

  }


  const getProductNameFunction = async () => {
    const response = await getproductname();
    setProductName(response?.result)
  }

  const handleFilter = async (jwellery_type, gender, price, product_name_id, page, perPage) => {
    console.log(price, jwellery_type, gender, '**********');
    const response = await getfilter({ jwellery_type, gender, price, product_name_id, page, perPage })
    console.log(response?.data, 'getresponsee');
    setProductData(response?.data)
  }

  useEffect(() => {
    console.log(currentPage, "current pageeeeeeeeeeeeeeee");
    getProductFunction(currentPage, perPage);
    // getProductFunction()
    getProductNameFunction();
  }, [])


  const handlePageChange = (page) => {
    console.log(page, 'page');
    setCurrentPage(page)
    if (filterData?.jwellery_type != '' || (filterData?.gender != undefined && filterData?.gender != '') || filterData?.price != 'All' || (filterData?.product_name_id != undefined && filterData?.product_name_id != '')) {
      handleFilter(filterData?.jwellery_type, filterData?.gender, filterData?.price, filterData?.product_name_id, page, perPage)
    }
    else {
      getProductFunction(page, perPage);
    }
  }

  console.log(productName, 'productnames');




  const addWishlist = (wishlist) => {
    if (login == null) {
      toast.error("Please login...")
    }
    else {
      var wish = [];
      wish = JSON.parse(localStorage.getItem('wish_list')) || [];
      if (wish.length > 0) {
        let count = wish.some(product => product.product_id === wishlist.product_id && product.email === login[0].email);
        if (!count) {
          wish.push({ ...wishlist, user_qty: 1, email: login[0].email })
          localStorage.setItem('wish_list', JSON.stringify(wish));
          toast.success("product is already into wishlist");
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        } else {
          toast.error("product is already into wishlist");
          navigate("/wishlist");
        }
      }
      else {
        wish.push({ ...wishlist, user_qty: 1, email: login[0].email })
        localStorage.setItem('wish_list', JSON.stringify(wish));
        // window.localStorage.reload();
      }
    }


  }



  return (

    <>
      <section
    className="bg-img1 txt-center p-lr-15 p-tb-92"
    style={{ backgroundImage: 'url("images/shop2.jpg")' , height:'14rem' }}
  >

  </section>
      {/* <Header/> */}
      <section className="bg0 p-t-23 p-b-140 m-t-50" style={{ marginTop: '0' }}>
        <div className="container">
          {/* <div className="p-b-10">
            <h3 className="ltext-103 cl5">All Products</h3>
          </div> */}
          <div className='filterdiv' >
            <nav role="navigation" className="primary-navigation">
              <ul style={{ alignItems: 'center'}}>
                <li style={{ border: '1px solid #c39584' }}><a href="#">Gender</a><MdArrowDropDown size="20px" />
                  <ul className="dropdown">
                    {
                      gender.map((gender) => {
                        return (
                          <li><Link to='/shop' onClick={() => {
                            setFilterData({ ...filterData, gender: gender })
                            handleFilter(filterData?.jwellery_type, gender, filterData?.price, filterData?.product_name_id, currentPage, perPage)

                          }}>{gender}</Link></li>
                        )
                      })
                    }

                    {/* <li><Link href="#">Women</Link></li> */}

                  </ul>
                </li>
                <li><Link>Product</Link><MdArrowDropDown size="20px" />

                  <ul className="dropdown">
                    {
                      productName.map((productname) => {
                        // console.log(productname, 'productnamearr');
                        return (
                          <li><Link onClick={() => {
                            setFilterData({ ...filterData, product_name_id: productname.product_name_id })
                            // handleFilter(productname, filterData?.price, filterData?.gender, filterData?.jwellery_type)
                            handleFilter(filterData?.jwellery_type, filterData?.gender, filterData?.price, productname.product_name_id, currentPage, perPage)

                          }}>{productname.product_names}</Link></li>
                        )
                      })
                    }


                  </ul>
                </li>
                <li><Link >Price</Link><MdArrowDropDown size="20px" />
                  <ul className="dropdown">
                    {
                      price.map((pricedata) => {
                        // console.log(pricedata, 'pricessssss');
                        return (
                          <li><Link onClick={() => {
                            setFilterData({ ...filterData, price: pricedata })
                            // handleFilter(pricedata, filterData?.gender, filterData?.jwellery_type, filterData?.product_name_id)
                            handleFilter(filterData?.jwellery_type, filterData?.gender, pricedata, filterData?.product_name_id, currentPage, perPage)


                          }}>{pricedata}</Link></li>

                        )

                      })
                    }

                  </ul>
                </li>
                <li><Link>Jewellery Type</Link><MdArrowDropDown size="20px" />
                  <ul className="dropdown">
                    {
                      jwellery_type.map((jwellery_type) => {
                        return (
                          <li><Link onClick={() => {
                            setFilterData({ ...filterData, jwellery_type: jwellery_type })
                            // handleFilter(jwellery_type, filterData?.gender, filterData?.price, filterData?.product_name_id)
                            handleFilter(jwellery_type, filterData?.gender, filterData?.price, filterData?.product_name_id, currentPage, perPage)



                          }}>{jwellery_type}</Link></li>

                        )
                      })
                    }


                  </ul>
                </li>

                <Link style={{ color: '#c39584', fontSize: '15px' }}
                  onClick={() => {
                    getProductFunction(currentPage, perPage);
                  }}
                >Clear All Filters</Link>

                {/* <li><Link href="#">Contact</Link></li> */}
                {/* <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
                  <i className="zmdi zmdi-search" />
                </div>
                <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
          <div className="container-search-header">
            <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
              <img src="images/icons/icon-close2.png" alt="CLOSE" />
            </button>
            <form className="wrap-search-header flex-w p-l-15">
              <button className="flex-c-m trans-04">
                <i className="zmdi zmdi-search" />
              </button>
              <input
                className="plh3"
                type="text"
                name="search"
                placeholder="Search..."
              onBlur={(e) => {
                setFilterData({
                  ...filterData,
                  product_name_id: e.target.value,
                });
                handleFilter(
                  filterData?.jwellery_type,
                  filterData?.gender,
                  filterData?.price,
                  filterData?.product_name_id,
                  e.target.value
                );
                // handleFilter(filterData?.price, filterData?.size, filterData?.colors,e.target.value)
              }}
              />
            </form>
          </div>
        </div> */}
              </ul>

            </nav>
          </div>
          <div className="flex-w flex-sb-m p-b-52">

          </div>
          <div className="row" style={{ marginTop: '50px' }}>
            {/* Block2 */}
            {
              productData?.map((product) => {
                // console.log(product,'111111111111111111');

                return (
                  <>
                    <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item men">

                      <div className="block2">

                        <div className="block2-pic hov-img0">
                          {/* <a href={`${apiRoutes.APIHOSTNAME}images/${product.image_url}`} className="galleryimage">
                          <AiOutlinePlus />
                        </a> */}
                          <img src={`${apiRoutes.APIHOSTNAME}images/${product.image_url}`} alt="IMG-PRODUCT" />
                          <button
                            onClick={() => {
                              navigate("/productview", { state: product })
                            }}

                            className="block2-btn flex-c-m stext-103 cl1 size-102 bg10 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                          >
                            Quick View
                          </button>
                        </div>
                        <div className="block2-txt flex-w flex-t p-t-14">
                          <div className="block2-txt-child1 flex-col-l ">
                            <Link
                              to='/view'
                              className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                            >
                              {product.short_description}
                            </Link>
                            <span className="stext-105 cl3">Rs. {product.price}</span>
                            {/* <i className="zmdi zmdi-shopping-cart" /> */}
                          </div>

                          <div className="block2-txt-child2 flex-r p-t-3" onClick={() => {
                            addWishlist(product)
                          }} >

                            <Link
                              to='/shop'
                              className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"

                            >
                              <img
                                className="icon-heart1 dis-block trans-04"
                                src="images/icons/icon-heart-01.png"
                                alt="ICON"
                              />
                              <img
                                className="icon-heart2 dis-block trans-04 ab-t-l"
                                src="images/icons/icon-heart-02.png"
                                alt="ICON"
                              />
                            </Link>
                          </div>
                          {/* <div style={{ padding: "5px 0px 0px 2px", cursor: "pointer" }}
                                                    onClick={() => {
                                                        addToCart(product)
                                                    }}
                                                >
                                                  <i className="zmdi zmdi-shopping-cart" style={{ fontSize: "20px" }} />
                                                </div> */}

                        </div>
                      </div>
                    </div>

                  </>
                )



              })
            }

          </div>



          <div class="flex-l-m flex-w w-full p-t-10 m-lr--7" style={{ display: 'flex', alignContent: 'center', justifyContent: 'right', color: '#c39584' }}>

            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={(e) => { handlePageChange(e.selected + 1) }}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              pageCount={
                Math.ceil(totalData / perPage)
              }
              previousLabel="<"
              renderOnZeroPageCount={null}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              breakClassName="page-item"
              breakLinkClassName="page-link"


            />


          </div>
          {/* Load more */}
          <div className="flex-c-m flex-w w-full p-t-45">
            <Link
              to='/'
              className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"
            >
              Load More
            </Link>
          </div>
        </div>
      </section>
      {/* <Footer/> */}
    </>
  )
}

export default Shop