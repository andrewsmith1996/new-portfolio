import	React from 'react';
import  ReactDOM from 'react-dom';

import  Phone from './Phone.js';
import  Blog from './Blog.js';

class PhoneComponent extends React.Component{
	render(){
		return(
			<Phone heading="Hello!"/>
		);
	}
}

class BlogComponent extends React.Component{
	render(){
		return(
			<Blog/>
		);
	}
}

ReactDOM.render(<Phone />, document.getElementById('phone-wrapper'));
ReactDOM.render(<Blog />, document.getElementById('blog-wrapper'));