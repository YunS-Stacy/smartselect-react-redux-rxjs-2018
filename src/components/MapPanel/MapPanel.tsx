import * as React from 'react';

import { Spin } from 'antd';
import Paper from 'material-ui/Paper';

import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';

import FlatButton from 'material-ui/FlatButton';
import Slider from 'material-ui/Slider';

import { RootState } from '../../types';
import PanelBtns from './PanelBtns';

// import SearchInput from '../components/SearchInput';
// import Joyride from 'react-joyride';

interface Props {
  step: RootState['map']['step'];
  loaded: boolean;
  geometry: RootState['map']['geometry'];
  height: number;
  range?: number[];
  handleMinusStep: () => void;
  handleAddStep: () => void;
  handleToggleApp: () => void;
  handleSetGeometryHeight: (payload: number) => void;
}

const MapPanel = ({
  loaded, step, geometry, height, range,
  handleAddStep, handleMinusStep, handleToggleApp, handleSetGeometryHeight,
}: Props) => (
  <Spin
    spinning={!loaded}
    wrapperClassName="spinner map-panel"
  >
    <Paper
      style={{
        width: '30rem',
        margin: '0',
        padding: '2rem',
        backgroundColor: 'rgba(255,255,255,0.8)',
      }}
      zDepth={3}
      className="left-panel"
    >
      <FlatButton
        label="Close Application"
        fullWidth={true}
        onClick={() => handleToggleApp()}
      />
      <Stepper
        style={{ width: '100%' }}
        activeStep={step}
        linear={true}
        orientation="vertical"
      >
        <Step>
          <StepLabel>Intro</StepLabel>
          <StepContent>
            {/* <Button style={{display: 'inline-block', float:'right'}}>Replay</Button> */}
            <p style={{ whiteSpace: 'pre-line' }}>
              {`Welcome!

                        Click "Next" to find your next INVESTMENT!`}
            </p>
            <PanelBtns loaded={loaded}/>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Find</StepLabel>
          <StepContent>
            <p>Don't forget to use the slider below to define a price range.</p>
            {range && <>
            <span
              style={{
                fontSize: '1.15em',
                fontWeight: 500,
                color: '#2c9ab7',
              }}
            >
              Current Range
            </span>
            <span style={{ marginLeft: '1rem' }}>
              <strong>
                {`$${Number(range[0].toFixed(2)).toLocaleString('en')} -
                $${Number(range[1].toFixed(2)).toLocaleString('en')}`}
              </strong>
            </span>
            </>}
            <PanelBtns loaded={loaded}/>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            Measure
                  </StepLabel>
          <StepContent>
            <div>
                Draw and measure your footprint.
                        <br />
                {/* <Button
                // className="calculateBtn"
                // onClick={this.handleCalculate}
                >
                  CALCULATE
                </Button> */}
                <br />
                <em>
                  *If you don't like it, clean and draw another one!
                </em>
                <br />
                {geometry.find(item => item.geometry.type === 'Polygon') && (
                geometry.filter(item => item.geometry.type === 'Polygon').map(each =>
                  <div key={each.id}>
                    <span
                      style={{
                        fontSize: '1.15em',
                        fontWeight: 500,
                        color: '#2c9ab7',
                      }}
                    >
                      Polygon
                    </span>
                    <br />
                    &ensp;Perimeter: <strong style={{ fontSize: '1.2em' }}>
                      {each.properties.length.toFixed(2)}</strong> feet
                    <br />
                    &ensp;Area: <strong style={{ fontSize: '1.2em' }}>
                      {each.properties.area.toFixed(2)}</strong> sqft
                    <br />
                  </div>,
                ))}
                {geometry.find(item => item.geometry.type === 'LineString') && (
                  geometry.filter(item => item.geometry.type === 'LineString').map(each =>
                    <div key={each.id}>
                    <span
                      style={{
                        fontSize: '1.15em',
                        fontWeight: 500,
                        color: '#2c9ab7',
                      }}
                    >
                      Line
                    </span>
                    <br />
                    &ensp;Length:
                        <strong style={{ fontSize: '1.2em' }}>
                      {each.properties.length.toFixed(2)}</strong> feet
                        <br />
                  </div>,
                ))}
            </div>
            <PanelBtns hasGeometry={geometry.find(item => item.geometry.type === 'Polygon') && true} loaded={loaded}/>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Build</StepLabel>
          <StepContent>
            <div
              style={{
                display: 'inline-flex',
              }}
            >
              <Slider
                axis="y"
                min={0}
                max={1000}
                step={1}
                defaultValue={0}
                value={height}
                onChange={(e, val) => handleSetGeometryHeight(val)}
                style={{
                  position: 'absolute',
                  height: '8em',
                }}
                sliderStyle={{
                  position: 'absolute',
                  height: '6em',
                  paddingBottom: 0,
                  top: '1em',
                  left: '1em',
                }}
              />
              <span style={{ fontSize: '0.8em', height: '10em', width: '6em' }}>(Unit: Foot)</span>
              <div
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  float: 'right',
                  textAlign: 'center',
                }}
              >
                <em>Use the slider to set the height</em><br /><br />
                Your building will be
                <br />
                <span
                  style={{
                    fontSize: '1.5em',
                    fontWeight: 600,
                    color: '#2c9ab7',
                    marginRight: '.25rem',
                  }}
                >
                  {height}
                </span>
                feet!
              </div>
              <br />
            </div>
            <PanelBtns loaded={loaded}/>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Decide</StepLabel>
          <StepContent>
            <p>Decision time!</p>
            <PanelBtns loaded={loaded}/>
          </StepContent>
        </Step>
      </Stepper>
    </Paper>
  </Spin>
);
export default MapPanel;
