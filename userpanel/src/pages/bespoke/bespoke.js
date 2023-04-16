import React from 'react'
import Footer from '../../component/footer/footer'
import Header from '../../component/header/header'
import './bespoke.css'

function Bespoke() {
  return (

    <>
    {/* <Header/> */}
    <section
    className="bg-img1 txt-center p-lr-15 p-tb-92"
    style={{ backgroundImage: 'url("images/slider1.jpg")' }}
  >
   <h2 className="ltext-105 cl0 txt-center">Bespoke</h2>
  </section>

  <section className="bg0 p-t-75 p-b-120">
  <center>
  <h2 className='p-4'>The bespoke Journey</h2>
  <div className="container">
  <div className='bespoke_padding'>
    <div className="row">
    <div className='col-md-5 coll-sm-12'>
    <div className='description' style={{padding:'2em 0em'}}>
    <h3>Inspired Design</h3>
    <p className='description_p p_content'>
     Your passions, your promises, your laughter and your love. Every aspect of your unique story is
     translated by our experienced designers into an exclusive, original design through detailed 
     sketches drawn from your imagination.
    </p>
    </div>
    </div>
   <div className='col-md-7 col-sm-12'>
   <video width='500' height='300' controls autoPlay loop muted className='video'>
   <source src="images/bespoke1.mp4" type='video/mp4'/>
   </video>
   </div>
    </div>
  </div>
  <div className='bespoke_padding'>
  <div className="row">
  <div className='col-md-7 col-sm-12'>
  <video width='500' height='300' controls autoPlay loop muted className='video'>
  <source src="images/Arachne.mp4" type='video/mp4'/>
  </video>
  </div>
   <div className='col-md-5 coll-sm-12'>
    <div className='description' style={{padding:'2em 0em'}}>
    <h3>Crafted To Perfection</h3>
    <p class="description_p p_content">Your bespoke design is brought alive through precious jewels
     in the hands of our highly-skilled master craftsmen through intricate techniques and painstaking
      attention to detail and finish.</p>
    </div>
    </div>
    </div>
    </div>
    </div>
 <h1 className='pt-3 pl-3 pr-3 bespoke main-heading'>Bespoke Stories</h1>
    <div className='p__container'>
    <div className="col-md-4 col-sm-6 col-xs-6 custom_col">
  <ul className="Bottom_div Unordered_custom">
<li className="bottom_div_bgcolor">
  <img
  src="images/imgone.avif"
  alt="imgone"
  className="imgs"
/>
<li>
<h5 className="pt-2">A Memorable Experience</h5>
</li>
<li>
<p className="description_p p_content">
  The creative journey of seeing my vision come to life in the form of
  this gorgeous Paraiba pendant was truly rewarding.
</p>
</li>
</li>
</ul>
</div>
  <div className="col-md-4 col-sm-6 col-xs-6 custom_col">
  <ul className="Bottom_div Unordered_custom">
<li className="bottom_div_bgcolor">
  <img
  src="images/imgtwo.avif"
  alt="imgone"
  className="imgs"
/>
<li>
<h5 className="pt-2">To Infinity and Beyond</h5>
</li>
<li>
<p className="description_p p_content">
An 'Infinity' and 'heart' jali with a beautiful amethyst was the perfect anniversary
 gift for my 'Toy Story' loving wife.
</p>
</li>
</li>
</ul>
</div>
<div className="col-md-4 col-sm-6 col-xs-6 custom_col">
<ul className="Bottom_div Unordered_custom">
<li className="bottom_div_bgcolor">
<img
src="images/imgthree.avif"
alt="imgone"
className="imgs"
/>
<li>
<h5 className="pt-2">It was our 25th Anniversary</h5>
</li>
<li>
<p className="description_p p_content">
We wanted to celebrate our 25th anniversary with something bespoke. 
This teardrop tanzanite was just the way I wanted it!
</p>
</li>
</li>
</ul>
</div>
  </div>
  </center>
</section>
{/* <Footer/> */}
    </>
  )
}

export default Bespoke