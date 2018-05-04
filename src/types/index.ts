import * as mapbox from 'mapbox-gl';
import { Feature, GeometryObject } from 'geojson';
interface MapMarker {
  coords?: {
    lng: number;
    lat: number;
  };
  source?: string;
  zpid?: string;
  refprice?: number;
  address?: string;
  [key: string]: any;
}

export interface RootState {
  app: boolean;
  slider: {
    data: any[];
    range: number[];
    fetched: boolean;
  };
  popup: {
    data: any[];
    range: number[];
    fetched: boolean;
  };
  marker: MapMarker;
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
