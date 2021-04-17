module.exports = {
  apps : [{
    name: 'workout-counter',
    script: 'yarn start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    }
  }],
};
