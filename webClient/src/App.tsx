import * as React from 'react';
import Logging from './Components/Logging.tsx';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Activity from './Components/Activity.tsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <ReactTabs />
      </div>
    );
  }
}

const ReactTabs = () => {
  return(
      <div>
        <Tabs defaultActiveKey="logs" id="uncontrolled-tab-example">
            <Tab eventKey="logs" title="Logging">
              <Logging />
            </Tab>
            <Tab eventKey="applications" title="Activity">
              <Activity />
            </Tab>
        </Tabs>
      </div>
    );
}


export default App;
