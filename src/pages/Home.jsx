import { useEffect, useRef, useState } from 'react';
import Categories, { categories } from '../Components/Categories/Categories';
import PizzaBlock from '../Components/PizzaBlock/';
import Sort, { sortTypes } from '../Components/Sort/Sort';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import Pagination from '../Components/Pagination';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import {
  initialState,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../Redux/slices/filterSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NotFoundBlock from '../Components/NotFoundBlock';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(setCategoryId);
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
    dispatch(setCurrentPage(1));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  const searchValue = useSelector((state) => state.filter.searchValue);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const sortBy = sortType.replace('-', '');
  const order = sortType.includes('-') ? 'asc' : 'desc';

  const [pizzasCount, setPizzasCount] = useState(0);
  const fetchCountPizzas = () => {
    let url = `https://65726718d61ba6fcc014cd6e.mockapi.io/items?&sortBy=${sortBy}&order=${order}`;

    if (categoryId > 0) {
      url += `&category=${categoryId}`;
    }

    if (searchValue) {
      url += `&title=${searchValue}`;
    }
    axios
      .get(url)
      .then((res) => {
        setPizzasCount(res.data.length);
      })
      .catch((error) => {
        setPizzasCount(0);
      });
  };

  const fetchPizzas = () => {
    setIsLoading(true);
    let url = `https://65726718d61ba6fcc014cd6e.mockapi.io/items?&page=${currentPage}&limit=6&sortBy=${sortBy}&order=${order}`;

    if (categoryId > 0) {
      url += `&category=${categoryId}`;
    }

    if (searchValue) {
      url += `&title=${searchValue}`;
    }
    axios
      .get(url)
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.log('Не удалось найти данные: ', error.message);
          setIsLoading(false);
          setItems([]);
        } else {
          console.error('Произошла ошибка при выполнении запроса: ', error.message);
        }
      });

    window.scrollTo(0, 0);
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      if (
        initialState.categoryId === Number(params.categoryId) &&
        initialState.selectedSort === params.selectedSort &&
        initialState.currentPage === Number(params.currentPage)
      ) {
        fetchPizzas();
        fetchCountPizzas();
      }

      const sort = sortTypes.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
      fetchCountPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pageCount = Math.ceil(pizzasCount / 6);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">{categories[categoryId]} бургеры</h2>
      <div className="content__items">
        {isLoading ? skeleton : pizzas.length ? pizzas : <NotFoundBlock />}
      </div>
      {pageCount > 1 ? (
        <Pagination currentPage={currentPage} onChangePage={onChangePage} pageCount={pageCount} />
      ) : (
        ''
      )}
    </div>
  );
};

export default Home;
