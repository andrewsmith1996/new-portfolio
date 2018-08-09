import React from 'react';
import ReactDOM from 'react-dom';

export default class Phone extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            commits:0,
            githubRepos:0,
            lastUpdated:0,
            issues:0
        };
    }

    componentDidMount(){

        // Get initial values
        this.updateGitHub();
        
        // Set the timer for updating the GitHub stats, every 10 seconds
        this.githubStatsUpdate = setInterval(
            () => this.updateGitHub(),
            60000
        );
    }

    componentWillUnmount() {
        // Clear the interval when the component unmounts
        clearInterval(this.githubStatsUpdate);
    }

    updateGitHub(){

        const url = 'https://api.github.com';

        // Update the repo count
        fetch(url + '/users/andrewsmith1996')
        .then(response => response.json())
        .then(data => {
            this.setState((prevState, props) => ({
                githubRepos: data.public_repos
            }));
        })
        .catch(error => console.error(error));
        
        // Update the commit details
        fetch(url + '/repos/andrewsmith1996/new-portfolio/commits')
       
        .then(response => response.json())
        .then(data => {

            // Get the date of the most recent commit
            let date = data[0].commit.author.date.substring(0, 10);

            let year = date.substring(0, 4);
            let month = date.substring(5, 7);
            let day = date.substring(8, 10);

            // Format the date
            let formattedDate = month + '/' + day + '/' + year;

            // Get the dates
            var lastUpdated = new Date(formattedDate);
            var today = new Date();

            // Take away the dates
            var timeDiff = Math.abs(today.getTime() - lastUpdated.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

            let lastUpdatedText;
            if(diffDays == 1){
                lastUpdatedText = 'Today';
            } else if(diffDays == 2){
                lastUpdatedText = 'Yesterday';
            } else{
                lastUpdatedText = diffDays + ' days ago';
            }
            // Set the new state
            this.setState((prevState, props) => ({
                commits: data.length,
                lastUpdated:lastUpdatedText
            }));

        }).catch(error => console.error(error));

           // Update the issue count
           fetch(url + '/repos/andrewsmith1996/new-portfolio')
           .then(response => response.json())
           .then(data => {
               this.setState((prevState, props) => ({
                    issues:data.open_issues_count
               }));
           })
           .catch(error => console.error(error));
    }

    render(){
        return(
            <div id="phone">
                <div className="phone-inside">
                    <img className="portrait" src="/images/assets/andrew.jpg" alt="Portrait of Andrew Smith"/>
                    <h4>{this.state.text} <img className="emoji" src="/images/assets/waving-hand-emoji.png" alt="Waving hand emoji"/></h4>
                  
                    <p><strong>Live statistics</strong></p>
                    
                    <div className="update-clock">
                        <div className="top-marker"></div>
                        <div className="right-marker"></div>
                        <div className="bottom-marker"></div>
                        <div className="left-marker"></div>
                        <div className="ticker"></div>
                    </div>
          
                    <p className="updated">Repo last updated<span>{this.state.lastUpdated}</span></p>
                    <p className="statistic commits">Commits<span>{this.state.commits}</span></p>
                    <p className="statistic issues">Issues<span>{this.state.issues}</span></p>
                    <p className="statistic repos">Repos<span>{this.state.githubRepos}</span></p>
                </div>
            </div>
        );
    }
}


