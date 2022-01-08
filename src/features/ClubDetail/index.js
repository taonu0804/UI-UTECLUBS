import React, { Component } from 'react';
import './style.css';
import Validator from '../../utils/validator.js';
import { storage } from '../../firebase';
import jwt from 'jwt-decode';
import { matchPath } from 'react-router';

class ClubDetailFeature extends Component {
  constructor (props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0,
      clubs: [],
      errors: {},
      showBtn: false,
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
    const match = matchPath(this.props.history.location.pathname, {
      path: '/clubdetail/:clubId',
      exact: true,
      strict: false
    })
    const id = match.params.clubId;
    console.log('id', id);

    fetch('http://localhost:8080/admin/club-management/' + `${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/html',
        'access-control-allow-headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'access-control-allow-methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
      },
   },
   {withCredentials: false})
    .then((response) => response.json())
    .then(item => {
        this.setState({ clubs: item });
        console.log(item);
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
    const {clubs} = this.state;
      return (
          <div>
              <div className='detail-contain'>
                <div className='name-area'>
                  <input className='club-name' name='clubName' value={clubs.clubName} onChange={this.handleInput} required/>
                  {errors.clubName && <div className="validation1" style={{display: 'block'}}>{errors.clubName}</div>}
                </div>
                <div className='img-area'>
                  <progress value={this.state.progress} max="100" hidden={true}/>
                  <label for="files" className='img'>Tải ảnh lên</label>
                  <input id='files' type='file' className='img' name='img' onChange={this.handleChange} hidden='true' required/>
                  <button className='changeimg' onClick={this.handleUpload}></button>
                  <img src={clubs.logoUrl} value={this.state.url} className='club-img' alt=" "/>
                </div>
                <div className='unit-area'>
                  <h5 className='lead-text'><b>Đơn vị: </b></h5>
                  <input className='lead-name' name='affiliatedUnit' value={clubs.affiliatedUnit} onChange={this.handleInput} required/>
                  {errors.afficatedUnit && <div className="validation2" style={{display: 'block'}}>{errors.afficatedUnit}</div>}
                </div>
                <div className='desc-area'>
                  <p className='desc'><b>Mô tả: </b></p>
                  <input className='desc-detail' name='description' value={clubs.description} onChange={this.handleInput} required/>
                  {errors.description && <div className="validation3" style={{display: 'block'}}>{errors.description}</div>}
                </div>
                  <button type="submit" class="bouton-contact" onClick={this.handleSubmit}>Cập nhật</button>
              </div>
          </div>
      );
    }
}

export default ClubDetailFeature;