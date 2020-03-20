import * as React from 'react';
import * as utf8 from 'utf8';

class Activity extends React.Component {
    state = {
        'log': []
    }

    componentDidMount() {
        fetch("https://0.0.0.0:5000/server/log")
        .then((res) => res.text())
        .then((data) => {
            console.log(utf8.encode(data));
            this.setState(() => ({'log': utf8.encode(data)}));
        });
    }

    render(){
        return (
            <div>
                <p>{this.state.log}</p>
            </div>
        );
    }
}

export default Activity;
