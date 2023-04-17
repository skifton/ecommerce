import React from 'react';
import { Link } from 'react-router-dom';
import { useGetCategoryList } from '../../services/categories.service';
import ELoadingSpiner from '../../components/ELoadingSpinner';

const ErrorProductsPage: React.FC = () => {
    const { categories, isLoading } = useGetCategoryList();
    return <div className='text-center justify-center'>
        <h1 className='text-2xl font-semibold mt-20'>Sorry, we don't have this category :(</h1>
        <p className='text-xl font-medium text-gray-600 m-2'>You can search for the item you are interested in in one of our categories. We wish you success!</p>
        <section
          aria-labelledby="category-heading"
          className="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8"
        >
          <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
            <h2
              id="category-heading"
              className="text-2xl font-bold tracking-tight text-gray-900"
            >
              Shop by Category
            </h2>
          </div>

          {isLoading ? (
            <ELoadingSpiner />
          ) : (
            <ul className="flex pt-10 space-x-4 mx-auto max-w-7xl overflow-x-auto overflow-hidden">
              {categories?.length !== 0 ? (
                categories?.map((category) => {
                  return (
                    <li key={category.id}>
                      <Link
                        key={category.name}
                        to={{
                          pathname: `/category`,
                          search: `?name=${category.name}`,
                        }}
                        className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75"
                      >
                        <span aria-hidden="true" className="absolute inset-0">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </span>
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                        />
                        <span className="relative mt-auto text-center text-xl font-bold text-white">
                          {category.name}
                        </span>
                      </Link>
                    </li>
                  );
                })
              ) : (
                <p className="w-full text-center mt-[9rem] text-gray-400">
                  At the moment we don't have any categories.
                </p>
              )}
            </ul>
          )}
        </section>
    </div>
};

export default ErrorProductsPage;