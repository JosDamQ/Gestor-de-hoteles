import React from 'react'
import Navbar from '../../components/Navbar'
import '../Home/HomePage.css'

export const HomePage = () => {
  return (
    <>
    <div className="app-container">
  <section className="navigation">
  <div className="navigation">
      <img src="../src/assets/Hotel4All.png" alt="Logo" />
      <a href="#" className="app-link">Hotel 4 All</a>
    </div>
    
    
    <div className="navigation-links">
      <a href="#" className="nav-link ">Destinations</a>
      <a href="#" className="nav-link active">Hotels</a>
      <a href="#" className="nav-link">Camping</a>
      <a href="#" className="nav-link">Car Rent</a>
    </div>
    <div className="nav-right-side">
      <button className="mode-switch">
       <svg className="sun" fill="none" stroke="#fbb046" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-sun" viewBox="0 0 24 24"><defs/><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
  <svg className="moon" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-moon" viewBox="0 0 24 24"><defs/><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
     </button>
      <button className="profile-btn">
      <span>Su usuario</span>
      <img src="https://images.unsplash.com/photo-1492633397843-92adffad3d1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80" alt="pp"/>
    </button>
    </div>  
  </section>
  <section className="app-actions">
    <div className="app-actions-line">
      <div className="search-wrapper">
        <button className="loaction-btn">
          <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin" viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </button>
        <input type="text" className="search-input" value="¿En que zona desea Buscar?"/>
        <input type="text" className="search-input" value="¿Ya sabes en que hotel?"/>
        <button className="search-btn">Find Hotel</button>
      </div>
      <div className="contact-actions-wrapper">
         <div className="contact-actions">
        <span>Contact us: </span>
        <a href="#" className="contact-link"/>
         <a href="#" className="contact-link"/>
      </div>
      </div>
    </div>
  </section>
  <section className="app-main">
    <div className="app-main-left cards-area">
      <div className="card-wrapper main-card">
        <a className="card cardItemjs"  onclick="openModal()">
          <div className="card-image-wrapper">
          <img src="https://source.unsplash.com/featured/1200x900/?sculpture,hotel" alt="Hotel"/>
        </div>
          <div className="card-info">
            <div className="card-text big cardText-js">Nombre del Hotel</div>
            <div className="card-text small">Lugar</div>
            <div className="card-text small">
              Starts from: 
              <span className="card-price">Precio</span>
            </div>
          </div>
          </a>
      </div>
       <div className="card-wrapper main-card">
        <a className="card cardItemjs"  onclick="openModal()">
          <div className="card-image-wrapper">
          <img src="https://source.unsplash.com/featured/1200x900/?architecture,hotel" alt="Hotel"/>
        </div>
        <div className="card-info">
            <div className="card-text big cardText-js">Nombre del Hotel</div>
            <div className="card-text small">Lugar</div>
            <div className="card-text small">
              Starts from: 
              <span className="card-price">Precio</span>
            </div>
          </div>
          </a>
      </div>
       <div className="card-wrapper main-card">
        <a className="card cardItemjs"  onclick="openModal()">
          <div className="card-image-wrapper">
          <img src="https://source.unsplash.com/featured/1200x900/?hotel-room,hotel" alt="Hotel"/>
        </div>
        <div className="card-info">
            <div className="card-text big cardText-js">Nombre del Hotel</div>
            <div className="card-text small">Lugar</div>
            <div className="card-text small">
              Starts from: 
              <span className="card-price">Precio</span>
            </div>
          </div>
          </a>
      </div>
      <div className="card-wrapper main-card">
        <a className="card cardItemjs"  onclick="openModal()">
          <div className="card-image-wrapper">
          <img src="https://source.unsplash.com/featured/1200x900/?hotel,design" alt="Hotel"/>
        </div>
        <div className="card-info">
            <div className="card-text big cardText-js">Nombre del Hotel</div>
            <div className="card-text small">Lugar</div>
            <div className="card-text small">
              Starts from: 
              <span className="card-price">Precio</span>
            </div>
          </div>
          </a>
      </div>
      <div className="card-wrapper main-card">
        <a className="card cardItemjs"  onclick="openModal()">
          <div className="card-image-wrapper">
          <img src="https://source.unsplash.com/featured/1200x900/?interior,design" alt="Hotel"/>
        </div>
        <div className="card-info">
            <div className="card-text big cardText-js">Nombre del Hotel</div>
            <div className="card-text small">Lugar</div>
            <div className="card-text small">
              Starts from: 
              <span className="card-price">Precio</span>
            </div>
          </div>
          </a>
      </div>
      <div className="card-wrapper main-card">
        <a className="card cardItemjs"  onclick="openModal()">
          <div className="card-image-wrapper">
          <img src="https://source.unsplash.com/featured/1200x900/?interior,architecture" alt="Hotel"/>
        </div>
          <div className="card-info">
              <div className="card-text big cardText-js">Nombre del Hotel</div>
              <div className="card-text small">Lugar</div>
              <div className="card-text small">
                Starts from: 
                <span className="card-price">Precio</span>
              </div>
          </div>
          </a>
      </div>
      <div className="card-wrapper main-card">
        <a className="card cardItemjs"  onclick="openModal()">
          <div className="card-image-wrapper">
          <img src="https://source.unsplash.com/featured/1200x900/?interior,modern" alt="Hotel"/>
        </div>
          <div className="card-info">
              <div className="card-text big cardText-js">Nombre del Hotel</div>
              <div className="card-text small">Lugar</div>
              <div className="card-text small">
                Starts from: 
                <span className="card-price">Precio</span>
              </div>
          </div>
          </a>
      </div>
      <div className="card-wrapper main-card">
        <a className="card cardItemjs"  onclick="openModal()">
          <div className="card-image-wrapper">
          <img src="https://source.unsplash.com/featured/1200x900/?architecture,modern" alt="Hotel"/>
        </div>
          <div className="card-info">
              <div className="card-text big cardText-js">Nombre del Hotel</div>
              <div className="card-text small">Lugar</div>
              <div className="card-text small">
                Starts from: 
                <span className="card-price">Precio</span>
              </div>
          </div>
          </a>
      </div>
       <div className="card-wrapper main-card">
        <a className="card cardItemjs"  onclick="openModal()">
          <div className="card-image-wrapper">
          <img src="https://source.unsplash.com/featured/1200x900/?hotel,modern" alt="Hotel"/>
        </div>
        <div className="card-info">
            <div className="card-text big cardText-js">Nombre del Hotel</div>
            <div className="card-text small">Lugar</div>
            <div className="card-text small">
              Starts from: 
              <span className="card-price">Precio</span>
            </div>
          </div>
          </a>
      </div>
    </div>
    <div className="app-main-right cards-area">
      <div className="app-main-right-header">
        <span>Latest Deals</span>
        <a href="#">See More</a>
      </div>
      <div className="card-wrapper main-card">
        <a className="card cardItemjs"  onclick="openModal()">
          <div className="card-image-wrapper">
          <img src="https://source.unsplash.com/featured/1200x900/?hotel-room,interior"/>
        </div>
        <div className="card-info">
            <div className="card-text big cardText-js">Nombre del Hotel</div>
            <div className="card-text small">Lugar</div>
            <div className="card-text small">
              Starts from: 
              <span className="card-price">Precio</span>
            </div>
          </div>
        </a>
      </div>
      <div className="card-wrapper main-card">
        <a className="card cardItemjs"  onclick="openModal()">
          <div className="card-image-wrapper">
          <img src="https://source.unsplash.com/featured/1200x900/?interior,hotel"/>
        </div>
        <div className="card-info">
            <div className="card-text big cardText-js">Nombre del Hotel</div>
            <div className="card-text small">Lugar</div>
            <div className="card-text small">
              Starts from: 
              <span className="card-price">Precio</span>
            </div>
          </div>
        </a>
      </div>
      <div className="card-wrapper main-card">
        <a className="card cardItemjs"  onclick="openModal()">
          <div className="card-image-wrapper">
          <img src="https://source.unsplash.com/featured/1200x900/?architecture,modern"/>
        </div>
        <div className="card-info">
            <div className="card-text big cardText-js">Nombre del Hotel</div>
            <div className="card-text small">Lugar</div>
            <div className="card-text small">
              Starts from: 
              <span className="card-price">Precio</span>
            </div>
          </div>
          </a>
      </div>
       <div className="card-wrapper main-card">
        <a className="card cardItemjs"  onclick="openModal()">
          <div className="card-image-wrapper">
          <img src="https://source.unsplash.com/featured/1200x900/?hotel,modern"/>
        </div>
        <div className="card-info">
            <div className="card-text big cardText-js">Nombre del Hotel</div>
            <div className="card-text small">Lugar</div>
            <div className="card-text small">
              Starts from: 
              <span className="card-price">Precio</span>
            </div>
          </div>
          </a>
      </div>
      <div className="card-wrapper main-card">
        <a className="card cardItemjs"  onclick="openModal()">
          <div className="card-image-wrapper">
          <img src="https://source.unsplash.com/featured/1200x900/?architecture,modern" alt="Hotel"/>
        </div>
        <div className="card-info">
            <div className="card-text big cardText-js">Nombre del Hotel</div>
            <div className="card-text small">Lugar</div>
            <div className="card-text small">
              Starts from: 
              <span className="card-price">Precio</span>
            </div>
          </div>
          </a>
      </div>
       <div className="card-wrapper main-card">
        <a className="card cardItemjs"  onclick="openModal()">
          <div className="card-image-wrapper">
          <img src="https://source.unsplash.com/featured/1200x900/?hotel,modern" alt="Hotel"/>
        </div>
        <div className="card-info">
            <div className="card-text big cardText-js">Nombre del Hotel</div>
            <div className="card-text small">Lugar</div>
            <div className="card-text small">
              Starts from: 
              <span className="card-price">Precio</span>
            </div>
          </div>
          </a>
      </div>
    </div>
  </section>
</div>
<div id="modal-window" className="shadow">
  <div className="main-modal">
    <div className="modal-left">
      <div className="modal-image-wrapper">
        <img src="https://source.unsplash.com/featured/1200x900/?design,hotel"/>
      </div>
      <div className="modal-info-header">
        <div className="left-side">
          <h1 className="modalHeader-js"></h1>
          <p>Stockton Street</p>
        </div>
        <div className="right-side">
          Starts from:
          <span className="amount">$1000</span>
        </div>
      </div>
      <div className="info-bar">
        <div className="info-wrapper">
          <div className="info-icon">
            <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          </div>
          <span>2 Bedrooms</span>
        </div>
        <div className="info-wrapper">
          <div className="info-icon">
            <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-wind"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>
          </div>
          <span>2 Bathrooms</span>
        </div>
        <div className="info-wrapper">
          <div className="info-icon">
            <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>
          </div>
          <span>1250m2</span>
        </div>
        <div className="info-wrapper">
          <div className="info-icon">
            <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <span>Highly Secured</span>
        </div>
      </div>
      <div className="desc-wrapper">
        <div className="modal-info-header">
          <h1>Description</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
        <div className="desc-actions">
          <button className="btn-book">Book Now</button>
          <div className="add-favourite">
            <input type="checkbox" id="favourite"/>
            <label for="favourite">
              <span className="favourite-icon">
                <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>  
                </span>
              <span>Add to favourites</span>
            </label>
          </div>
        </div>
      </div>
      </div>
     <div classNameName="modal-right">
       <div classNameName="app-main-right-header">
        <span>Reviews</span>
        <a href="#">See All</a>
      </div>
       <div classNameName="card-wrapper">
         <div classNameName="card">
           <div classNameName="profile-info-wrapper">
             <div classNameName="profile-img-wrapper">
               <img src="https://source.unsplash.com/featured/1200x900/?woman,cool" alt="Review"/>
             </div>
             <p>Jessica Finnick</p>
           </div>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
         </div>
      </div>
       <div classNameName="card-wrapper">
         <div classNameName="card">
           <div classNameName="profile-info-wrapper">
             <div classNameName="profile-img-wrapper">
               <img src="https://source.unsplash.com/featured/1200x900/?woman,latina" alt="Review"/>
             </div>
             <p>Gloria Ramirez</p>
           </div>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
         </div>
      </div>
       <div classNameName="card-wrapper">
         <div classNameName="card">
           <div classNameName="profile-info-wrapper">
             <div classNameName="profile-img-wrapper">
               <img src="https://source.unsplash.com/featured/1200x900/?man,art" alt="Review"/>
             </div>
             <p>Luck Besson</p>
           </div>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
         </div>
      </div>
       <div classNameName="card-wrapper">
         <div classNameName="card">
           <div classNameName="profile-info-wrapper">
             <div classNameName="profile-img-wrapper">
               <img src="https://source.unsplash.com/featured/1200x900/?woman,adventure" alt="Review"/>
             </div>
             <p>Luna Rosa</p>
           </div>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
         </div>
      </div>
       <div classNameName="card-wrapper">
         <div classNameName="card">
           <div classNameName="profile-info-wrapper">
             <div classNameName="profile-img-wrapper">
               <img src="https://source.unsplash.com/featured/1200x900/?man,modern" alt="Review"/>
             </div>
             <p>John mayer</p>
           </div>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
         </div>
      </div>
       <div classNameName="card-wrapper">
         <div classNameName="card">
           <div classNameName="profile-info-wrapper">
             <div classNameName="profile-img-wrapper">
               <img src="https://source.unsplash.com/featured/1200x900/?woman" alt="Review"/>
             </div>
             <p>Tina Finnick</p>
           </div>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
         </div>
      </div>
       <div classNameName="card-wrapper">
         <div classNameName="card">
           <div classNameName="profile-info-wrapper">
             <div classNameName="profile-img-wrapper">
               <img src="https://source.unsplash.com/featured/1200x900/?woman,modern" alt="Review"/>
             </div>
             <p>July Wallock</p>
           </div>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
         </div>
      </div>

     </div>
    <button classNameName="btn btn-close" onclick="closeM()">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" classNameName="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    </div>    
  </div>
<script> 
  let ini= document.querySelector('#modal-window');
  ini.classNameNameList.add("hideModal");
</script>
    </>
  )
}