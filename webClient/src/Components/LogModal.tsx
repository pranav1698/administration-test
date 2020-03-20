import * as React from 'react';
import * as Modal from 'react-modal';


let funct = undefined;

const onFormSubmit = (e) => {
    e.preventDefault();
    const level = e.target.elements.log.value.trim();
    funct(level);
    
}

const LogModal = (props) => {
    funct = props.changeLogLevel;
    return (
        <Modal
                isOpen={!!props.selectedPlugin}
                contentLabel='Change Log Level'
            >
            <div>
                <h2>Change Log Level</h2>
                {props.error && <p>Note: {props.error}</p>}
                <form onSubmit={onFormSubmit}>
                    <input type="text" name="log"/>                        <button style={{marginLeft: 50}}>Submit</button>
                </form>
            </div>
        </Modal>
    );
}
            


export default LogModal;