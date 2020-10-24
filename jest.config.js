module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.js?$": "ts-jest",
  },
  roots: ["<rootDir>/src", "<rootDir>/utils"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
};
