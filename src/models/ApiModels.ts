/**
 * Interface representing information about a model.
 */
export interface ModelInfo {
  /**
   * The name of the model.
   */
  name: string;

  /**
   * The model identifier.
   */
  model: string;

  /**
   * The digest of the model.
   */
  digest: string;
}

/**
 * Interface representing the response containing a list of models.
 */
export interface TagsResponse {
  /**
   * An array of model information.
   */
  models: ModelInfo[];
}

/**
 * Interface representing the response containing the version information.
 */
export interface VersionResponse {
  /**
   * The version of the API.
   */
  version: string;
}
