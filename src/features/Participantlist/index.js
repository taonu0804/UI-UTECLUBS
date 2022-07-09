import React from 'react';
import './style.css';

ParticipantListFeature.propTypes = {
    
};

function ParticipantListFeature(props) {
         return (
            <div className='club-form'>
            <h3 className='tablepart-name'><b>DANH SÁCH NGƯỜI THAM GIA</b></h3>
           <table className='table'>
               <thead>
                  <tr>
                     <th>MSSV</th>
                     <th>Họ và tên</th>
                     <th>Giới tính</th>
                     <th>Ngành</th>
                     <th>Khoa</th>
                     <th>Email</th>
                     <th>Diểm danh</th>
                  </tr>
               </thead>
               <tbody>
                <tr>
                    <td>18110298</td>
                    <td>Tạ Thị Mai Hương</td>
                    <td>Nữ</td>
                    <td>Công nghệ thông tin</td>
                    <td>Công nghệ thông tin</td>
                    <td>18110298@tudent.hcmute.edu.vn</td>
                    <td><input
                        type="checkbox"
                        id={'custom-checkbox'}
                        name=''
                        value=''
                        className='checkbox'
                        />
                    </td>
                    </tr>

                    <tr>
                    <td>18110344</td>
                    <td>Võ Trần Minh Quân</td>
                    <td>Nam</td>
                    <td>Công nghệ thông tin</td>
                    <td>Công nghệ thông tin</td>
                    <td>18110344@tudent.hcmute.edu.vn</td>
                    <td><input
                        type="checkbox"
                        id={'custom-checkbox'}
                        name=''
                        value=''
                        className='checkbox'
                        />
                    </td>
                    </tr>

                    <tr>
                    <td>18110456</td>
                    <td>Nguyễn Văn A</td>
                    <td>Nam</td>
                    <td>Công nghệ thông tin</td>
                    <td>Công nghệ thông tin</td>
                    <td>18110456@tudent.hcmute.edu.vn</td>
                    <td><input
                        type="checkbox"
                        id={'custom-checkbox'}
                        name=''
                        value=''
                        className='checkbox'
                        />
                    </td>
                    </tr>

                    <tr>
                    <td>18110567</td>
                    <td>Trần Thị B</td>
                    <td>Nữ</td>
                    <td>Công nghệ thông tin</td>
                    <td>Công nghệ thông tin</td>
                    <td>18110567@tudent.hcmute.edu.vn</td>
                    <td><input
                        type="checkbox"
                        id={'custom-checkbox'}
                        name=''
                        value=''
                        className='checkbox'
                        />
                    </td>
                    </tr>

                    <tr>
                    <td>18110788</td>
                    <td>Trịnh Thị C</td>
                    <td>Nữ</td>
                    <td>Công nghệ thông tin</td>
                    <td>Công nghệ thông tin</td>
                    <td>18110788@tudent.hcmute.edu.vn</td>
                    <td><input
                        type="checkbox"
                        id={'custom-checkbox'}
                        name=''
                        value=''
                        className='checkbox'
                        />
                    </td>
                    </tr>
               </tbody>
           </table>

         </div>
    );
}

export default ParticipantListFeature;