import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Product from "./Product";
import ErrorProductsPage from "./ErrorProductsPage";
import { useGetCategoryDetail } from "../../services/categories.service";
import { useGetSpecialCategoryProducts } from "../../services/products.service";
import { IProduct } from "../../models/product.model";
import ESelectSort from "../../components/ESelectSort";
import { genderFilters } from "../../utils/filters.util";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import EPagination from "../../components/EPagination";

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const nameOfCurrentCategory = searchParams.get("name");
  const { category: currentCategory } = useGetCategoryDetail(
    nameOfCurrentCategory || ""
  );
  const { products } = useGetSpecialCategoryProducts(
    nameOfCurrentCategory || ""
  );
  const [filteredProduct, setFilteredProduct] = useState<IProduct[]>();
  const [currentPageData, setCurrentPageData] = useState<IProduct[]>();
  const [selectedSort, setSelectedSort] = useState<{
    id: string;
    name: string;
  }>({ id: "1", name: "Sort By" });
  const [filterByGender, setFilterByGender] = useState(
    searchParams.get("sex")
      ? genderFilters.filter(
          (filter) => filter.value === searchParams.get("sex")
        )
      : genderFilters[0]
  );
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * 12;
    const lastPageIndex = firstPageIndex + 12;
    setCurrentPageData(filteredProduct?.slice(firstPageIndex, lastPageIndex));
  }, [currentPage, filteredProduct]);

  useEffect(() => {
    const sex = searchParams.get("sex");
    if (sex) {
      setFilteredProduct(
        products?.filter((product) => product.sex.toLocaleLowerCase() === sex)
      );
    } else {
      setFilteredProduct(products);
    }
  }, [products, searchParams]);

  const onClickProductDetailHandler = (id: string) => {
    navigate(`${id}`);
  };

  const onChangeGenderFilter = (filter: any) => {
    if (filter.value === "all") {
      searchParams.delete("sex");
      setSearchParams(searchParams);
    } else {
      searchParams.set("sex", filter.value);
      setSearchParams(searchParams);
    }
    setFilterByGender(filter);
  };

  const onChangeSelectedSortHandler = (e: any) => {
    if (e.name === "Our picks") {
      setSelectedSort({
        id: "1",
        name: "Sort By",
      });
      setFilteredProduct(products);
    } else if (e.name === "Newest first") {
      const filtered = products?.sort(
        (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
      );
      setFilteredProduct(filtered);
      setSelectedSort(e);
    } else if (e.name === "Price: high to low") {
      const filtered = products?.sort((a, b) => b.price - a.price);
      setFilteredProduct(filtered);
      setSelectedSort(e);
    } else if (e.name === "Price: low to high") {
      const filtered = products?.sort((a, b) => a.price - b.price);
      setFilteredProduct(filtered);
      setSelectedSort(e);
    }
  };
  return (
    <Fragment>
      {!currentCategory ? (
        <ErrorProductsPage />
      ) : (
        <Fragment>
          <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
            <div className="border-b border-gray-200 pt-16 pb-4">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                {currentCategory.name}
              </h1>
              <p className="mt-4 text-base text-gray-500">
                {currentCategory.description}
              </p>
              <div className="flex justify-between mt-4">
                <RadioGroup
                  value={filterByGender}
                  onChange={onChangeGenderFilter}
                >
                  <div className="grid grid-cols-3 sm:grid-cols-3">
                    {genderFilters.map((filter) => (
                      <RadioGroup.Option
                        key={filter.value}
                        value={filter}
                        className={({ checked, active }) =>
                          clsx(
                            "relative w-fit flex cursor-pointer rounded-full border py-2 px-4 shadow-sm focus:outline-none hover:bg-gray-400 hover:text-white",
                            {
                              "text-white bg-gray-400": checked,
                              "border-gray-300": !checked,
                            }
                          )
                        }
                      >
                        <span className="flex flex-1">
                          <span className="flex flex-col">
                            <RadioGroup.Label
                              as="span"
                              className="block text-sm"
                            >
                              {filter.name}
                            </RadioGroup.Label>
                          </span>
                        </span>
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
                <ESelectSort
                  selected={selectedSort}
                  onChangeSelected={onChangeSelectedSortHandler}
                />
              </div>
            </div>

            <div className="pt-12 pb-24 lg:grid lg:grid-cols-4 lg:gap-x-8 xl:grid-cols-4">
              <section
                aria-labelledby="product-heading"
                className="mt-6 lg:col-span-4 lg:mt-0 xl:col-span-4"
              >
                <h2 id="product-heading" className="sr-only">
                  Products
                </h2>

                <ul className="list-none grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-4">
                  {currentPageData?.length !== 0 ? (
                    currentPageData?.map((product: any) => (
                      <li key={product.id}>
                        <Product
                          onClickProductDetail={onClickProductDetailHandler}
                          product={product}
                        />
                      </li>
                    ))
                  ) : (
                    <p className="text-xl text-gray-500 absolute justify-self-center">
                      At this moment we don't have any products.
                    </p>
                  )}
                </ul>
                <EPagination
                    currentPage={currentPage}
                    totalCount={products ? products?.length : 0}
                    onPageChange={(page: number) => setCurrentPage(page)} 
                    siblingCount={1} 
                    pageSize={12}
                />
              </section>
            </div>
          </main>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
