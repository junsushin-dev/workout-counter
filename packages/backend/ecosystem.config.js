module.exports = {
  apps : [{
    name: 'workout-counter',
    script: 'yarn',
    args: 'start',
    interpreter: 'yarn',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    }
  }],
};
