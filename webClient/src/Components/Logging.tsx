import * as React from 'react';
import LogModal from './LogModal.tsx';



class Logging extends React.Component {
    constructor(props) {
        super(props)
        this.changeLogLevel = this.changeLogLevel.bind(this);
        this.openModal = this.openModal.bind(this);
    }
    state = {
        'plugins': [],
        'selectedPlugin': undefined,
        'error': ''
    } 

    changeLogLevel(level){
        let plugin = this.state.selectedPlugin;
        let url = "https://0.0.0.0:5000/server/logLevels/name/" + plugin + "/level/" + level;
        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
        .then((data) => {
            if(data.error == undefined){
                this.setState(() => {
                    return {
                        'plugins': data,
                        'selectedPlugin': undefined,
                        'error': ''
                    }
                });
                fetch("https://0.0.0.0:5000/server/reload")
                .then(res => res.json())
                .then((data) => {
                    console.log(data);
                });
            } else{
                this.setState(() => ({'error': data.error}));
            }
        });
    }

    openModal(plugin) {
        this.setState(() => ({ 'selectedPlugin' : plugin }))
    }

    componentDidMount() {
        fetch("https://0.0.0.0:5000/server/logLevels")
        .then(res => res.json())
        .then((data) => {
            this.setState(() => ({'plugins': data}));
        });
    }

    render() {
        const gotPlugins = JSON.parse(JSON.stringify(this.state.plugins));
        return (
        <div>
            <h1>Installed Plugins</h1>
            <Plugins plugins={gotPlugins} openModal={this.openModal}/>
            <LogModal selectedPlugin={this.state.selectedPlugin} changeLogLevel={this.changeLogLevel} error={this.state.error}/>
        </div>
        )
    } 
}

const Plugins = (props) => {
    const plugins = props.plugins;
    let buttonStyle= {
        marginLeft: 50
    };

    return (
        <div>
            <ol>
                {Object.keys(plugins).map((plugin) => {
                    return (<div>
                                <li>{plugin}: {plugins[plugin]} 
                                    <button onClick={() => props.openModal(plugin)} style={buttonStyle}>Change</button>
                                </li>                       
                                <p></p>
                            </div>
                        )
               })}
            </ol>
        </div>
    );
}

export default Logging;
