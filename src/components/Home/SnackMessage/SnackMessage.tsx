import * as React from 'react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

interface Props {
  message?: string;
}

interface State {
  open: boolean;
}

class SnackMessage extends React.Component<Props, State> {

  state = {
    open: false,
  };

  componentWillReceiveProps(nextProps: any) {

    this.setState({
      open: true,
    });

  }

  handleClick = () => {
    this.setState({
      open: true,
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <Snackbar
        open={this.state.open}
        message={this.props.message || ''}
        autoHideDuration={4000}
      />
    );
  }
}

export default SnackMessage;
