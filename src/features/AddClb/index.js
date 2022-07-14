import React, { Component } from 'react';
import { storage } from '../../firebase';
import Validator from '../../utils/validator.js';
import './style.css';

class AddClbFeature extends Component {
    constructor (props) {
        super(props);
        this.state = {
          image: null,
          url: '',
          progress: 0,
          errors: {},
          clubs: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);

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
          this.setState({
            logoUrl: url
          })
        });
      });
    };

    handleInput(e) {
      this.setState({
        [e.target.name]: e.target.value,
      })
    }

    handleSubmit(e) {
        this.setState({
          errors: this.validator.validate(this.state),
        });
        const access_token = localStorage.getItem('access_token');
        console.log('token', access_token);

        fetch('https://uteclubs.herokuapp.com/admin/club-management', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify(this.state),
       },
       {withCredentials: false}
        )
          .then((res) => {
            res.json();
            console.log(res);
            this.setState({clubs: this.state});
            console.log('body', this.state.clubs);
            this.props.history.push('/admin');
          })
          .catch((e) => {
            console.log(e);
            alert('Không thể khởi tạo');
        })
    }

    render() {
        const {errors} = this.state;
        return (
            <div>
              <div className='detail-contain'>
                <div className='name-area'>
                  <input className='club-name' placeholder='Nhập tên Câu lạc bộ' name='clubName' onChange={this.handleInput} required/>
                  {errors.clubName && <div className="validation1" style={{display: 'block'}}>{errors.clubName}</div>}
                </div>
                <div className='img-area'>
                  <progress value={this.state.progress} max="100" hidden={true}/>
                  <label for="files" className='img'>Tải ảnh lên</label>
                  <input id='files' type='file' className='img' onChange={this.handleChange} hidden={true} required/>
                  <button className='changeimg' onClick={this.handleUpload}></button>
                  <img src={this.state.url} name='logoUrl' value={this.state.logoUrl} onChange={this.handleInput} className='club-img' alt=" "/>
                </div>
                <div className='unit-area'>
                  <h5 className='lead-text'><b>Đơn vị: </b></h5>
                  <select 
                        className='lead-name'
                        value={this.state.affiliatedUnit}
                        onChange={this.handleInput}
                        name='affiliatedUnit'
                        required
                    >
                        <option value="Hội Sinh viên">Hội Sinh viên</option>
                        <option value="Khoa Công Nghệ thông tin">Khoa Công Nghệ thông tin</option>
                        <option value="Khoa Kinh tế">Khoa Kinh tế</option>
                        <option value="Khoa Điện - Điện tử">Khoa Điện - Điện tử</option>
                        <option value="Khoa Ngoại ngữ">Khoa Ngoại ngữ</option>
                    </select>
                  {errors.affiliatedUnit && <div className="validation2" style={{display: 'block'}}>{errors.affiliatedUnit}</div>}
                </div>
                <div className='desc-area'>
                  <p className='desc'><b>Mô tả: </b></p>
                  <textarea className='desc-detail' name='description' onChange={this.handleInput} required/>
                  {errors.description && <div className="validation3" style={{display: 'block'}}>{errors.description}</div>}
                </div>
                  <button type="submit" className="bouton-contact" onClick={this.handleSubmit}>Khởi tạo</button>
              </div>
          </div>
        );
}
}

export default AddClbFeature;