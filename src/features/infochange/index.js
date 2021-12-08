import React from 'react';
import './style.css';
import '../../common.css';

InfoChangeFeature.propTypes = {
    
};

function InfoChangeFeature(props) {
    return (
        <div>
            <header className="u-clearfix u-header u-palette-3-base u-header" id="sec-f8c1"><div className="u-align-left u-clearfix u-sheet u-sheet-1" /></header>
            <section className="u-align-center u-clearfix u-image u-section-1" id="carousel_9c45" data-image-width={810} data-image-height={1080}>
                <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
                <div className="u-palette-3-base u-shape u-shape-rectangle u-shape-1" />
                <div className="u-container-style u-group u-radius-50 u-shape-round u-white u-group-1">
                    <div className="u-container-layout u-container-layout-1">
                    <h2 className="u-align-center u-custom-font u-font-montserrat u-text u-text-1">CHỈNH SỬA THÔNG TIN</h2>
                    <div className="u-form u-form-1">
                        <form action="#" method="POST" className="u-clearfix u-form-spacing-13 u-form-vertical u-inner-form" style={{padding: 0}} source="custom" name="form">
                        <div className="u-form-oldpassword u-form-group">
                            <label htmlFor="oldpassword-f18c" className="u-label u-label-1">Mật khẩu cũ</label>
                            <input type="password" placeholder="Vui lòng nhập mật khẩu cũ" id="oldpassword-f18c" name="oldpassword" className="u-grey-5 u-input u-input-rectangle u-input-1" required />
                        </div>
                        <div className="u-form-group u-form-newpassword">
                            <label htmlFor="newpassword-f18c" className="u-label u-label-2">Mật khẩu mới</label>
                            <input type="password" placeholder="Vui lòng nhập mật khẩu mới" id="newpassword-f18c" name="newpassword-1" className="u-grey-5 u-input u-input-rectangle u-input-2" required />
                        </div>
                        <div className="u-form-group u-form-repassword u-form-group-3">
                            <label htmlFor="repassword-cbff" className="u-label u-label-3" wfd-invisible="true">Nhập lại mật khẩu mới</label>
                            <input type="password" placeholder="Vui lòng nhập lại mật khẩu mới" id="repassword-cbff" name="repassword-2" className="u-grey-5 u-input u-input-rectangle u-input-3" required />
                        </div>
                        <div className="u-align-center u-form-group u-form-submit">
                            <a href="#" className="u-border-none u-btn u-btn-submit u-button-style u-palette-3-base u-btn-1">thay đổi</a>
                            <input type="submit" defaultValue="submit" className="u-form-control-hidden" wfd-invisible="true" />
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            <footer className="u-align-center u-clearfix u-footer u-white u-footer" id="sec-5843"><div className="u-align-left u-clearfix u-sheet u-sheet-1" /></footer>
        </div>

    );
}

export default InfoChangeFeature;