import React from 'react';



class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signUpEmail: '',
            signUpPassword: '',
            signUpName: ''
        }
    }

    onEmailChange = (event) => {
        console.log(event.target.value);
        this.setState({signUpEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        console.log(event.target.value);
        this.setState({signUpPassword: event.target.value});
    }

    onNameChange = (event) => {
        console.log(event.target.value);
        this.setState({signUpName: event.target.value});
    }

    onSubmitRegister = () => {
        console.log(this.state);
        fetch('http://localhost:3000/register', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						email: this.state.signUpEmail,
                        password: this.state.signUpPassword,
                        name: this.state.signUpName
					})
				})
				.then(res => res.json())
				.then(user => {
					if (user){
                        this.props.loadUser(user);
                        this.props.changeRoute('home');
                        this.props.showAppState();
					}
                })   
        this.props.changeRoute('home')
    }
    render(){
        const { changeRoute } = this.props;
        return(
            <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name"
                                onChange={this.onNameChange} />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={this.onEmailChange} />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={this.onPasswordChange} />
                        </div>
                    </fieldset>
                    <div className="">
                        <input 
                            onClick={this.onSubmitRegister}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register" 
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => changeRoute('signin')} href="#0" className="f6 link dim black db pointer">Back to Sign In</p>
                    </div>
                </div>
            </main>
        </article>
        )
    }
 
}

export default Register;