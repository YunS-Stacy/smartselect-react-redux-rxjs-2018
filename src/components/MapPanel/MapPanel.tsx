import * as React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';

import { Button, Spin } from 'antd';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';

import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';

import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import Slider from 'material-ui/Slider';

import AvLibraryBooks from 'material-ui/svg-icons/av/library-books';
import CommunicationChat from 'material-ui/svg-icons/communication/chat';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import { RootState } from '../../types';

import PanelBtns from './PanelBtns';
import { Feature } from 'geojson';
import { GeoJSONGeometry } from 'mapbox-gl';

// import SearchInput from '../components/SearchInput';
// import Joyride from 'react-joyride';

const paperStyle = {
  position: 'absolute',
  width: '25vw',
  margin: '0',
  padding: '2em',
  backgroundColor: 'rgba(255,255,255,0.8)',
};

interface Props {
  step: RootState['map']['step'];
  loaded: boolean;
  geometry: RootState['map']['geometry'];
  height: number;
  handleMinusStep: () => void;
  handleAddStep: () => void;
  handleToggleApp: () => void;
  handleSetGeometryHeight: (payload: number) => void;
}

const MapPanel = ({
  loaded, step, geometry, height,
  handleAddStep, handleMinusStep, handleToggleApp, handleSetGeometryHeight,
}: Props) => (
  <Spin
    spinning={!loaded}
    wrapperClassName="spinner map-panel"
  >
  <Paper
    style={{
      // position: 'absolute',
      width: '25vw',
      margin: '0',
      padding: '2em',
      backgroundColor: 'rgba(255,255,255,0.8)',
    }}
    zDepth={3}
    className="leftPanel"
  >

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
          {/* <SearchInput dispatch={this.props.dispatch} /> */}
          {/* {this.renderStepActions(1)} */}
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
                  &ensp;Perimeter:
                      <strong style={{ fontSize: '1.2em' }}>
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
          {/* // <div
          //   style={{
          //     display: 'inline-flex',
          //     justifyContent: 'space-around',
          //     float: 'right',
          //     flexDirection: 'column',
          //     width: '40%',
          //   }}
          // >
          //   <div style={{ width: '0.5em' }} />
          // </div> */}
          <PanelBtns hasGeometry={geometry.find(item => item.geometry.type === 'Polygon') && true} loaded={loaded}/>
        </StepContent>
      </Step>
      <Step>
        <StepLabel>
          Build
								</StepLabel>
        <StepContent>
          <div
            style={{
              display: 'inline-flex',
            }}
          >
            <Slider
              // className="heightSlider"
              axis="y"
              min={0}
              max={1000}
              step={1}
              defaultValue={0}
              value={height}
              onChange={(e, val) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(val);
                handleSetGeometryHeight(val);
              }}
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
        <StepLabel>
          Decide
								</StepLabel>
        <StepContent>
          <p>
            Decision time!
          </p>
          <PanelBtns loaded={loaded}/>
        </StepContent>
      </Step>
    </Stepper>

  </Paper>
  </Spin>

);
export default MapPanel;
