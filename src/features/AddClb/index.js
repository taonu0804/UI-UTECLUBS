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

        
      const beLink = 'https://uteclubs.herokuapp.com/';
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
              <div className='detailcontain'>
                      <div className='nameare1'>
                        <div className='ename-area1'>
                            <p className='enametitle1'><b>Tên câu lạc bộ</b></p>
                            <input type='text' className='ename' name='clubName' placeholder='Nhập tên câu lạc bộ' onChange={this.handleInput} required/>
                            {errors.clubName && <div className="validation1" style={{display: 'block'}}>{errors.clubName}</div>}
                        </div>

                        <p className='begtimetitle'><b>Đơn vị</b></p>
                        <div className="begtime-area">
                            <select
                                className='begdatetext'
                                onChange={this.handleInput}
                                name='affiliatedUnit'
                                value={this.state.affiliatedUnit}
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

                            <button type="submit" className="e-button" onClick={this.handleSubmit}><b>Khởi tạo</b></button>
                            </div>

                            <div className='avaarea1'>
                                <div className='eimgarea'>
                                    <progress value={this.state.progress} max="100" hidden={true}/>
                                    <label htmlFor="files" className='img'>Tải ảnh lên</label>
                                    <input id='files' type='file' className='img' onChange={this.handleChange} hidden={true} required/>
                                    <button className='img' onClick={this.handleUpload}></button>
                                    <img src={this.state.url} name='logoUrl' value={this.state.logoUrl} onChange={this.handleInput} className='eve-img' alt=" "/>
                                </div>

                                <div className='eunit-area'>
                                    <div className='edesc-area'>
                                        <p className='edesc1'><b>Mô tả: </b></p>
                                        <textarea className='edescdetail' name='description' placeholder='Nhập mô tả' onChange={this.handleInput} required/>
                                        {errors.description && <div className="validation3" style={{display: 'block'}}>{errors.description}</div>}
                                    </div>
                                </div>
                    </div>
              </div>
          </div>
        );
}
}

export default AddClbFeature;