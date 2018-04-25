import * as React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import { RootState } from '../../../types';

interface Props {
  step: RootState['map']['step'];
  loaded: boolean;

  handleMinusStep: () => void;
  handleAddStep: () => void;
  handleToggleApp: () => void;
}
const PanelBtns = ({ step, loaded, handleAddStep, handleMinusStep, handleToggleApp }: Props) => (
  <div style={{ margin: '1em 0 0 2em', float: 'right' }}>
    {step > 0 && (
      <FlatButton
        label="Back"
        onClick={() => handleMinusStep()}
        disabled={!loaded}
      />
    )}
    {step < 4 && (
      <RaisedButton
        label="Next"
        primary={true}
        onClick={() => handleAddStep()}
        disabled={!loaded}

      />
    )}
    {step === 4 && (
      <FlatButton
        label="Close Application"
        onClick={() => handleToggleApp()}
        disabled={!loaded}

      />
  )}
  </div>);

export default PanelBtns;
