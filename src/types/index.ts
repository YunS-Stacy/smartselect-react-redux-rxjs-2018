import * as mapbox from 'mapbox-gl';
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
  query: boolean;
  map: {
    step: number;
    mode: 'intro' | 'query' | 'measure' | 'build' | 'decide' | null;
    layers: Map<string, string>; // 'footprint', 'visible'
    loaded: boolean;
    instance: any;
    bounds: number[][];
    center: number[];
    pitch: number;
    zoom: number;
    bearing: number;
    style: {
      url: string;
      name: string;
    };
    viz: {
      foot: string;
      blueprint: string;
      parcel: string;
      vacant: string;
    };
    geometry: {
      polygon: {
        area: number;
        length: number;
      };
      line: {
        length: number;
      };
      num: number;
      point: boolean;
    };
    height: number;
    comps: {
      lines: any[];
      pts: any[];
    };
  };
}
