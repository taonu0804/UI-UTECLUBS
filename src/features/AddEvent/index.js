import React, {Component, useState} from 'react';
import './style.css';
import AVA from '../../image/1.png';
import GAME from '../../image/puzzle.jpg';
import XTN from '../../image/xtn.jpg';
import XTN1 from '../../image/xtn1.jpg';
import MHX from '../../image/mhx.jpg';
import TT from '../../image/tt.jpg';
import AddEventSmallFeature from '../Component/AddEvent';
import { matchPath } from 'react-router-dom';

class AddEventFeature extends Component {
    constructor (props) {
        super(props);
        this.state = {
            clubId: null,
          }
    }


    componentDidMount() {
        const match = matchPath(this.props.history.location.pathname, {
            path: '/addevent/:clubId',
            exact: true,
            strict: false
        })
        const id = match.params.clubId;
        console.log('id', id);

        this.setState({clubId: id})
    }

    render() {
        return (
            <div className='fullbody'>
                <div className='add-sk'>
                    <AddEventSmallFeature clubId={this.state.clubId}/>
                </div>

                <div className='samplee1'>
                    <p className='sample-title'>Sự kiện mẫu</p>

                    <div className='samplee'>
                        <img src={XTN} className='sampleava'/><p className='samplename'><b>Xuân tình nguyện</b></p>
                        <p className='sampledetail'>Sự kiện dành cho toàn thể sinh viên trường</p>
                        <img className='game' src={XTN1}/>
                    </div>
                </div>

                <div className='sample2'>
                    <div className='sample21'>
                        <img className='skava' src={MHX}/>
                        <p className='skname'>Mùa hè xanh</p>
                    </div>
                    <div className='sample21'>
                        <img className='skava' src={XTN}/>
                        <p className='skname'>Xuân tình nguyện</p>
                    </div>
                    <div className='sample21'>
                        <img className='skava' src={TT}/>
                        <p className='skname'>Trung thu</p>
                    </div>
                    <div className='sample21'>
                        <img className='skava' src={AVA}/>
                        <p className='skname'>Hackathon</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddEventFeature;