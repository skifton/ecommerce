import React from "react";
import { Link } from "react-router-dom";
import NewArrivalsImg from "../../assets/background.jpeg";
import TeesImg from "../../assets/Categories/tees.jpeg";
import ShortsImg from "../../assets/Categories/shorts.jpeg";
import EFeaturedSection from "../../components/EFeaturedSection";
import ELoadingSpiner from "../../components/ELoadingSpinner";
import { useGetCategoryList } from "../../services/categories.service";

const HomePage: React.FC = () => {
  const { categories: categoryList, isLoading } = useGetCategoryList();
  return (
    <div className="bg-white">
      <div className="relative bg-gray-900">
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <img
            src={NewArrivalsImg}
            alt="new-arrivals"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gray-900 opacity-50"
        />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center py-32 px-6 text-center sm:py-64 lg:px-0">
          <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
            New arrivals are here
          </h1>
          <p className="mt-4 text-xl text-white">
            The new arrivals have, well, newly arrived. Check out the latest
            options from our summer small-batch release while they're still in
            stock.
          </p>
          <Link
            to={{ pathname: "/category", search: "?name=new-arrivals" }}
            className="mt-8 inline-block rounded-md border border-transparent bg-white py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            Shop New Arrivals
          </Link>
        </div>
      </div>

      <main>
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
              {categoryList?.length !== 0 ? (
                categoryList?.map((category) => {
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

        <EFeaturedSection
          title="Basic Tees"
          linkTo={{ pathname: "/category", search: "?name=tees" }}
          description="Shop our comfortable and stylish t-shirts made from high-quality materials. With a variety of colors and patterns to choose from, find your perfect tee today!"
          image={TeesImg}
        />

        <EFeaturedSection
          title="Shorts"
          linkTo={{ pathname: "/category", search: "?name=shorts" }}
          description="Get ready for summer with our stylish shorts! Made from comfortable materials, our shorts come in a variety of colors and styles to fit any look."
          image={ShortsImg}
        />
      </main>
    </div>
  );
};

export default HomePage;
