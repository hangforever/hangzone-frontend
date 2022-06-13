import { Component } from 'react';
import ReactDOM from 'react-dom';
import './Portal.scss';

interface Props {
  children: React.ReactNode;
}

export default class Modal extends Component<Props> {
  private el: HTMLElement;
  constructor(props: Props) {
    super(props);
    this.el = document.createElement('div');
  }
  componentDidMount() {
    const modalRoot = document.getElementById('portal-root') as HTMLDivElement;
    modalRoot.appendChild(this.el);
  }
  componentWillUnmount() {
    const modalRoot = document.getElementById('portal-root') as HTMLDivElement;
    modalRoot.removeChild(this.el);
  }
  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
