/**
 * App
 */
export const APP_TOGGLE = 'APP_TOGGLE';
export type APP_TOGGLE = typeof APP_TOGGLE;

/**
 * Map
 */
export const MAP_INIT = 'MAP_INIT';
export type MAP_INIT = typeof MAP_INIT;
export const MODE_SET = 'MODE_SET';
export type MODE_SET = typeof MODE_SET;
export const MAP_SET = 'MAP_SET';
export type MAP_SET = typeof MAP_SET;
export const MAP_RESET = 'MAP_RESET';
export type MAP_RESET = typeof MAP_RESET;
export const BEARING_SET = 'BEARING_SET';
export type BEARING_SET = typeof BEARING_SET;
export const CENTER_SET = 'CENTER_SET';
export type CENTER_SET = typeof CENTER_SET;
export const PITCH_SET = 'PITCH_SET';
export type PITCH_SET = typeof PITCH_SET;
export const ANGLE_SET = 'ANGLE_SET';
export type ANGLE_SET = typeof ANGLE_SET;
export const INSTANCE_SET = 'INSTANCE_SET';
export type INSTANCE_SET = typeof INSTANCE_SET;
export const IS_LOADED = 'IS_LOADED';
export type IS_LOADED = typeof IS_LOADED;
export const LAYER_SET = 'LAYER_SET';
export type LAYER_SET = typeof LAYER_SET;
export const STEP_SET = 'STEP_SET';
export type STEP_SET = typeof STEP_SET;
export const STEP_ADD = 'STEP_ADD';
export type STEP_ADD = typeof STEP_ADD;
export const STEP_MINUS = 'STEP_MINUS';
export type STEP_MINUS = typeof STEP_SET;

/**
 * Global
 */
export const GLOBAL_SET = 'GLOBAL_SET';
export type GLOBAL_SET = typeof GLOBAL_SET;

export const LOADING_SET = 'LOADING_SET';
export type LOADING_SET = typeof LOADING_SET;
export const LOADINGTEXT_SET = 'LOADINGTEXT_SET';
export type LOADINGTEXT_SET = typeof LOADINGTEXT_SET;
export const ALL_RESET = 'ALL_RESET';
export type ALL_RESET = typeof ALL_RESET;
export const INTERACTIVE_TOGGLE = 'INTERACTIVE_TOGGLE';
export type INTERACTIVE_TOGGLE = typeof INTERACTIVE_TOGGLE;

/**
 * Modal
 */
export const MODAL_CONFIG_TOGGLE = 'MODAL_CONFIG_TOGGLE';
export type MODAL_CONFIG_TOGGLE = typeof MODAL_CONFIG_TOGGLE;
export const MODAL_COMPARE_TOGGLE = 'MODAL_COMPARE_TOGGLE';
export type MODAL_COMPARE_TOGGLE = typeof MODAL_COMPARE_TOGGLE;

/**
 * Typelists
 */
export const TYPELISTS_INIT = 'TYPELISTS_INIT';
export type TYPELISTS_INIT = typeof TYPELISTS_INIT;
export const TYPELISTS_SET = 'TYPELISTS_SET';
export type TYPELISTS_SET = typeof TYPELISTS_SET;
export const BLDG_SET = 'BLDG_SET';
export const ZONING_SET = 'ZONING_SET';

/**
 * Parcel
 */
export const PARCEL_INFO_RESET = 'PARCEL_INFO_RESET';
export type PARCEL_INFO_RESET = typeof PARCEL_INFO_RESET;
export const PARCEL_INFO_SET = 'PARCEL_INFO_SET';
export type PARCEL_INFO_SET = typeof PARCEL_INFO_SET;
export const PARCEL_TYPE_SET = 'PARCEL_TYPE_SET';
export type PARCEL_TYPE_SET = typeof PARCEL_TYPE_SET;
/**
 * Stepper
 */
export const STEPPER_SET = 'STEPPER_SET';

/**
 * Proforma
 */
export const PROFORMA_SET = 'PROFORMA_SET';
export type PROFORMA_SET = typeof PROFORMA_SET;
export const PROFORMA_RESET = 'PROFORMA_RESET';
export type PROFORMA_RESET = typeof PROFORMA_RESET;
export const PROFORMA_EXPORT = 'PROFORMA_EXPORT';
export type PROFORMA_EXPORT = typeof PROFORMA_EXPORT;
export const PROFORMA_IMPORT = 'PROFORMA_IMPORT';
export type PROFORMA_IMPORT = typeof PROFORMA_IMPORT;
export const CATE_SET = 'CATE_SET';
export type CATE_SET = typeof CATE_SET;
export const WORKBOOK_SET = 'WORKBOOK_SET';
export const INPUTS_SET = 'INPUTS_SET';

/**
 * Authentication
 */
export const IDENTITY_GET = 'IDENTITY_GET';
export type IDENTITY_GET = typeof IDENTITY_GET;

export const IDENTITY_SET = 'IDENTITY_SET';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const GET_USER_WEBSCENES = 'GET_USER_WEBSCENES';
export const SET_USER_WEBSCENES = 'SET_USER_WEBSCENES';

/**
 * GP Service Geometry
 */
export const GEOMETRY_GET = 'GEOMETRY_GET';
export type GEOMETRY_GET = typeof GEOMETRY_GET;

export const RESPONSE_SET = 'RESPONSE_SET';
export const PARAMS_SET = 'PARAMS_SET';

export const OVERRIDE_GET = 'OVERRIDE_GET';
export type OVERRIDE_GET = typeof OVERRIDE_GET;

export const OVERRIDE_SET = 'OVERRIDE_SET';
export type OVERRIDE_SET = typeof OVERRIDE_SET;

/**
 * Scenario
 */

export const SCENARIO_LAYER_GENERATE = 'SCENARIO_LAYER_GENERATE';
export type SCENARIO_LAYER_GENERATE = typeof SCENARIO_LAYER_GENERATE;

export const SERVICE_SAVE = 'SERVICE_SAVE';
export type SERVICE_SAVE = typeof SERVICE_SAVE;

export const STATES_DELETE = 'STATES_DELETE';
export type STATES_DELETE = typeof STATES_DELETE;
export const STATES_SAVE = 'STATES_SAVE';
export type STATES_SAVE = typeof STATES_SAVE;
export const STATES_SWITCH = 'STATES_SWITCH';
export type STATES_SWITCH = typeof STATES_SWITCH;

export const SCENARIO_SHOW = 'SCENARIO_SHOW';
export type SCENARIO_SHOW = typeof SCENARIO_SHOW;
export const SCENARIO_RESET = 'SCENARIO_RESET';
export type SCENARIO_RESET = typeof SCENARIO_RESET;
export const SCENARIO_COMPARE = 'SCENARIO_COMPARE';
export type SCENARIO_COMPARE = typeof SCENARIO_COMPARE;

/**
 * Web Scene
 */
export const INIT_SCENE = 'INIT_SCENE';
export type INIT_SCENE = typeof INIT_SCENE;

export const CONTAINER_INIT = 'CONTAINER_INIT';
export type CONTAINER_INIT = typeof CONTAINER_INIT;

export const SCENEVIEW_SET = 'SCENEVIEW_SET';
export type SCENEVIEW_SET = typeof SCENEVIEW_SET;
export const LAYERS_SET = 'LAYERS_SET';

export const VIZ_LAYERS_BY_TYPE = 'VIZ_LAYERS_BY_TYPE';

/**
 * Selection
 */
export const SELECTION_VALID = 'SELECTION_VALID';
export type SELECTION_VALID = typeof SELECTION_VALID;
export const SELECTION_SET = 'SELECTION_SET';
export const SELECTION_RESET = 'SELECTION_RESET';
export const HOVER_SET = 'HOVER_SET';
export const HOVER_RESET = 'HOVER_RESET';

/**
 * Stats
 */
export const STATS_SET = 'STATS_SET';
export const STATS_SHOW_SET = 'STATS_SHOW_SET';

/**
 * Environment
 */
export const SET_ENVIRONMENT = 'SET_ENVIRONMENT';
export const SET_DATE = 'SET_DATE';
export const SET_SHADOWS = 'SET_SHADOWS';

export const THUMBNAIL_CREATE = 'THUMBNAIL_CREATE';
export type THUMBNAIL_CREATE = typeof THUMBNAIL_CREATE;
