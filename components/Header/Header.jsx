import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { headerData } from './HeaderData';

const Header = () => {
	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (showMenu && !event.target.closest('.header-menu, .mobile-nav-toggle')) {
				setShowMenu(false);
			}
		};

		document.addEventListener('click', handleOutsideClick);

		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, [showMenu]);

	return (
		<header>
			<div className="header-placeholder"></div>
			<div className="header with-placeholder">
				<div className="container-fluid">
					<div className="header-logo">
						<h6 className="sm-heading"><Link href="/">{headerData.logo}</Link></h6>
					</div>
					<div className={`header-menu ${showMenu ? 'show' : ''}`}>
						<ul className="nav">
							{headerData.navlinks.map((item, index) => (
								<li key={index} className="nav-item">
									<Link className="nav-link" href={item.url}>{item.title}</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="header-end">
						<ul className="list-inline-lg">
							{headerData.socialMediaLinks.map((item, index) => (
								<li key={index}><a href={item.url}><i className={item.bootstrapIcon}></i></a></li>
							))}
						</ul>
					</div>
					{/* Mobile Nav Toggle */}
					<button className={`mobile-nav-toggle ${showMenu ? 'active' : ''}`} onClick={toggleMenu}>
						<span></span>
					</button>
				</div> {/* end container-fluid */}
			</div>
		</header>

	);
};

export default Header;
