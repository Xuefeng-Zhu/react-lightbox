import * as React from 'react';
import classnames from 'classnames';

import * as css from './index.scss';
import Lightbox from './Lightbox';

export { default as Lightbox } from './Lightbox';

interface P {
  className?: string;
  alt: string;
  large: string;
  small: string;
  downloadLink?: string;
}

interface S {
  modalOpen: boolean;
}

export default class extends React.Component<P, S> {
  state = { modalOpen: false };

  toggleModal = () => {
    this.setState(prev => ({
      modalOpen: !prev.modalOpen
    }));
  };

  render() {
    const { className, small, large, alt, downloadLink } = this.props;
    const { modalOpen } = this.state;

    return (
      <div className={css.Lightbox}>
        <img
          className={className}
          onClick={this.toggleModal}
          src={small}
          alt={alt}
        />
        {modalOpen && (
          <Lightbox
            large={large}
            alt={alt}
            onClose={this.toggleModal}
            downloadLink={downloadLink}
          />
        )}
      </div>
    );
  }
}
