import React from 'react';
import classes from './Footer.module.css';

function Footer() {
  return (
    <footer className={classes.Footer}>
    <div  className={classes.FooterHead}>

        <h2>HAPPY <span>PRANCER</span></h2>
    </div>
        
        <div className={classes.FooterTag}>
        <a href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md  " target="_blank">
        <i class="fa-brands fa-youtube"></i>
        </a>
        <a href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md  " target="_blank">
            <i class="fab fa-twitter"></i>
        </a>
        <a href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md  " target="_blank">
          <i class="fab fa-facebook"></i>
        </a>
        <a href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md  " target="_blank">
          <i class="fab fa-instagram"></i>
        </a>
      </div>
      <hr/>
      <div className={classes.FooterMain}>
      <div className={` ${classes.FooterSec}`}>
            <ul className={classes.FooterList}>
                <li><a><i class="fa-solid fa-address-card"></i> About Us </a></li>
                <li><a><i class="fa-solid fa-graduation-cap"></i> Careers </a></li>
                {/* <li><a>Gym Affiliation</a></li>
                <li><a>Privacy Police</a></li> */}
            </ul>
      </div>
      <div className={` ${classes.FooterSec}`}>
            <ul className={classes.FooterList}>
                <li><a><i class="fa-solid fa-dumbbell"></i> Gym Affiliation </a></li>
                <li><a><i class="fa-solid fa-check-to-slot"></i> Privacy Police </a></li>
            </ul>
      </div>
      </div>
      <div className={classes.FooterCopyRight}>
          <p>All copyrights reserved <span><i class="fa-solid fa-copyright"></i></span> 2022, happyprancer.com</p>
      </div>
    </footer>
  )
}

export default Footer