import React from 'react';

class Logout extends React.Component {
    logout(){
        fetch('http://localhost:3001/logout')
            .then(function(result){
                return result.json();
            })
            .then(function(result){
                alert(result.message);
                window.location = '/login';
            });
    }

    render(){
        return (
            <span onClick={this.logout}>Logout</span>
        );
    }
}

export default Logout;