import React from 'react';
import './style.css';
import BG from '../../image/dai-hoc-su-pham-ky-thuat-co-tot-khong-2.jpg';
import IMAGE from '../../image/dai-hoc-spkt-tphcm.jpg';
import GROUP from '../../image/group.png';
import CHUONG from '../../image/chuong.png';
import KN from '../../image/kn.png';
import CTXH from '../../image/ctxh.jpg';
import TNXK from '../../image/tnxk.png';
import ESC from '../../image/esc.png';
import { Link } from "react-router-dom";

NewFeedFeature.propTypes = {
    
};

function NewFeedFeature(props) {
    return (
        <div>
            <header className="u-clearfix u-header u-palette-3-base u-header" id="sec-f8c1">
                <div className="u-align-left u-clearfix u-sheet u-sheet-1">
                    <h1 className="u-text u-text-body-alt-color u-text-1">UTECLUBS</h1>
                </div>
            </header>
            <section className="u-clearfix u-section-1" id="sec-877b">
                <div className="u-clearfix u-sheet u-sheet-1">
                <div className="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
                    <div className="u-layout">
                    <div className="u-layout-row">
                        <div className="u-container-style u-layout-cell u-size-12 u-layout-cell-1">
                        <div className="u-border-2 u-border-grey-75 u-container-layout u-valign-top u-container-layout-1">
                            <img className="u-image u-image-circle u-image-1" src={BG} alt="" data-image-width={300} data-image-height={300} />
                            <Link to='/infochange' className="u-text u-text-default u-text-1">Trang cá nhân</Link>
                            <div className="u-border-3 u-border-grey-dark-1 u-line u-line-horizontal u-line-1" />
                            <img className="u-image u-image-circle u-image-2" src={GROUP} alt="" data-image-width={860} data-image-height={900} />
                            <Link to='/' className="u-border-1 u-border-active-palette-2-base u-border-hover-palette-1-base u-btn u-button-style u-none u-text-palette-1-base u-btn-1">Các câu lạc bộ</Link>
                            <img className="u-image u-image-circle u-preserve-proportions u-image-3" src={CHUONG} alt="" data-image-width={2000} data-image-height={2000} />
                            <Link to='/noti' className="u-border-1 u-border-active-palette-2-base u-border-hover-palette-1-base u-btn u-button-style u-none u-text-palette-1-base u-btn-2">Thông báo mới</Link>
                        </div>
                        </div>
                        <div className="u-container-style u-layout-cell u-size-37 u-layout-cell-2">
                        <div className="u-border-2 u-border-grey-75 u-container-layout u-container-layout-2">
                            <img className="u-image u-image-round u-preserve-proportions u-radius-10 u-image-4" src={CTXH} alt="" data-image-width={900} data-image-height={900} />
                            <img className="u-image u-image-round u-radius-10 u-image-5" src={KN} alt="" data-image-width={500} data-image-height={164} />
                            <img className="u-image u-image-round u-preserve-proportions u-radius-10 u-image-6" src={ESC} alt="" data-image-width={225} data-image-height={225} />
                            <img className="u-image u-image-round u-radius-10 u-image-7" src={TNXK} alt="" data-image-width={705} data-image-height={287} />
                            <div className="u-shape u-shape-svg u-text-palette-1-base u-shape-1">
                            <svg className="u-svg-link" preserveAspectRatio="none" viewBox="0 0 160 160" style={{}}><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-b5b3" /></svg>
                            <svg className="u-svg-content" viewBox="0 0 160 160" x="0px" y="0px" id="svg-b5b3"><path d="M80,0C35.9,0,0,35.9,0,80s35.9,80,80,80s80-35.9,80-80S124.1,0,80,0z M118.5,86.2H86.2V120c0,3.4-2.8,6.2-6.2,6.2
                s-6.2-2.8-6.2-6.2V86.2H41.5c-3.4,0-6.2-2.8-6.2-6.2s2.8-6.2,6.2-6.2h32.3V43.1c0-3.4,2.8-6.2,6.2-6.2s6.2,2.8,6.2,6.2v30.8h32.3
                c3.4,0,6.2,2.8,6.2,6.2S121.9,86.2,118.5,86.2z" /></svg>
                            </div>
                            <div className="u-border-1 u-border-grey-dark-1 u-line u-line-horizontal u-line-2" />
                            <div className="u-form u-form-1">
                            <form action="#" method="POST" className="u-clearfix u-form-horizontal u-form-spacing-15 u-inner-form" style={{padding: '15px'}} source="custom">
                                <div className="u-form-group u-form-name">
                                <label htmlFor="name-558c" className="u-form-control-hidden u-label">Status</label>
                                <input type="text" placeholder="Hôm nay bạn nghĩ gì?" id="name-558c" name="name" className="u-border-1 u-border-grey-30 u-input u-input-rectangle" required />
                                </div>
                                <div className="u-form-group u-form-submit">
                                <a href="#" className="u-border-1 u-border-active-palette-2-base u-border-hover-palette-3-base u-btn u-btn-submit u-button-style u-none u-text-palette-1-base u-btn-3">Đăng<br />
                                </a>
                                <input type="submit" defaultValue="submit" className="u-form-control-hidden" />
                                </div>
                            </form>
                            </div>
                            <div className="u-container-style u-expanded-width u-group u-white u-group-1">
                            <div className="u-container-layout u-container-layout-3"><span className="u-icon u-icon-circle u-text-palette-1-base u-icon-1"><svg className="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 53 53" style={{}}><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-71a7" /></svg><svg className="u-svg-content" viewBox="0 0 53 53" x="0px" y="0px" id="svg-71a7" style={{enableBackground: 'new 0 0 53 53'}}><path style={{fill: '#E7ECED'}} d="M18.613,41.552l-7.907,4.313c-0.464,0.253-0.881,0.564-1.269,0.903C14.047,50.655,19.998,53,26.5,53
                c6.454,0,12.367-2.31,16.964-6.144c-0.424-0.358-0.884-0.68-1.394-0.934l-8.467-4.233c-1.094-0.547-1.785-1.665-1.785-2.888v-3.322
                c0.238-0.271,0.51-0.619,0.801-1.03c1.154-1.63,2.027-3.423,2.632-5.304c1.086-0.335,1.886-1.338,1.886-2.53v-3.546
                c0-0.78-0.347-1.477-0.886-1.965v-5.126c0,0,1.053-7.977-9.75-7.977s-9.75,7.977-9.75,7.977v5.126
                c-0.54,0.488-0.886,1.185-0.886,1.965v3.546c0,0.934,0.491,1.756,1.226,2.231c0.886,3.857,3.206,6.633,3.206,6.633v3.24
                C20.296,39.899,19.65,40.986,18.613,41.552z" /><g><path style={{fill: '#556080'}} d="M26.953,0.004C12.32-0.246,0.254,11.414,0.004,26.047C-0.138,34.344,3.56,41.801,9.448,46.76
                    c0.385-0.336,0.798-0.644,1.257-0.894l7.907-4.313c1.037-0.566,1.683-1.653,1.683-2.835v-3.24c0,0-2.321-2.776-3.206-6.633
                    c-0.734-0.475-1.226-1.296-1.226-2.231v-3.546c0-0.78,0.347-1.477,0.886-1.965v-5.126c0,0-1.053-7.977,9.75-7.977
                    s9.75,7.977,9.75,7.977v5.126c0.54,0.488,0.886,1.185,0.886,1.965v3.546c0,1.192-0.8,2.195-1.886,2.53
                    c-0.605,1.881-1.478,3.674-2.632,5.304c-0.291,0.411-0.563,0.759-0.801,1.03V38.8c0,1.223,0.691,2.342,1.785,2.888l8.467,4.233
                    c0.508,0.254,0.967,0.575,1.39,0.932c5.71-4.762,9.399-11.882,9.536-19.9C53.246,12.32,41.587,0.254,26.953,0.004z" />
                                    </g></svg></span>
                                <h6 className="u-text u-text-default u-text-palette-3-base u-text-2">Mai Hương</h6>
                                <p className="u-text u-text-default u-text-3"> 6 phút trước</p>
                                <p className="u-text u-text-default u-text-4">Hôm nay cùng điểm danh với câu lạc bộ nhé các bạn.<br />
                                <br />Các bạn đã chuẩn bị xong chưa?
                                </p>
                                <img className="u-image u-image-default u-image-8" src={IMAGE} alt="" data-image-width={1200} data-image-height={780} /><span className="u-icon u-icon-circle u-text-palette-1-base u-icon-2"><svg className="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 50 50" style={{}}><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-8654" /></svg><svg className="u-svg-content" viewBox="0 0 50 50" x="0px" y="0px" id="svg-8654" style={{enableBackground: 'new 0 0 50 50'}}><path style={{fill: 'currentColor'}} d="M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543
                c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503
                c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z" /></svg></span><span className="u-icon u-icon-circle u-text-palette-3-base u-icon-3"><svg className="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 51.997 51.997" style={{}}><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-4c48" /></svg><svg className="u-svg-content" viewBox="0 0 51.997 51.997" x="0px" y="0px" id="svg-4c48" style={{enableBackground: 'new 0 0 51.997 51.997'}}><g><path d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905
                    c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478
                    c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014
                    C52.216,18.553,51.97,16.611,51.911,16.242z M49.521,21.261c-0.984,4.172-3.265,7.973-6.59,10.985L25.855,47.481L9.072,32.25
                    c-3.331-3.018-5.611-6.818-6.596-10.99c-0.708-2.997-0.417-4.69-0.416-4.701l0.015-0.101C2.725,9.139,7.806,3.826,14.158,3.826
                    c4.687,0,8.813,2.88,10.771,7.515l0.921,2.183l0.921-2.183c1.927-4.564,6.271-7.514,11.069-7.514
                    c6.351,0,11.433,5.313,12.096,12.727C49.938,16.57,50.229,18.264,49.521,21.261z" />
                                    </g></svg></span><span className="u-icon u-icon-circle u-icon-4"><svg className="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 60 60" style={{}}><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-3692" /></svg><svg className="u-svg-content" viewBox="0 0 60 60" x="0px" y="0px" id="svg-3692" style={{enableBackground: 'new 0 0 60 60'}}><path style={{fill: 'currentColor', stroke: '#7383BF', strokeWidth: 2, strokeLinecap: 'round', strokeMiterlimit: 10}} d="M50.003,27
                c-0.115-8.699-7.193-16-15.919-16c-5.559,0-10.779,3.005-13.661,7.336C19.157,17.493,17.636,17,16,17c-4.418,0-8,3.582-8,8
                c0,0.153,0.014,0.302,0.023,0.454C8.013,25.636,8,25.82,8,26c-3.988,1.912-7,6.457-7,11.155C1,43.67,6.33,49,12.845,49h24.507
                c0.138,0,0.272-0.016,0.408-0.021C37.897,48.984,38.031,49,38.169,49h9.803C54.037,49,59,44.037,59,37.972
                C59,32.601,55.106,27.961,50.003,27z" /><path style={{fill: 'currentColor', stroke: '#7383BF', strokeWidth: 2, strokeLinecap: 'round', strokeMiterlimit: 10}} d="M50.003,27
                c0,0-2.535-0.375-5.003,0" /><path style={{fill: 'currentColor', stroke: '#7383BF', strokeWidth: 2, strokeLinecap: 'round', strokeMiterlimit: 10}} d="M8,25c0-4.418,3.582-8,8-8
                s8,3.582,8,8" /></svg></span><span className="u-icon u-icon-circle u-icon-5"><svg className="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 57 57" style={{}}><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-9f38" /></svg><svg className="u-svg-content" viewBox="0 0 57 57" x="0px" y="0px" id="svg-9f38" style={{enableBackground: 'new 0 0 57 57'}}><g><path style={{fill: '#424A60'}} d="M42.111,8.847c-0.473-0.29-1.087-0.143-1.376,0.327c-0.29,0.471-0.143,1.086,0.327,1.376
                    C48.224,14.96,52.5,22.604,52.5,31c0,2.067-0.271,4.137-0.805,6.152c-0.141,0.533,0.177,1.081,0.711,1.223
                    c0.085,0.022,0.172,0.033,0.256,0.033c0.443,0,0.848-0.296,0.966-0.744C54.207,35.482,54.5,33.24,54.5,31
                    C54.5,21.905,49.869,13.623,42.111,8.847z" /><path style={{fill: '#424A60'}} d="M37.671,53.182C34.756,54.388,31.671,55,28.5,55c-6.728,0-13.189-2.854-17.728-7.832
                    c-0.372-0.408-1.003-0.437-1.413-0.065c-0.408,0.372-0.437,1.005-0.065,1.413C14.211,53.907,21.211,57,28.5,57
                    c3.435,0,6.778-0.663,9.936-1.971c0.51-0.211,0.753-0.796,0.542-1.307C38.767,53.213,38.181,52.971,37.671,53.182z" /><path style={{fill: '#424A60'}} d="M22.784,7.687c0.537-0.132,0.865-0.673,0.734-1.209c-0.13-0.536-0.674-0.862-1.208-0.734
                    C11.302,8.434,3.371,17.838,2.573,29.146c-0.039,0.551,0.376,1.029,0.927,1.067c0.024,0.002,0.048,0.003,0.071,0.003
                    c0.521,0,0.959-0.402,0.997-0.93C5.305,18.85,12.625,10.169,22.784,7.687z" />
                                    </g><circle style={{fill: '#EBBA16'}} cx="28.5" cy={6} r={6} /><circle style={{fill: '#7383BF'}} cx="6.5" cy={43} r={6} /><circle style={{fill: '#43B05C'}} cx="50.5" cy={43} r={6} /></svg></span>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="u-container-style u-layout-cell u-size-11 u-layout-cell-3">
                        <div className="u-border-2 u-border-grey-75 u-container-layout u-container-layout-4" />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            <footer className="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-5843"><div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
                <p className="u-small-text u-text u-text-variant u-text-1">
                    <span style={{fontSize: '1rem', fontWeight: 700}}>UTECLUBS</span>
                    <br />Mai Huong - Minh Quan
                </p>
                </div>
            </footer>
        </div>

    );
}

export default NewFeedFeature;