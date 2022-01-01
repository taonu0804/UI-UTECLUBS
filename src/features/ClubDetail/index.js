import React, { Component } from 'react';
import './style.css';
import Validator from '../../utils/validator.js';
import { storage } from '../../firebase';

class ClubDetailFeature extends Component {
  constructor (props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0,
      clubs: [],
      errors: {},
    }

    this.handleChange = this
      .handleChange
      .bind(this);
      this.handleUpload = this.handleUpload.bind(this);

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

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
    }
  }

  handleUpload = () => {
    const {image} = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on('state_changed',
    (snapshot) => {
      // progrss function ....
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.setState({progress});
    },
    (error) => {
         // error function ....
      console.log(error);
    },
  () => {
      // complete function ....
      storage.ref('images').child(image.name).getDownloadURL().then(url => {
        console.log(url);
        this.setState({url});
      });
    });
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

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
                  <input className='club-name' name='clubName' value={this.state.clubName} onChange={this.handleInput} required></input>
                  {errors.clubName && <div className="validation1" style={{display: 'block'}}>{errors.clubName}</div>}
                </div>
                <div className='img-area'>
                  <progress value={this.state.progress} max="100" hidden={true}/>
                  <label for="files" className='img'>Tải ảnh lên</label>
                  <input id='files' type='file' className='img' name='img' onChange={this.handleChange} hidden='true' required/>
                  <button className='changeimg' onClick={this.handleUpload}></button>
                  <img src={this.state.url} value={this.state.logoUrl} className='club-img' alt=" "/>
                </div>
                <div className='unit-area'>
                  <h5 className='lead-text'><b>Đơn vị: </b></h5>
                  <input className='lead-name' name='afficatedUnit' value={this.state.afficatedUnit} onChange={this.handleInput} required></input>
                  {errors.afficatedUnit && <div className="validation2" style={{display: 'block'}}>{errors.afficatedUnit}</div>}
                </div>
                <div className='desc-area'>
                  <p className='desc'><b>Mô tả: </b></p>
                  <input className='desc-detail' name='description' value={this.state.description} onChange={this.handleInput} required></input>
                  {errors.description && <div className="validation3" style={{display: 'block'}}>{errors.description}</div>}
                </div>
                  <button type="submit" class="bouton-contact" onClick={this.handleSubmit}>Cập nhật</button>
              </div>
          </div>
      );
    }
}

export default ClubDetailFeature;