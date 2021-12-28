import React, { Component } from 'react';
import './style.css';
import TNXK from '../../image/tnxk.png';
import Validator from '../../utils/validator.js';


class ClubDetailFeature extends Component {
  constructor (props) {
    super(props);
    this.state = {
      clubs: [],
      errors: {},
    }

    const requiredWith = (value, field, state) => (!state[field] && !value) || !!value;

    const rules = [
      {
        field: 'clubName',
        method: 'isEmpty',
        validWhen: false,
        message: 'The club name field is required.',
      },
      {
        field: 'afficatedUnit',
        method: 'isEmpty',
        validWhen: false,
        message: 'The unit field is required.',
      },
      {
        field: 'description',
        method: 'isEmpty',
        validWhen: false,
        message: 'The description field is required.',
      },
    ];
    this.validator = new Validator(rules);
  }

  componentDidMount() {
    fetch('')
    .then((response) => response.json())
    .then(item => {
        this.setState({ clubs: item });
    });
  }

  handleSubmit = (e) => {
    this.setState({
      errors: this.validator.validate(this.state),
    });
    console.log(this.state);
  };

  render() {
    const {errors} = this.state;
      return (
          <div>
              <div className='detail-contain'>
                <div className='name-area'>
                  <input className='club-name'></input>
                  {errors.clubName && <div className="validation1" style={{display: 'block'}}>{errors.clubName}</div>}
                </div>
                  <img className='club-img' src={TNXK}/>
                <div className='unit-area'>
                  <h5 className='lead-text'><b>Đơn vị: </b></h5>
                  <input className='lead-name'></input>
                  {errors.afficatedUnit && <div className="validation2" style={{display: 'block'}}>{errors.afficatedUnit}</div>}
                </div>
                <div className='desc-area'>
                  <p className='desc'><b>Mô tả: </b></p>
                  <input className='desc-detail'></input>
                  {errors.description && <div className="validation3" style={{display: 'block'}}>{errors.description}</div>}
                </div>
                  <button type="submit" class="bouton-contact" onClick={this.handleSubmit}>Update</button>
              </div>
          </div>
      );
    }
}

export default ClubDetailFeature;