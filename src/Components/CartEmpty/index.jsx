import { Link } from 'react-router-dom';
import cartEmpty from '../../assets/img/empty-cart.png';

const CartEmpty = () => {
  return (
    <>
      <div class="cart cart--empty">
        <h2>
          Корзина пустая <icon>😕</icon>
        </h2>
        <p>
          Вероятней всего, вы не заказывали ещё бургеры.
          <br />
          Для того, чтобы заказать бургер, перейди на главную страницу.
        </p>
        <img src={cartEmpty} alt="Empty cart" />
        <Link to="/" class="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
