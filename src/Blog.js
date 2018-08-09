import React from 'react';
import ReactDOM from 'react-dom';

export default class Blog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            postDate:'',
            title:'',
            url:'',
            content:'',
            intro:'',
            imageUrl:''
        }
    }

    componentDidMount(){
        this.updateBlog();
    }

    updateBlog(){
        fetch('https://public-api.wordpress.com/rest/v1.1/sites/117679029/posts/')
        .then(response => response.json())
        .then(data => {
            let date = data.posts[0].date.substring(0, 10);

            let year = date.substring(0, 4);
            let month = date.substring(5, 7);
            let day = date.substring(8, 10);

            let formattedDate = day + '/' + month + '/' + year;
           
            this.setState((prevState, props) => ({
                postDate: formattedDate,
                title: data.posts[0].title.replace(/<\/?[^>]+>/gi, '').replace(/&amp;/g, '&'),
                url:data.posts[0].URL,
                content:data.posts[0].content,
                intro:data.posts[0].excerpt.replace(/<\/?[^>]+>/gi, '').replace(/&amp;/g, '&').replace('[&hellip;]', '...'),
                imageUrl:data.posts[0].post_thumbnail.url
            }));
        }).catch(error => console.error(error))
    }

    
    render(){
        return(
            <div>
                <h4><strong><a href={this.state.url}>{this.state.title}</a></strong></h4>
                <span>Posted on {this.state.postDate}</span>
                <p>{this.state.intro}</p>
                <a href={this.state.URL} target="_blank">read more</a>
            </div>
        );
    }
}


