import * as React from 'react';

import RefreshIndicator from 'material-ui/RefreshIndicator';
import { Button } from 'antd';

interface Props {
  loaded: boolean;
  handleToggleApp: () => void;
}

const style = {
  container: {
    marginTop: '10vh',
  },
  refresh: {
    display: 'inline-flex',
    position: 'relative',
  },
  // button: {
  //   width: '8.8em',
  //   height: '3.2em',
  //   borderRadius: '8px',
  //   fontSize: '1.2em',
  //   backgroundColor: 'rgba(255,255,255,0.8)',
  //   color: 'rgb(82, 186, 213)',
  // },
};

const MainBtn = ({ loaded, handleToggleApp }: Props) => (
  <div className="main-btn-container">
  {loaded === true ? (
  <Button
    // style={{textShadow: '0'}}
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
      handleToggleApp();
    }}
    className="main-btn"
    // }}//use bind(this), if not using constructor
    // id='btn-get-started-loader'
    // style={style.button}
  >
    GET STARTED
  </Button>
  ) : (
    <RefreshIndicator
      size={60}
      left={-30} // width / 2
      top={-30} // height / 2
      status="loading"
    />
  )}
  </div>

);
// }
// export default class MainButton extends Component{
//   renderContent() {
//     if(this.props.mapLoaded === true){
//       return (
//         <Button
//           style={{textShadow: '0'}}
//           onClick={(e) => {e.preventDefault();
//             this.props.dispatch({
//               type: 'smartselect/changeMode',
//               mode: 'mode-intro',
//             });
//           }}//use bind(this), if not using constructor
//           id='btn-get-started-loader'
//           style={style.button}>
//           GET STARTED
//         </Button>
//       )
//     } else {
//       return (
//         <RefreshIndicator
//           size={60}
//           left={0}
//           top={6}
//           status='loading'
//           style={style.refresh}
//         />
//       )
//     }
//   }
// render() {
//     const {mapLoaded} = this.props;
//     return (
//       <div style={style.container}>
//         {this.renderContent()}
//       </div>
//     ); // return
//   }
// };

export default MainBtn;
