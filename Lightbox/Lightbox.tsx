import * as React from 'react';
import classnames from 'classnames';

import * as css from './Lightbox.scss';
import Header from './Header';
import ModalPortal from '../../shared/components/ui/modal/ModalPortal';

const ANIMATION_TIME = 400;

interface P {
  alt: string;
  large: string;
  downloadLink: string;
  onClose: () => void;
}

interface S {
  loaded: boolean;
}

export default class Lightbox extends React.Component<P, S> {
  state = {
    loaded: false
  };

  handleClose = () => {
    const { onClose } = this.props;
    this.setState({ loaded: false });
    setTimeout(() => onClose(), ANIMATION_TIME);
  };

  handleKeyDown = (event: KeyboardEvent) => {
    // ESC or ENTER closes the modal
    if (event.keyCode === 27 || event.keyCode === 13) {
      this.handleClose();
    }
  };

  handleClickContent = (event: any) => {
    const point = event.changedTouches ? event.changedTouches[0] : event;

    if (point.target.id === 'react-modal-image-img') {
      // the img was not a target of the coordinates
      return;
    }

    this.handleClose();
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
    setTimeout(() => this.setState({ loaded: true }), 0);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  render() {
    const { large, alt, downloadLink } = this.props;
    const { loaded } = this.state;

    return (
      <ModalPortal>
        <div className={classnames(css.Lightbox, { [css.loaded]: loaded })}>
          <div className={css.container}>
            <div className={css.content} onClick={this.handleClickContent}>
              <div>
                <img
                  id="react-modal-image-img"
                  alt={alt}
                  className={css.img}
                  src={large}
                />
              </div>
            </div>

            <Header
              alt={alt}
              downloadLink={downloadLink || large}
              loaded={loaded}
              onClose={this.handleClose}
            />
          </div>
        </div>
      </ModalPortal>
    );
  }
}
