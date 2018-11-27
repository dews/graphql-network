/* global chrome */
import DevToolsPanel from './components/DevToolsPanel';
import React from 'react';
import ReactDOM from 'react-dom';

let alreadyShown = false;

function createPanel() {
  chrome.devtools.panels.create('GraphQL Network',
    './icons/icon48.png',
    './panel.html',
    (panel) => {
      panel.onShown.addListener((panelWindow) => {
        if (!alreadyShown) {
          ReactDOM.render(
            <DevToolsPanel
              requestFinished={chrome.devtools.network.onRequestFinished}
              getHAR={chrome.devtools.network.getHAR}
            />,
            panelWindow.document.getElementById('results'),
          );
        }
        alreadyShown = true;
      });
    },
  );
}

createPanel();
