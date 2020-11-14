import React, { Component } from "react";
import Spinner from "../ui/spinner/Spinner";

const withLoader = (WrappedComponent) => {
  return class WithLoader extends Component {
    state = {
      isLoading: this.props.isLoading,
    };
    setIsLoading = (isLoading) => {
      this.setState({ isLoading: isLoading });
    };

    render() {
      if (this.state.isLoading) {
        return <Spinner />;
      }
      return (
        <WrappedComponent {...this.props} setIsLoading={this.setIsLoading} />
      );
    }
  };
};

export default withLoader;
