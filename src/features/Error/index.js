import React from 'react';
import './style.css';
import BG from '../../image/green.png';
import ERR from '../../image/error.png';
import { useHistory } from 'react-router-dom';

ErrorFeature.propTypes = {
    
};

function ErrorFeature(props) {
    const history = useHistory();
    const handleMoving = () => {history.push('/login')};

    return (
        <div className='errorbody'>
            <div className="not-found">
                <div className="notfound-top">
                <img className='error' src={ERR}/>
                </div>
                <div className="conten">
                <img src={BG} alt="" title />
                <h3>Tiếc quá! Hãy đăng nhập để tiếp tục</h3>
                <form>
                    <button className='loginbtn' onClick={handleMoving}> ĐĂNG NHẬP </button>
                </form>
                <ul className="social-icon">
                    <li><a className="fa" href="#"> </a></li>
                    <li><a className="tw" href="#"> </a></li>
                    <li><a className="g" href="#"> </a></li>
                </ul>
                </div>
                <div className="clear"> </div>
            </div>
            <div className="copyright">
                <p>Mai Huong - Minh Quan</p>
            </div>
        </div>

    );
}

export default ErrorFeature;