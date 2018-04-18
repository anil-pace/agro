import React, { Component } from 'react';

/* Import Components */
import CheckBox from '../components/CheckBox';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import Button from '../components/Button';

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        name: '',
        age: '',
        gender: '',
        address: '',
        hobbie: '',
        email: ''
      },
      genderOptions: [],
      hobbieOptions: []
    };
    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleAge = this.handleAge.bind(this);
    this.handleFullName = this.handleFullName.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
  }

  //   User the below PATCH API for partial save
  // a. form1 - http://www.mocky.io/v2/5d02885a3100005a00ab3048
  // b. form2 - http://www.mocky.io/v2/5d0288823100005a00ab3049
  // c. form3 - http://www.mocky.io/v2/5d0288b43100003400ab304a

  /* This lifecycle hook gets executed when the component mounts */

  handleGenderChange = e => {
    let value = e.target.value;
    this.setState(
      prevState => ({ newUser: { ...prevState.newUser, gender: value } }),
      () => console.log(this.state.newUser)
    );
  };

  componentWillMount() {
    fetch('http://www.mocky.io/v2/5d009a333200007700f9d5cb', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(response => {
      response.json().then(data => {
        console.log('Successful' + JSON.stringify(data.responseData));
        this.setState({
          genderOptions: data.responseData
        });
      });
    });
    fetch('http://www.mocky.io/v2/5d0099b53200000f00f9d5c5', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(response => {
      response.json().then(data => {
        console.log('Successful' + JSON.stringify(data.responseData));
        this.setState({
          hobbieOptions: data.responseData
        });
      });
    });
  }

  saveForm1 = () => {
    let userData = {};
    userData.name = this.state.newUser.name;
    userData.age = this.state.newUser.age;
    fetch('http://www.mocky.io/v2/5d02885a3100005a00ab3048', {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      response.json().then(data => {
        console.log('Successful' + data);
      });
    });
  };
  clearForm1 = e => {
    this.setState(
      prevState => ({ newUser: { ...prevState.newUser, name: '', age: '' } }),
      () => console.log(this.state.newUser)
    );
  };

  saveForm2 = () => {
    let userData = {};
    userData.address = this.state.newUser.address;
    userData.gender = this.state.newUser.gender;
    fetch('http://www.mocky.io/v2/5d0288823100005a00ab3049', {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      response.json().then(data => {
        console.log('Successful' + data);
      });
    });
  };
  clearForm2 = e => {
    this.setState(
      prevState => ({
        newUser: { ...prevState.newUser, address: '', gender: '' }
      }),
      () => console.log(this.state.newUser)
    );
  };

  saveForm3 = () => {
    let userData = {};
    userData.email = this.state.newUser.email;
    fetch('http://www.mocky.io/v2/5d0288b43100003400ab304a', {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      response.json().then(data => {
        console.log('Successful form 3' + data);
      });
    });
  };
  clearForm3 = e => {
    this.setState(
      prevState => ({
        newUser: { ...prevState.newUser, email: '', hobbie: '' }
      }),
      () => console.log(this.state.newUser)
    );
  };

  handleFullName(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({ newUser: { ...prevState.newUser, name: value } }),
      () => console.log(this.state.newUser)
    );
  }

  handleAge(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({ newUser: { ...prevState.newUser, age: value } }),
      () => console.log(this.state.newUser)
    );
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      prevState => ({ newUser: { ...prevState.newUser, [name]: value } }),
      () => console.log(this.state.newUser)
    );
  }

  handleTextArea(e) {
    console.log('Inside handleTextArea');
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          address: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }

  handleCheckBox(e) {
    const newSelection = e.target.value;
    let newSelectionArray;

    if (this.state.newUser.skills.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.newUser.skills.filter(
        s => s !== newSelection
      );
    } else {
      newSelectionArray = [...this.state.newUser.skills, newSelection];
    }

    this.setState(prevState => ({
      newUser: { ...prevState.newUser, skills: newSelectionArray }
    }));
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newUser;

    // if (
    //   this.state.newUser.name === '' ||
    //   this.state.newUser.email === '' ||
    //   this.state.newUser.age === '' ||
    //   this.state.newUser.gender === '' ||
    //   this.state.newUser.hobbie === '' ||
    //   this.state.newUser.address === ''
    // ) {
    //   alert('all fields are mandatory');
    //   return false;
    // } else {
    //   fetch('http://www.mocky.io/v2/5d0288e43100004f4aab304b', {
    //     method: 'POST',
    //     body: JSON.stringify(userData),
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json'
    //     }
    //   }).then(response => {
    //     response.json().then(data => {
    //       console.log('Successful' + data);
    //     });
    //   });
    // }
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      newUser: {
        name: '',
        age: '',
        gender: '',
        address: '',
        hobbie: '',
        email: ''
      }
    });
  }

  render() {
    return (
      <form className='container' onSubmit={this.handleFormSubmit}>
        <div>
          <div style={flex1}>
            <div style={flex2}>
              <h3> Form 1</h3>{' '}
              <div>
                <span style={{ marginRight: '1em' }} onClick={this.saveForm1}>
                  &#9989;
                </span>
                <span onClick={this.clearForm1}>&#10060;</span>
              </div>
            </div>

            <div style={flex2}>
              <Input
                inputType={'text'}
                title={'Full Name'}
                name={'name'}
                value={this.state.newUser.name}
                placeholder={'Enter your name'}
                handleChange={this.handleInput}
                required
              />
              <Input
                inputType={'number'}
                title={'Select Age'}
                name={'age'}
                value={this.state.newUser.age}
                placeholder={'Enter your age'}
                handleChange={this.handleAge}
                max='150'
                required
              />
            </div>
          </div>
        </div>
        <div>
          <div style={flex1}>
            <div style={flex2}>
              <h3> Form 2</h3>{' '}
              <div>
                <span style={{ marginRight: '1em' }} onClick={this.saveForm2}>
                  &#9989;
                </span>
                <span onClick={this.clearForm2}>&#10060;</span>
              </div>
            </div>

            <div style={flex2}>
              <TextArea
                title={'Address'}
                rows={3}
                value={this.state.newUser.address}
                name={'currentPetInfo'}
                handleChange={this.handleTextArea}
                placeholder={'Enter your address'}
              />
              <div className='form-group form-inline'>
                <label htmlFor='test'>Select Gender</label>
                <ul style={ulStyle}>
                  {this.state.genderOptions.map((level, index) => (
                    <li>
                      {level.label}
                      <input
                        style={{
                          margin: '4px 50px 0'
                        }}
                        type='radio'
                        id='test'
                        name='gender_name'
                        value={level.label}
                        checked={this.state.newUser.gender === level.label}
                        onChange={this.handleGenderChange}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* form 3 */}
        <div>
          <div style={flex1}>
            <div style={flex2}>
              <h3> Form 3</h3>{' '}
              <div>
                <span style={{ marginRight: '1em' }} onClick={this.saveForm13}>
                  &#9989;
                </span>
                <span onClick={this.clearForm3}>&#10060;</span>
              </div>
            </div>

            <div style={flex2}>
              <Select
                title={'Select your hobbies'}
                name={'hobbie'}
                options={this.state.hobbieOptions}
                value={this.state.newUser.hobbie}
                placeholder={'Select Hobbie'}
                handleChange={this.handleInput}
              />

              <Input
                inputType={'email'}
                title={'Email Id'}
                name={'email'}
                value={this.state.newUser.email}
                placeholder={'Enter your email id'}
                handleChange={this.handleInput}
                required
              />
            </div>
          </div>
        </div>

        <div style={{ float: 'right' }}>
          <Button
            action={this.handleFormSubmit}
            type={'primary'}
            title={'Submit'}
            style={buttonStyle}
          />{' '}
          {/*Submit */}
          <Button
            action={this.handleClearForm}
            type={'secondary'}
            title={'Cancel'}
            style={buttonStyle}
          />{' '}
          {/* Clear the form */}
        </div>
      </form>
    );
  }
}

const buttonStyle = {
  margin: '10px 10px 10px 10px'
};
const flex1 = {
  display: 'flex',
  flexFlow: 'column',
  border: '1px solid grey'
};
const flex2 = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};
const ulStyle = {
  listStyleType: 'none',
  margin: 0,
  padding: 0
};

export default FormContainer;
