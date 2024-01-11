import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.root}>
      <p>© 2024 · React Burger</p>{' '}
      <div className={styles.info}>
        <a className={styles.mail}>feklin.aleksei09@gmail.com</a> <br />{' '}
        <a className={styles.number}>+375(29)-89-86-499</a>
      </div>
    </div>
  );
};

export default Footer;
