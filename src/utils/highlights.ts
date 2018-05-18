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
