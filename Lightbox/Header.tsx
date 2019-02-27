import * as React from 'react';
import * as css from './Header.scss';
import classnames from 'classnames';

interface P {
  alt: string;
  downloadLink: string;
  loaded: boolean;
  onClose?: () => void;
}

const Header: React.SFC<P> = ({ alt, downloadLink, loaded, onClose }) => (
  <div className={classnames(css.LightboxHeader, { [css.loaded]: loaded })}>
    <div className={css.left}>
      <span className={css.close}>
        <i onClick={onClose} className="ion-ios-close" />
      </span>
    </div>
    <span className={css.caption}>{alt}</span>
    <div className={css.right}>
      <a className={css.download} target="_blank" href={downloadLink} download>
        Download
      </a>
    </div>
  </div>
);

export default Header;
