/* Copyright 2017 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
const highlightHandlers: {
  click: any[];
  move: any[];
} = {
  click: [],
  move: [],
};

export const updateHighlights = (lyrView: __esri.FeatureLayerView, selection: number | number[]) => {
  if (lyrView) {
    highlightHandlers.click.forEach(item => item.remove());
    highlightHandlers.click = [];

    highlightHandlers.click.push(
      lyrView.highlight(selection),
    );
  }
};

export const resetHighlights = (lyrView: __esri.FeatureLayerView) => {
  if (lyrView) {
    highlightHandlers.click.forEach(item => item.remove());
    highlightHandlers.click = [];
    // highlightHandlers.click.push(lyrView.highlight());
  }
};

export const addHoverHighlights = (lyrView: __esri.FeatureLayerView, selection: number | number[]) => {
  if (lyrView) {
    highlightHandlers.move.forEach(item => item.remove());
    highlightHandlers.move = [];
    highlightHandlers.move.push(
      lyrView!.highlight(selection),
    );
  }
};

export const resetHoverHighlights = (lyrView: __esri.FeatureLayerView) => {
  if (lyrView) {
    highlightHandlers.move.forEach(item => item.remove());
    highlightHandlers.move = [];
    highlightHandlers.move.push(lyrView.highlight());
  }
};

// export default updateHighlights;
