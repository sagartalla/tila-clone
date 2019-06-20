import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();
    this.secondsRemaining = '';
    this.intervalHandle = '';
    this.state = {
      min: '',
      seconds: '',
    };
  }

  componentDidMount() {
    this.intervalHandle = setInterval(this.tick, 1000);
    this.secondsRemaining = this.props.time;
  }

  componentWillReceiveProps(newProps) {
    if (this.props.time !== newProps.time) {
      clearInterval(this.intervalHandle);
      this.intervalHandle = setInterval(this.tick, 1000);
      this.secondsRemaining = this.props.time;
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandle);
  }

  tick = () => {
    const min = Math.floor(this.secondsRemaining / 60);
    const seconds = this.secondsRemaining - (min * 60);

    this.setState({
      min,
      seconds,
    });

    if (seconds < 10) {
      this.setState({
        seconds: `0${this.state.seconds}`,
      });
    }
    if (min < 10) {
      this.setState({
        min: `0${min}`,
      });
    }

    if (min === 0 && seconds === 0) {
      clearInterval(this.intervalHandle);
    }

    this.secondsRemaining -= 1;
    this.props.getSeconds(this.secondsRemaining);
  };

  render() {
    const { min, seconds } = this.state;
    return <span>{min}:{seconds}</span>;
  }
}

export default Timer;
