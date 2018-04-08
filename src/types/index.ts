import { WorkBook } from 'xlsx';
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
    loaded: boolean;
    instance: mapbox.Map;
    bounds: number[][];
    center: number[];
    pitch: number[];
    zoom: number[];
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
    calc: {
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
  user: {
    identity: any;
  };
  webscene: {
    current: {
      id: number;
    };
  };
  selection: { layer: string; OID: number }[];
  vizType: string;
  stats: Stats;
  global: {
    loading: boolean;
    loadingText: string;
    step: number;
  };
  proforma: {
    workbook: WorkBook;
    inputs: {
      name: string;
      sheet: string;
      cell: string;
      value: string | number;
      [key: string]: any;
    }[];
    inputCates: string[];
    selectedCate: string;
    outputs: {
      name: string;
      sheet: string;
      cell: string;
      value: string | number;
      [key: string]: any;
    }[];
  };
  parcel: {
    info: {
      OBJECTID: number;
      [key: string]: any;
    }[];
    zoning: {
      value: string;
      status: boolean;
    };
    bldg: {
      value: string;
      status: boolean;
    };
  };
  typelists: {
    zoning: string[];
    bldg: string[];
  };
  geometry: {
    response: {
      [key: string]: any;
    };
    params: object;
    override: {
      [key: string]: any;
    };
  };
  scenario: {
    compare?: string[];
    current?: string;
    services?: {
      [key: string]: {
        serviceItemId?: string;
        status?: string;
      };
    };
    states?: {
      [key: string]: {
        src?: string;
        status?: string;
        parcel?: {
          info: object[];
          zoning: {
            value: string;
            status: boolean;
          };
          bldg: {
            value: string;
            status: boolean;
          };
        };
        proforma?: {
          workbook: WorkBook;
          inputs: {
            name: string;
            sheet: string;
            cell: string;
            value: string | number;
            [key: string]: any;
          }[];
          inputCates: string[];
          selectedCate: string;
          outputs: {
            name: string;
            sheet: string;
            cell: string;
            value: string | number;
            [key: string]: any;
          }[];
        };
        stats?: Stats;
      };
    };
    show?: boolean;
  };
  modals: {
    [key: string]: boolean;
  };
}
