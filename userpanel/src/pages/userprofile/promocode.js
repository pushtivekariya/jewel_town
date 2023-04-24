import React, { useEffect } from 'react'
import './promocode.css'
import { MdContentCopy } from 'react-icons/md'
import { useState } from 'react';
import { getPromocode } from '../../api/common_api';
import { BiRupee } from 'react-icons/bi'
import Sidebar from '../user_account/sidebar';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

function Promocode() {
    const [isCopied, setIsCopied] = useState(null);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [promocodelist, setPromocodeList] = useState();

    const [text, setText] = useState("");

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };
    const validCoupens = promocodelist?.filter((coupon) => {
        const endDate = new Date(coupon.end_date);
        return endDate >= today;
    })

    const promocodeListFunction = async () => {
        let response = await getPromocode();
        console.log(response.result, 'responsedata');
        setPromocodeList(response.result);
    }


    useEffect(() => {
        promocodeListFunction();
    }, [])

    function copyPromoCode(promoname) {
        // Copy the promo code logic goes here
        setIsCopied(promoname);
        setTimeout(() => {
            setIsCopied(null);
        }, 3000);
    }

    return (

        <>
            <div className="row main_row" style={{ paddingRight: '0px',marginRight:'0px' }}>
                <div className="col-3 navigation">
                    <Sidebar />
                </div>

                <div className="col-8 content" style={{ paddingTop: "1px" }}>
                    <div className='container'>
                        <div className="row">

                            {
                                validCoupens?.map((promocodedata) => {
                                    console.log(promocodedata, 'promocodedata');
                                    return (
                                        <>
                                            <div className="col-lg-4">
                                                <div className="cradcoupen cradcoupen-margin">
                                                    <div className="cradcoupen-header no-border"  key={promocodedata.promocode}>
                                                        <input className="cradcoupen-title" type="text" value={promocodedata.promocode} onChange={(e) => setText(e.target.value)} />
                                                        <button className='promocodebtn' onClick={() => { copyToClipboard(promocodedata.promocode); copyPromoCode(promocodedata.promocode) }}>
                                                            {isCopied === promocodedata.promocode? <FaCheck /> : <MdContentCopy />}
                                                            {/* {isCopied ? 'Copied!' : 'Copy Promo Code'} */}
                                                        </button>
                                                    </div>
                                                    <div className="cradcoupen-body pt-0">
                                                        <div className="widget-49">
                                                            <div className="widget-49-title-wrapper">
                                                                <div className="widget-49-date-primary">
                                                                    {
                                                                        promocodedata.promocode_type == 1 ?
                                                                            (
                                                                                <span className="widget-49-date-day">{promocodedata.promocode_discount_amount}%</span>
                                                                            ) : (
                                                                                <span className="widget-49-date-day" style={{fontSize:'20px'}}><BiRupee style={{ marginTop: '3px' }} />{promocodedata.promocode_discount_amount}</span>
                                                                            )
                                                                    }

                                                                </div>
                                                                <div className="widget-49-meeting-info">
                                                                    <span>Minimum Order Amount  {promocodedata.minimum_order_amount}</span>
                                                                </div>
                                                            </div>
                                                            <ol className="widget-49-meeting-points">
                                                                <li className="widget-49-meeting-item">
                                                                    <span className="widget-49-pro-title">
                                                                        This Promocode is valid till {promocodedata.end_date}
                                                                    </span>
                                                                </li>


                                                            </ol>
                                                        </div>
                                                    </div>

                                                    <div className="circle2"></div>

                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>



            </div>


        </>
    )
}

export default Promocode