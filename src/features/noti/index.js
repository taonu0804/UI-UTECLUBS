import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import '../../common.css';

NotiFeature.propTypes = {
};

function NotiFeature(props) {
    return (
        <div>
            <header className="u-clearfix u-header u-palette-3-base u-header" id="sec-f8c1"><div className="u-align-left u-clearfix u-sheet u-sheet-1" /></header>
            <section className="u-align-center u-clearfix u-white u-section-1" id="sec-a6b4">
                <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
                <div className="u-expanded-width-xs u-image u-image-circle u-preserve-proportions u-image-1" data-image-width={2000} data-image-height={2000}>
                    <div className="u-preserve-proportions-child" style={{paddingTop: '100%'}} />
                </div>
                <p className="u-text u-text-default u-text-not-found-message u-text-1">Không có thông báo mới</p>
                <Link to='#' className="u-active-palette-1-light-1 u-btn u-button-style u-hover-palette-1-light-1 u-palette-1-base u-text-active-white u-text-body-alt-color u-text-hover-white u-btn-1">Trở về trang chủ</Link>
                </div>
            </section>
            <footer className="u-align-center u-clearfix u-footer u-white u-footer" id="sec-5843"><div className="u-align-left u-clearfix u-sheet u-sheet-1" />
            </footer>
        </div>

    );
}

export default NotiFeature;