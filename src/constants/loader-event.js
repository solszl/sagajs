/**
 *
 * Created Date: 2020-01-19, 00:50:44 (zhenliang.sun)
 * Last Modified: 2020-01-19, 18:12:54 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

const PREFIX = 'loader_'
export const LOAD_EVENT_ENUM = {
  /**  */
  BEFORE_ALL_START: PREFIX + 'before_all_start',
  /**  */
  ITEM_LOAD_START: PREFIX + 'item_load_start',
  /**  */
  ITEM_LOAD_COMPLETE: PREFIX + 'item_load_complete',
  /**  */
  ALL_LOAD_COMPLETE: PREFIX + 'all_load_complete',
  /** */
  ITEM_LOAD_TIMEOUT: PREFIX + 'item_load_timeout',
  /** */
  ITEM_LOAD_ERROR: PREFIX + 'item_load_error',
  /** */
  ITEM_LOAD_ABORT: PREFIX + 'item_load_abort',
  /**  */
  DATA_PROVIDER_CHANGE: PREFIX + 'data_provider_change'
}
