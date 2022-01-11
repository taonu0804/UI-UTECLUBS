import React, { Component } from 'react';
import './style.css';
import Validator from '../../utils/validator.js';
import { storage } from '../../firebase';
import { matchPath } from 'react-router';
import { Link } from 'react-router-dom';
import BTN from '../../image/qly.png';

class ClubDetailFeature extends Component {
  constructor (props) {
    super(props);
    this.state = {
      image: null,
      progress: 0,
      url: '',
      clubs: [],
      errors: {},
      showBtn: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    const requiredWith = (value, field, state) => (!state[field] && !value) || !!value;

    const rules = [
      {
        field: 'clubName',
        method: 'isEmpty',
        validWhen: false,
        message: 'The club name field is required.',
      },
      {
        field: 'affiliatedUnit',
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

    const access_token = localStorage.getItem('access_token');
    console.log('token', access_token);

    fetch('http://localhost:8080/admin/club-management/' + `${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
   },
   {withCredentials: false})
    .then((response) => response.json())
    .then(item => {
        this.setState({ clubs: item });
        console.log('item', item);
    });
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
      console.log('image', image);
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
        this.setState({url})
      });
    });
  };

  handleSubmit = (id, clubName, affiliatedUnit, description, logoUrl) => {
    const access_token = localStorage.getItem('access_token');
    console.log('token', access_token);

    var body = {
      id: id,
      clubName: (this.state.clubName === undefined) ? clubName : this.state.clubName,
      affiliatedUnit: (this.state.affiliatedUnit === undefined) ? affiliatedUnit : this.state.affiliatedUnit,
      description: (this.state.description === undefined) ? description : this.state.description,
      logoUrl: (this.state.logoUrl === logoUrl) ? logoUrl : this.state.url,
    }

    console.log(body);

    fetch('http://localhost:8080/admin/club-management/' + `${id}` + '/update-info', {
            method: 'PUT',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify(body),
       },
       {withCredentials: false}
        )
          .then(() => {
              let item = {id, clubName, affiliatedUnit, description, logoUrl};
                this.setState({ clubs: item });
                console.log('item', item);
                alert('Cập nhật thành công');
          })
          .catch((e) => {
            console.log(e);
            this.setState({
              errors: this.validator.validate(this.state),
          });
          })
  };

  render() {
    const {errors} = this.state;
    const {clubs} = this.state;
    var img;
    if (this.state.url !== '') {
      img = this.state.url;
    }
    else {
      img = clubs.logoUrl;
    }
      return (
          <div>
            <Link className='addmem' to={`/clbmember/${clubs.clubId}`}><img src={BTN} className='btn'/>Quản lý thành viên</Link>
              <div className='detail-contain'>
                <div className='name-area'>
                  <input type='text' className='club-name' name='clubName' placeholder={clubs.clubName} onChange={(e) => {this.setState({[e.target.name]: e.target.value})}} required/>
                  {errors.clubName && <div className="validation1" style={{display: 'block'}}>{errors.clubName}</div>}
                </div>
                <div className='img-area'>
                  <progress value={this.state.progress} max="100" hidden={true}/>
                  <label htmlFor="files" className='img'>Tải ảnh lên</label>
                  <input id='files' type='file' className='img' onChange={this.handleChange} hidden={true} required/>
                  <button className='changeimg' onClick={this.handleUpload}></button>
                  <img src={img} name='logoUrl' value={img} onChange={(e) => {this.setState({[e.target.name]: e.target.value})}} className='club-img' alt=" "/>
                </div>
                <div className='unit-area'>
                  <h5 className='lead-text'><b>Đơn vị: </b></h5>
                  <input className='lead-name' name='affiliatedUnit' placeholder={clubs.affiliatedUnit} onChange={(e) => {this.setState({[e.target.name]: e.target.value})}} required/>
                  {errors.affiliatedUnit && <div className="validation2" style={{display: 'block'}}>{errors.affiliatedUnit}</div>}
                </div>
                <div className='desc-area'>
                  <p className='desc'><b>Mô tả: </b></p>
                  <textarea className='desc-detail' name='description' placeholder={clubs.description} onChange={(e) => {this.setState({[e.target.name]: e.target.value})}} required/>
                  {errors.description && <div className="validation3" style={{display: 'block'}}>{errors.description}</div>}
                </div>
                  <button type="submit" className="bouton-contact" onClick={() => {this.handleSubmit(clubs.clubId, clubs.clubName, clubs.affiliatedUnit, clubs.description, clubs.logoUrl)}}>Cập nhật</button>
              </div>
          </div>
      );
    }
}

export default ClubDetailFeature;