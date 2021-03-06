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
      showUnit: true,
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

    fetch('https://uteclubs.herokuapp.com/club-management/' + `${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
   },
   {withCredentials: false})
    .then((response) => response.json())
    .then(item => {
        this.setState({ clubs: item });
        this.setState({showUnit: true});
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
      logoUrl: (this.state.logoUrl === undefined) ? logoUrl : this.state.url,
    }

    console.log(body);
    if (window.confirm('B???n ch???c ch???c mu???n c???p nh???t?') == true) {

    fetch('https://uteclubs.herokuapp.com/admin/club-management/' + `${id}` + '/update-info', {
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
                this.setState({showUnit: true});
                console.log('item', item);
                alert('C???p nh???t th??nh c??ng');
          })
          .catch((e) => {
            console.log(e);
            this.setState({
              errors: this.validator.validate(this.state),
          });
          })
        }
        else {
          return;
        }
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
          <div className='event-detail'>
            <Link className='addmem' to={`/clbmember/${clubs.clubId}`}><img src={BTN} className='btn'/>Qu???n l?? th??nh vi??n</Link>
              <div className='detailcontain'>
                      <div className='nameare1'>
                        <div className='ename-area1'>
                            <p className='enametitle1'><b>T??n c??u l???c b???</b></p>
                            <input type='text' className='ename' name='clubName' placeholder={clubs.clubName} onChange={(e) => {this.setState({[e.target.name]: e.target.value})}} required/>
                            {errors.clubName && <div className="validation1" style={{display: 'block'}}>{errors.clubName}</div>}
                        </div>

                        <p className='begtimetitle'><b>????n v??? tr???c thu???c</b></p>
                        <div className="begtime-area">
                            <p className='begdateopt' style={{display: this.state.showUnit ? 'block' : 'none'}}>{clubs.affiliatedUnit}</p>
                            <select
                                className='begdatetext'
                                onChange={(e) => {this.setState({[e.target.name]: e.target.value}); this.setState({showUnit: false})}}
                                name='affiliatedUnit'
                                value={this.state.affiliatedUnit}
                                required
                            >
                                <option value="H???i Sinh vi??n">H???i Sinh vi??n</option>
                                <option value="Khoa C??ng Ngh??? th??ng tin">Khoa C??ng Ngh??? th??ng tin</option>
                                <option value="Khoa Kinh t???">Khoa Kinh t???</option>
                                <option value="Khoa ??i???n - ??i???n t???">Khoa ??i???n - ??i???n t???</option>
                                <option value="Khoa Ngo???i ng???">Khoa Ngo???i ng???</option>
                            </select>
                          {errors.affiliatedUnit && <div className="validation2" style={{display: 'block'}}>{errors.affiliatedUnit}</div>}
                        </div>

                            <button type="submit" className="e-button" onClick={() => {this.handleSubmit(clubs.clubId, clubs.clubName, clubs.affiliatedUnit, clubs.description, clubs.logoUrl)}}><b>C???p nh???t</b></button>
                            </div>

                            <div className='avaarea1'>
                                <div className='eimgarea'>
                                    <progress value={this.state.progress} max="100" hidden={true}/>
                                    <label htmlFor="files" className='img'>T???i ???nh l??n</label>
                                    <input id='files' type='file' className='img' onChange={this.handleChange} hidden={true} required/>
                                    <button className='img' onClick={this.handleUpload}></button>
                                    <img src={img} name='logoUrl' value={img} onChange={(e) => {this.setState({[e.target.name]: e.target.value})}} className='eve-img' alt=" "/>
                                </div>

                                <div className='eunit-area'>
                                    <div className='edesc-area'>
                                        <p className='edesc1'><b>M?? t???: </b></p>
                                        <textarea className='edescdetail' name='description' placeholder={clubs.description} onChange={(e) => {this.setState({[e.target.name]: e.target.value})}} required/>
                                        {errors.description && <div className="validation3" style={{display: 'block'}}>{errors.description}</div>}
                                    </div>
                                </div>
                    </div>
              </div>
          </div>
      );
    }
}

export default ClubDetailFeature;