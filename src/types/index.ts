import * as mapbox from 'mapbox-gl';
import { Feature, GeometryObject } from 'geojson';
interface Stats {
  show: boolean;
  spaceUseList: string[];
  maxFlrNum: number;
  areaByUsage: {
    spaceUse: string;
    area: number;
    floors: number;
    units: number;
  }[];
  totalArea: number;
}

export interface RootState {
  app: boolean;
  slider: {
    data: any[];
    range: number[];
    fetched: boolean;
  };
  map: {
    draw: boolean;
    step: number;
    mode: 'intro' | 'query' | 'measure' | 'build' | 'decide' | null;
    layers: {
      footprint: 'visible' | 'none' | null;
      aptParcel: 'visible' | 'none' | null;
      vacantParcel: 'visible' | 'none' | null;
      blueprint: 'visible' | 'none' | null;
    }; // 'footprint', 'visible'
    loaded: boolean;
    instance: any;
    bounds: number[][];
    center: number[];
    pitch: number;
    zoom: number;
    bearing: number;
    style: string;
    viz: {
      foot: string;
      blueprint: string;
      parcel: string;
      vacant: string;
    };
    geometry: {
      type: string;
      properties: {
        area?: number;
        length?: number;
        height?: number;
      };
      [key: string]: any;
    }[];
    height: number;
    comps: {
      lines: any[];
      pts: any[];
    };
  };
}
