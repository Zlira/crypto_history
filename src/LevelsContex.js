import React from 'react'


export const LevelsContext = React.createContext({
  levelsPassed: [false, false, false],
  addPassedLevel: () => {},
  clearPassedLevels: () => {},
})