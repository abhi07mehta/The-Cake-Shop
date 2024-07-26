import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './footer.css'
import qiuLogo from "../assets/QiuLogoSolid2.png"
import { FaInstagram, FaFacebook, FaWhatsapp, FaLocationArrow, FaMailBulk, FaPhoneAlt } from "react-icons/fa"

const FooterHome = () => {
    return (
        <>
        <section class="deneb_cta">
	<div class="container">
		<div class="cta_wrapper">
			<div class="row align-items-center">
				<div class="col-lg-7">
					<div class="cta_content">
						<h3> Want to design yourself?</h3>
						<p>We also make cakes based on your request</p>
					</div>
				</div>
				<div class="col-lg-5">
                            <Button style={{background:"#388087",border:"none"}} className="mx-5 px-5 py-2">
                                <Link style={{textDecoration:"none",color:"white"}} to="/usercustomcake" >Custom Cake</Link>
                            </Button>
				</div>
			</div>
		</div>
	</div>
</section>
            <footer className="deneb_footer">
	<div className="widget_wrapper" >
		<div className="container">
			<div className="row">
				<div className="col-lg-4 col-md-6 col-12">
					<div className="widget widegt_about">
						<div className="widget_title">
                        <img style={{width:"170px",height:"65px",}} alt="qiu" className=" border-0 m-0 rounded-pill p-0"  src={qiuLogo} />
						</div>
						<p className = "mx-5">Made with Love and Creativity</p>
						<ul className="social">
							<li><a href="_#"><FaFacebook className="fs-2" /></a></li>
							<li><a target="_blank" href="/"><FaWhatsapp className="fs-2" /></a></li>
							<li><a target="_blank" href="/"><FaInstagram className="fs-2" /></a></li>
						</ul>
					</div>
				</div>
				<div className="col-lg-4 col-md-6 col-sm-12">
					<div className="widget widget_link">
						<div className="widget_title">
							<h4>Links</h4>
						</div>
						<ul>
							<li><a href="_#">About Us</a></li>
							<li><a href="_#">Service</a></li>
							<li><a href="_#">Portfolio</a></li>
							<li><a href="_#">Blog</a></li>
						</ul>
					</div>
				</div>
				<div className="col-lg-4 col-md-6 col-sm-12">
					<div className="widget widget_contact">
						<div className="widget_title">
							<h4>Contact</h4>
						</div>
						<div className="contact_info">
							<div className="single_info">
								<div className="icon">
									<FaPhoneAlt className="fs-3"/>
								</div>
								<div className="info">
									<p><a href="tel:+918866443258">+91 8866443258</a></p>
								</div>
							</div>
							<div className="single_info">
								<div className="icon">
                                    <FaMailBulk className="fs-3"/>
								</div>
								<div className="info">
									<p><a href="mailto:info@deneb.com">TCScakes@gmail.com</a></p>
								</div>
							</div>
							<div className="single_info">
								<div className="icon">
									<FaLocationArrow className="fs-3"/>
								</div>
								<div className="info">
									<p>Lonavala Hills<span>Pune</span></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div className="copyright_area">
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<div className="copyright_text">
						<p>Copyright &copy; 2024 All rights reserved.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>
        </>
    )
}

export default FooterHome;